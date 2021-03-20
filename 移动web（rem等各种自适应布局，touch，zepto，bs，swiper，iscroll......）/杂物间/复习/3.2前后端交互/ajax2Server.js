const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
  if (req.url === '/cors') {
    
    // 如果想要正确的获取数据可以使用multiparty来获取到formdata数据
    let arr = [];
    req.on('data', buffer => {
      arr.push(buffer);
    });
    req.on('end', () => {
      const bufferObj = Buffer.concat(arr);
      const data = querystring.parse(bufferObj.toString());
      console.log(data);
    })

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write('我是服务端返回的数据，请求成功了！');
    res.end();
  } else {
    res.end();
  }
}).listen(8888, () => {console.log(8888)});