const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}
  Model.init({
    // 在这里定义模型属性
    name: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    introduce: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE
    },
    place: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING
    },
    orgName: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "招募中"
    },
    type: {
      type: DataTypes.STRING
    },
    time: {
     type: DataTypes.DECIMAL,
    },
    totalPeople: {
      type: DataTypes.BIGINT,
      defaultValue: 10
    }
  },
  // 这是其他模型参数
  {
    sequelize, // 我们需要传递连接实例
    modelName: 'Activities' // 我们需要选择模型名称
  }
  )
  return Model
}