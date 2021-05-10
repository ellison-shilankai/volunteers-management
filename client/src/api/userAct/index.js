import axios from 'axios';
const request = axios.create()
export default {
  createUserAct (data) {
    return request.post('/userAct', data)
  },
  getUserAct (data) {
    return request.get('/userAct', data)
  },
  // getActivityById (id) {
  //   return request.get(`/activities/${id}`)
  // },
  updateUserAct (data) {
    return request.put('/userAct/:id', data)
  },
  deleteUserAct (id) {
    return request.delete(`/userAct/${id}`)
  },
  // findActivity(id) {
  //   return request.get(`/activities/${id}`)
  // }
}