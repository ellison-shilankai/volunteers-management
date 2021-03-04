import axios from 'axios';
const request = axios.create()
export default {
  // async getUserById () {
  //   const response = await request.get('/users/3')
  //   return response.data
  // },
  register (data) {
    return request.post('/users', data)
  },
  login (data) {
    return request.post('/users/login', data)
  }
}