const { News } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const info = await News.create(req.body) 
      res.status(201).send({
        code: 200,
        info: {
          title: info.title,
          introduce: info.introduce,
          content: info.content,
          created_at: info.created_at
        },
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
    const info = await News.findAll({ limit: 4 ,offset: 4})
    // const SumInfo = await News.findAll({ offset: 4, limit: 4 })
    const {count} = await News.findAndCountAll()
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
      await News.destroy(
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
      await News.update(
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