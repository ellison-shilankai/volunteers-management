const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    // 在这里定义模型属性
    userId: {
      type: DataTypes.INTEGER
    },
    orgId: {
      type: DataTypes.INTEGER
    },
  },
  // 这是其他模型参数
  {
    sequelize, // 我们需要传递连接实例
    modelName: 'UserOrg' // 我们需要选择模型名称
  }
  )
  return Model
}