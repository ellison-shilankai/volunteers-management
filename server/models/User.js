const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')
function hashPassword(user, options) {
  if (user.changed('password')) {
    user.password = MD5(user.password).toString()
  }
}

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {
    // 根据前端传过来的密码和数据库密码比较
    comparePassword (password) {
      return this.password === MD5(password).toString()
    }
  }
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
    hooks: {
      afterValidate: hashPassword
    },
    sequelize, // 我们需要传递连接实例
    modelName: 'User' // 我们需要选择模型名称
  }
  )
  return Model
}