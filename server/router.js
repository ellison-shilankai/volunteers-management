const UserController = require('./controllers/UserController')
const NewsController = require('./controllers/NewsController')
const ActivitiesController = require('./controllers/ActivitiesController')
const OrgController = require('./controllers/OrgController')
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
  app.get('/users', UserController.getUserList)
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.post('/users', UserController.register)
  
  //组织
  app.post('/org', OrgController.create)
  app.get('/org', OrgController.find)
  app.put('/org/:id', OrgController.update)
  app.delete('/org/:id', OrgController.delete)

  //活动
  app.post('/activities', ActivitiesController.create)
  app.get('/activities', ActivitiesController.find)
  app.put('/activities/:id', ActivitiesController.update)
  app.delete('/activities/:id', ActivitiesController.delete)

  //资讯
  app.post('/news', NewsController.create)
  app.get('/news', NewsController.find)
  app.put('/news/:id', NewsController.update)
  app.delete('/news/:id', NewsController.delete)
}