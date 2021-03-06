import axios from 'axios';
const request = axios.create()
export default {
  createActivity (data) {
    return request.post('/activities', data)
  },
  getActivityList (data) {
    return request.get('/activities', data)
  },
  getActivityById (id) {
    return request.get(`/activities/${id}`)
  },
  updateActivity (data) {
    return request.put('/activities/:id', data)
  },
  deleteActivity (id) {
    return request.delete(`/activities/${id}`)
  },
  findActivity(id) {
    return request.get(`/activities/${id}`)
  }
}