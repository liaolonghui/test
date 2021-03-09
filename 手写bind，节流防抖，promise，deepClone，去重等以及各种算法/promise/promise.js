function Promise(executor){
  this.promiseStatus = "pending"
  this.PromiseValue = undefined
  // 用于保存回调
  this.callbacks = []
  // 保存当前对象
  const self = this

  function resolve(data){
    // 不为pending，则不改变promiseStatus（实现只能改变一次状态）
    if (self.promiseStatus !== "pending") return
    self.promiseStatus = "resolved"
    self.PromiseValue = data
    // 如果有回调则执行其中所有成功的回调
    if (self.callbacks.length) {
      // data和self.promiseValue一样
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    }
  }
  function reject(data){
    if (self.promiseStatus !== "pending") return
    self.promiseStatus = "rejected"
    self.PromiseValue = data
    // 如果有回调则执行其中所有失败的回调
    if (self.callbacks.length) {
      // data和self.promiseValue一样
      self.callbacks.forEach(item => {
        item.onRejected(data)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

// then
// 注意then的返回结果是一个Promise对象
Promise.prototype.then = function(onResolved, onRejected){
  return new Promise((resolve, reject) => {

    if (this.promiseStatus === 'resolved') {
      try {
        // 执行成功的回调并且获取到成功回调的返回值
        const result = onResolved(this.PromiseValue)
        // 看看result是不是Promise
        if (result instanceof Promise) {
          // 是Promise
          result.then( v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (this.promiseStatus === 'rejected') {
      try {
        // 执行成功的回调并且获取到成功回调的返回值
        const result = onRejected(this.PromiseValue)
        // 看看result是不是Promise
        if (result instanceof Promise) {
          // 是Promise
          result.then( v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    // 但如果是pending状态则需要
    if (this.promiseStatus === 'pending') {
      // 因为还是penging状态，所以此时可以把回调函数先保存下来
      // 当状态改变时再调用，即resolve或者reject执行时调用
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }

  })
}