import axios from 'axios';
const request = axios.create()
export default {
  createOrganize (data) { 
    return request.post('/org', data)
  },
  getOrganizeList (data) {
    return request.get('/org', data)
  },
  getOrganizeById (id) {
    return request.get(`/org/${id}`)
  },
  updateOrganize (data) {
    return request.put('/org/:id', data)
  },
  deleteOrganize (id) {
    return request.delete(`/org/${id}`)
  },
  findOrganize(id) {
    return request.get(`/org/${id}`)
  }
} 