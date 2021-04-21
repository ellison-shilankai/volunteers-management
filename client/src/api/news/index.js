import axios from 'axios';
const request = axios.create()
export default {
  // async getUserById () {
  //   const response = await request.get('/users/3')
  //   return response.data
  // },
  createNew (data) {
    return request.post('/news', data)
  },
  getAllNew (data) {
    return request.get('/news', data)
  },
  deleteNew (data) {
    return request.delete('/news/:id', data)
  },
  updateNew (data) {
    return request.put('/news/:id', data)
  }
}