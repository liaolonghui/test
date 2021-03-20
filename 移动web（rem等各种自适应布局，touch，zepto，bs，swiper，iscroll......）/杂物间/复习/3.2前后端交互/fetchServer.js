const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const {pathname, search, searchParams} = new URL(req.url, 'http://localhost:8888');
  console.log(pathname, search, searchParams);
  if (pathname === '/data/ppp') {
    fs.readFile(path.resolve(__dirname, './ppp.jpg'), (err, data) => {
      if (err) {
        console.log(err);
        res.end('error');
      }
      res.write(data);
      res.end();
    })
  } else if (pathname === '/') {
    fs.readFile(path.resolve(__dirname, './fetch.html'), (err, data) => {
      if (err) {
        console.log(err);
        res.end('error');
      }
      res.write(data);
      res.end();
    })
  } else {
    res.end();
  }
}).listen(8888, () => console.log(8888));