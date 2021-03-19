const http = require('http');
const querystring = require('querystring');

// req.on('data', buffer => {})
// req.on('end', () => {})
// 如果想要获取文件数据需要对数据进行分割(/r/n)

// path模块   assert模块   net模块   http2模块   https模块 等此处没有深入复习......
// assert()   assert.deepEqual()  assert.deepStrictEqual()......
// path.parse()  path.dirname()  path.extname()   path.basename()   path.join()   path.resolve().......

http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === '/post' && req.method === 'POST') {
    let arr = [];
    req.on('data', buffer => {
      arr.push(buffer);
    });
    req.on('end', () => {
      let buffer = Buffer.concat(arr);  // 把保存所有buffer数据的arr 转换为 BUffer

      console.log(buffer.toString());
      // 把buffer转换为对象
      const postData = querystring.parse(buffer.toString());
      console.log(postData);

      const ret = querystring.stringify(postData);
      res.setHeader('Content-type', 'text/html;charset=UTF8');
      res.write(`恭喜你的的数据 ${ret} 上传成功！`);
      res.end();
    })
  } else {
    res.end('......');
  }
}).listen(8888, () => { console.log('8888') });