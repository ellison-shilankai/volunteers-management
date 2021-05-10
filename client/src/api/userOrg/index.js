import axios from 'axios';
const request = axios.create()
export default {
  createUserOrg (data) {
    return request.post('/userOrg', data)
  },
  getUserOrg (data) {
    return request.get('/userOrg', data)
  },
  updateUserOrg (data) {
    return request.put('/userOrg/:id', data)
  },
  deleteUserOrg (id) {
    return request.delete(`/userOrg/${id}`)
  },
}