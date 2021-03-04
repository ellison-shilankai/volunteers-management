import * as types from "./mutation-types";
export default {
  [types.SET_TOKEN](state, token) {
    state.token = token;
    if(token) {
      state.isUserLogin = true
    }
  },
  [types.SET_USER](state, user) {
    state.user = user
  }
}