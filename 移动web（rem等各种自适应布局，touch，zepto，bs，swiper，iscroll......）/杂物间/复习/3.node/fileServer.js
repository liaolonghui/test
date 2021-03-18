const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true);
  if (pathname === '/') {
    fs.readFile('./index.html', (err, data) => {          // fs.writeFile(path, data, {flag: a}, callback)
      if (err) {
        console.log(err);
      } else {
        res.write(data);
      }
      res.end();
    });
  } else if (pathname === '/write') {
    let data = query.data;
    if (data) {
      fs.writeFile('data.text', data, {'flag': 'a'}, (err) => {
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