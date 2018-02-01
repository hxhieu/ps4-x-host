import { LAYOUT_TITLE } from '../types';

const state = {
  title: 'Dashboard',
  server: {
    dns: false,
    web: false,
  },
};

const mutations = {
  [LAYOUT_TITLE]: (state, title) => {
    state.title = title;
  },
};

const actions = {
  setTitle: ({ commit }, title) => {
    // do something async
    commit(LAYOUT_TITLE, title);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
