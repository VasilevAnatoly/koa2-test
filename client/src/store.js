import Vue from "vue";
import Vuex from "vuex";

import request from './asyncRequest';
import * as types from './mutation-types'

Vue.use(Vuex);

const booksModule = {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    data: []
  },
  mutations: {
    [types.GET_BOOKS_ASYNC.SUCCESS](state, info) {
      Vue.set(state, "loading", false);
      Vue.set(state, "data", info);
    },
    [types.GET_BOOKS_ASYNC.PENDING](state) {
      Vue.set(state, "loading", true);
    },
    [types.POST_BOOK_ASYNC.SUCCESS](state, info) {
      Vue.set(state, "loading", false);
    },
    [types.POST_BOOK_ASYNC.PENDING](state) {
      Vue.set(state, "loading", true);
    }
  },
  actions: {
    getBooks(store) {
      request(store, {
        url: "http://localhost:3000/books",
        method: "get",
        params: {},
        body: null,
        mutationTypes: types.GET_BOOKS_ASYNC
      });
    },
    postBook(store, data) {
      request(store, {
        url: "http://localhost:3000/books",
        method: "post",
        params: {},
        body: data,
        mutationTypes: types.POST_BOOK_ASYNC
      });
    }
  }
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    books: booksModule
  }
});