import { LAYOUT_TITLE, LAYOUT_SERVER_STATUS } from '../types';

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
  [LAYOUT_SERVER_STATUS]: (state, { server, status }) => {
    state.server[server] = status;
  },
};

const actions = {
  setTitle: ({ commit }, title) => {
    commit(LAYOUT_TITLE, title);
  },
  setServerStatus: ({ commit }, { server, status }) => {
    commit(LAYOUT_SERVER_STATUS, { server, status });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
