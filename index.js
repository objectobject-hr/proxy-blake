const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.use(
  '/blake',
  proxy({
    target: 'http://localhost:3003/reviews',
    pathRewrite: (path, req) => {
      return path
        .split('/')
        .slice(2)
        .join('/')
    }
  })
)

app.listen(port, () => console.log(`listening on port ${port}`))
