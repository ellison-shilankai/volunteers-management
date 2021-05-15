import * as types from "../mutation-types";
// import Api from "@/api/index";

const state = {
  activityList: [],
  orgAct: []
}

const mutations = { 
  [types.SET_ACTIVITY](state, activityList) {
    state.activityList = activityList
  },
  [types.SET_ORGACT](state, orgAct) {
    state.orgAct = orgAct
  }
}

const actions = {
  getActivity( {commit},  payload){
    commit(types.SET_ACTIVITY, payload)
  },
  getOrgAct( {commit},  payload){
    commit(types.SET_ORGACT, payload)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};