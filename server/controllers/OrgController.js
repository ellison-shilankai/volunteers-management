const { Org } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const org = await Org.create(req.body) 
      res.status(201).send({
        code: 200,
        org
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
    const orgList = await Org.findAll()
    // const SumInfo = await News.findAll({ offset: 4, limit: 4 })
    const {count} = await Org.findAndCountAll()
    try {
      if(orgList){
        res.status(201).send({
          code: 200,
          orgList,
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
      await Org.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        code: 200,
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
      await Org.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }
      )
      res.status(200).send({
        code: 200,
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