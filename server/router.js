const UserController = require('./controllers/UserController')
const NewsController = require('./controllers/NewsController')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
  // app.get('/api', (req, res) => {
  //   res.send({
  //     msg: 'Hello node'
  //   })
  // })
  //用户
  app.post('/users/login', UserController.login)
  app.get('/users/:id', 
    // AuthenticatePolicy.isValidToken,
    UserController.getUserById
  )
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.post('/users', UserController.register)

  //资讯
  app.post('/news', NewsController.create)
  app.get('/news', NewsController.find)
  app.put('/news/:id', NewsController.update)
  app.delete('/news/:id', NewsController.delete)
}