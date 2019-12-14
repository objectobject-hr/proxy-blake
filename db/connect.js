const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/fec', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
