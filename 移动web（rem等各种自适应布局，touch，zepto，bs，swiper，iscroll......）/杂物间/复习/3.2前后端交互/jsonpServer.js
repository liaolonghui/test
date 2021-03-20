const http = require('http');

http.createServer((req, res) => {
  const {pathname, searchParams} = new URL(req.url, 'http://localhost:8888');
  if (pathname === '/jsonp') {
    // jsonp的回调用参数cb指定
    const cbName = searchParams.get('cb');
    res.write(`${cbName}('我是数据')`);
    res.end();
  } else {
    res.end();
  }
}).listen(8888, () => {console.log(8888)});