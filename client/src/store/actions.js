import * as types from "@/store/mutation-types";

export const setToken = ({ commit }, payload) => {
  commit(types.SET_TOKEN, payload)
}

export const setUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload)
}
