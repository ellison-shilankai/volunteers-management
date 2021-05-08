import * as types from "../mutation-types";
// import Api from "@/api/index";

const state = {
  activityList: [{name : 1}],
}

const mutations = { 
  [types.SET_ACTIVITY](state, activityList) {
    state.activityList = activityList
  }
}

const actions = {
  getActivity( {commit},  payload){
    commit(types.SET_ACTIVITY, payload)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};