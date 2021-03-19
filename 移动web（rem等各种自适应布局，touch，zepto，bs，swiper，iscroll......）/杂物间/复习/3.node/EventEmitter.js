// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var event = new events.EventEmitter();

event.on('some_event', function() { 
  console.log('some_event 事件触发'); 
}); 
setTimeout(function() {
  event.emit('some_event'); 
}, 1000); 




// 在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

// Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 
// 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

const buf = Buffer.from('runoob', 'ascii');
// 输出 72756e6f6f62
console.log(buf.toString('hex'));
// 输出 cnVub29i
console.log(buf.toString('base64'));


// new Buffer()           建议使用 Buffer.from() 接口去创建Buffer对象。

// buf.write(string[, offset[, length]][, encoding])  写入缓冲区
// buf.toString([encoding[, start[, end]]])         从缓冲区读取数据
// buf.toJSON()                         将 Buffer 转换为 JSON 对象
// Buffer.concat(list[, totalLength])         缓冲区合并
// buf.compare(otherBuffer);             缓冲区比较
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])  拷贝缓冲区
// buf.slice([start[, end]])            缓冲区裁剪
// buf.length;            缓冲区长度