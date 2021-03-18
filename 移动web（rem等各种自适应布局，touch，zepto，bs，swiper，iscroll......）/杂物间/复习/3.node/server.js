const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true);  // req.method  req.headers  req.rawHeaders  req.httpVersion
  if (pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8;'});   // res.setHeader()   res.statusCode   res.statusMessage
    res.write(`欢迎访问本网站！${query.name}`);
    res.end();
  } else {
    res.end();
  }
}).listen(8888, ()=>{
  console.log('服务监听了8888端口');
});