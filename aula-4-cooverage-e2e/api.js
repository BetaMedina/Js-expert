const http = require("http");

const routes = {
 '/contact:get':(req,res)=>{
  res.write('Contact page')
  return res.end()
  },
 

  default:(req,res)=>{
    res.write('hello world')
    return res.end()
  }
}


const handler = (req, res) => {
  const {url,method} = req
  const routeKey = `${url}:${method.toLowerCase()}`
  if(routeKey === null) return
  console.log(`routeKey`,routeKey)
  const chose = routes[routeKey] || routes.default
  res.writeHead(200,{
    'Content-type':'text/html'
  })
  return chose(req,res)
};

const app = http.createServer(handler).listen(3333,()=>console.log('Server running'));

module.exports = app;
