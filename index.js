const express = require('express')
const mongoose = require('mongoose')
const proxy = require('http-proxy-middleware')
const path = require('path')
// const controllerD = require('../David-service/server/controllers')
// const controllerB = require('../service-blake/db/controller')
// const controllerA = require('../service-aaron/server/controllers')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')))

const servers = [
  { route: '/reviews', location: 'http://localhost:3003/reviews' },
  { route: '/ikea', location: 'http://localhost:3007/ikea' },
  { route: '/products', location: 'http://localhost:3001/products' },
  { route: '/searchbar', location: 'http://localhost:3002/searchbar' }
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

// app.get('/ikea', (req, res) => controllerD.getAll(req, res))
// app.get('/ikeaproducts', (req, res) => controllerA.getAll(req, res))
// app.get('/reviews', (req, res) => controllerB.get(req, res))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  mongoose.connect('mongodb://localhost/fec', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.on('connected', () => console.log('connected to mongdb'))
})
