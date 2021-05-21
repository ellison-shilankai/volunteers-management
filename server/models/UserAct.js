const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    // 在这里定义模型属性
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actTime: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    isPass: {
      type: DataTypes.BOOLEAN
    },
    isFinish: {
      type: DataTypes.BOOLEAN
    }
  },
  // 这是其他模型参数
  {
    sequelize, // 我们需要传递连接实例
    modelName: 'UserAct' // 我们需要选择模型名称
  }
  )
  return Model
}