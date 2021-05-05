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
    compareStatus (status) {
      return this.status === status
    }
  }
  Model.init({
    // 在这里定义模型属性
    name: {
      type: DataTypes.STRING,
      defaultValue: "Jack"
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: '该邮箱地址已被注册，请更换'
      },
      validate: {
        isEmail: true
      }
    }, 
    tel: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          min: 6,
          max: 18,
          msg: '密码长度必须大于6小于18'
        }
      }
    },
    time: {
      type: DataTypes.DECIMAL,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "volunteer"
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