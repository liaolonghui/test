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
    // data和self.promiseValue一样
    setTimeout(()=>{
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    },0)
  }
  function reject(data){
    if (self.promiseStatus !== "pending") return
    self.promiseStatus = "rejected"
    self.PromiseValue = data
    // 如果有回调则执行其中所有失败的回调
    // data和self.promiseValue一样
    setTimeout(()=>{
      self.callbacks.forEach(item => {
        item.onRejected(data)
      })
    },0)
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
  const self = this

  // 参数可以不传，所以在这里做个判断
  if (typeof onRejected !== 'function') {
    onRejected = function(reason){
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value
  }

  return new Promise((resolve, reject) => {

    // 封装一下
    function callback(type){
      try {
        // 执行成功的回调并且获取到成功回调的返回值
        const result = type(self.PromiseValue)
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

    if (this.promiseStatus === 'resolved') {
      setTimeout(()=>{
        callback(onResolved)
      },0)
    }

    if (this.promiseStatus === 'rejected') {
      setTimeout(()=>{
        callback(onRejected)
      },0)
    }

    // 但如果是pending状态则需要
    if (this.promiseStatus === 'pending') {
      // 因为还是penging状态，所以此时可以把回调函数先保存下来
      // 当状态改变时再调用，即resolve或者reject执行时调用
      this.callbacks.push({
        onResolved: function(){
          callback(onResolved)
        },
        onRejected: function(){
          callback(onRejected)
        }
      })
    }

  })
}


// catch
Promise.prototype.catch = function(onRejected){
  return this.then(undefined, onRejected)
}


// resolve
Promise.resolve = function(value){
  return new Promise((resolve, reject) => {
    try {
      if (value instanceof Promise) {
        value.then( v => {
          resolve(v)
        }, r => {
          reject(r)
        })
      } else {
        resolve(value)
      }
    } catch (error) {
      reject(error)
    }
  })
}
// reject   不管传入什么都是失败
Promise.reject = function(reason){
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}


// all
Promise.all = function(promises){
  return new Promise((resolve, reject) => {
    // 声明一个变量存储通过数量
    let count = 0
    // 存储结果
    let arr = []
    // 遍历
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(v => {
        // 所以promise对象都成功才resolve
        count++
        arr[index] = v
        if (count === promises.length) {
          resolve(arr)
        }
      }, r => {
        reject(r)
      })
    }
  })
}


// race
Promise.race = function(promises){
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })
    }
  })
}