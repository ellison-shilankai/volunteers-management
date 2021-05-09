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
  app.get('/users/:id', UserController.getUserById)
  app.get('/users', UserController.getUserList)
  app.put('/users/:id', UserController.update)
  app.delete('/users/:id', UserController.delete)
  app.post('/users', UserController.register)
  
  //组织
  app.post('/org', OrgController.create)
  app.get('/org', OrgController.find)
  app.put('/org/:id', OrgController.update)
  app.delete('/org/:id', OrgController.delete)
  app.get('/org/:id', OrgController.findOrgById)

  //活动
  app.post('/activities', ActivitiesController.create)
  app.get('/activities', ActivitiesController.find)
  app.put('/activities/:id', ActivitiesController.update)
  app.delete('/activities/:id', ActivitiesController.delete)
  app.get('/activities/:id', ActivitiesController.findActivityById)

  //资讯
  app.post('/news', NewsController.create)
  app.get('/news', NewsController.find)
  app.put('/news/:id', NewsController.update)
  app.delete('/news/:id', NewsController.delete)
}