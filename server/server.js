const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

require('./router')(app)

// app.post('/users', (req, res) => {
//   console.log(req.body)
//   res.send({
//     code: 200,
//     data: req.body
//   })
// })
// 自动同步所有模型
sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(3000, () => console.log('Server has been started on port 3000'))
  })
  .catch(err => {
    console.error('Unable to connect to the databse:', err)
  })
