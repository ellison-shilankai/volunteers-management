import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: null,
    isUserLogin: false
  },
  getters,
  actions,
  mutations,
  modules: {

  }
})