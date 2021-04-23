const { UserAct } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const info = await UserAct.create(req.body) 
      res.status(201).send({
        code: 200,
        info,
      }) 
    } catch (error) {
      console.log(error)
      let err = []
      if(error.errors) {
        error.errors.forEach(validateError => {
          err.push(validateError.message)
        })
      }
      res.status(400).send({
        code: 400,
        error: err.join(' ')
      })
    }
  },
  
  async find(req, res) {
    const userId = req.body.userId;
    const ActId = req.body.ActId;
    const info = await UserAct.findAll({
      where: {
      'ActId': ActId
      }
    }).then(res => {
      console.log(res)
    })
    // const info = await UserAct.findAll({
    //   include:[{
    //     model: User,
    //     'where': {
    //       'id': userId
    //     }
    //   }]
    // })
    // const SumInfo = await News.findAll({ offset: 4, limit: 4 })
    const {count} = await UserAct.findAndCountAll()
    try {
      if(info){
        res.status(201).send({
          code: 200,
          info,
          count
        })
      }else {
        res.status(400).send({
          code: 400,
          error: '没有找到对应的数据'
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据查询失败'
      })
    }
  },

  async delete(req, res) {
    try {
      await UserAct.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        message: '数据删除成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据删除失败'
      })
    }
  },

  async update (req, res) {
    try {
      await UserAct.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        message: '数据更新成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据更新失败'
      })
    }
  },
}