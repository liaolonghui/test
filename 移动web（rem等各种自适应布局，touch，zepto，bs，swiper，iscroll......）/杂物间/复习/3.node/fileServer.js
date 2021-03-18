const http = require('http');
const url = require('url');
const fs = require('fs');

// Sync同步
// readFile   writeFile   appendFile   copyFile

// open打开文件   close关闭文件
// 同步磁盘缓存 fsync
// read 方法与 readFile 不同，一般针对于文件太大，无法一次性读取全部内容到缓存中或文件大小未知的情况，都是多次读取到 Buffer 中。
// write 方法与 writeFile 不同，是将 Buffer 中的数据写入文件，Buffer 的作用是一个数据中转站，可能数据的源占用内存太大或内存不确定，无法一次性放入内存中写入，所以分段写入，多与 read 方法配合。
// copy 方法

// stat 方法的第一个参数为目录的路径，最后一个参数为回调函数，回调函数有两个参数 err （错误）和 Stats 对象，在读取 Stats 后执行。
// isDirectory()   isFile()

http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true);
  if (pathname === '/') {
    fs.readFile('./index.html', 'utf-8' ,(err, data) => {          // fs.writeFile(path, data, {flag: 'a'}, callback)
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.write(data);
      }
      res.end();
    });
  } else if (pathname === '/write') {
    let data = query.data;
    if (data) {
      fs.writeFile('data.text', data, {'flag': 'a'}, (err) => {    // fs.appendFile()  以追加的方式写入文件
        if (err) {
          console.log(err);
        } else {
          res.setHeader('Content-Type', 'text/html;charset=UTF8');
          res.end('“'+data+'”'+'数据写入成功');
        }
      });
    } else {
      res.setHeader('Content-Type', 'text/html;charset=UTF8');
      res.end('请正确填写需要写入的数据！');
    }
  } else {
    res.end();
  }
}).listen(8888, console.log('8888'));