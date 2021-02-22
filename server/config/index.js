const path = require('path')

module.exports = {
  db: {
    database: process.env.DATABASE || 'volunteers',
    username: 'volunteers',
    password: 'abc123',
    options: {
      host: 'localhost',
      dialect: 'sqlite', // 数据库类型
      storage: path.resolve(__dirname, '../db/volunteers.sqlite'),
      define: {
        underscored: true,
        paranoid: true
      }
    }
  },
  token: {
    secreOrPrivateKey: 'volunteers',
    options: {
      expiresIn: '24h'
    }
  }
}