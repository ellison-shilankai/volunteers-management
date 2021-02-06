const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    // 在这里定义模型属性
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 40]
      }
    }
  },
  // 这是其他模型参数
  {
    sequelize, // 我们需要传递连接实例
    modelName: 'User' // 我们需要选择模型名称
  }
  )
  return Model
}