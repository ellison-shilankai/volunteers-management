import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";
import news from './modules/news';

Vue.use(Vuex);

const state = {
  token: '',
  user: null,
  isUserLogin: false
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    news,
  }
})