import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

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
  },
  plugins: [createPersistedState()]//会自动保存创建的状态。刷新还在
})