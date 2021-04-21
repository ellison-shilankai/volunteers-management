import * as types from "../mutation-types";
import Api from "@/api/index";

const state = {
  news: {},
}

const mutations = { 
  [types.SET_NEWS](state, news) {
    state.news = news
  }
}

const actions = {
  getNews( {commit},  payload){
    Api.getAllNew().then(res => {
      payload = res.data
      commit(types.SET_NEWS, payload)
    })
  }
}

export default {
  state,
  actions,
  mutations,
};