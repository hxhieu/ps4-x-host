<template>
  <div id="shell">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="navigateTo('/', 'Dashboard')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="navigateTo('/dns', 'DNS Server')">
          <v-list-tile-action>
            <v-icon>dns</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>DNS Server</v-list-tile-title>
          </v-list-tile-content>
          <server-status type="dns"></server-status>
        </v-list-tile>
        <v-list-tile @click="navigateTo('/web', 'Web Server')">
          <v-list-tile-action>
            <v-icon>http</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Web Server</v-list-tile-title>
          </v-list-tile-content>
          <server-status type="web"></server-status>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat disabled large>192.168.0.44</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>PS4 X-Host by Hugh Hoang &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ServerStatus from './ServerStatus';

export default {
  name: 'shell',
  components: {
    [ServerStatus.name]: ServerStatus,
  },
  data: () => ({
    drawer: true,
  }),
  methods: {
    navigateTo(url, title) {
      this.setTitle(title.toUpperCase());
      this.$router.push(url);
    },
    ...mapActions('Layout', ['setTitle']),
  },
  computed: {
    ...mapState('Layout', ['title', 'server']),
  },
};
</script>

<style lang="scss">
//@import "~material-design-icons-iconfont/dist/material-design-icons";
/* CSS */
</style>
