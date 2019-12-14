const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')))

const servers = [
  { route: '/reviews', location: 'http://localhost:3003/reviews' },
  { route: '/ikea', location: 'http://localhost:3007/ikea' },
  { route: '/products', location: 'http://localhost:3001/products' }
]

for (server of servers) {
  app.use(
    server.route,
    proxy({
      target: server.location,
      pathRewrite: (path, req) => {
        return path
          .split('/')
          .slice(2)
          .join('/')
      }
    })
  )
}

app.listen(port, () => console.log(`listening on port ${port}`))
