<template>
  <v-app id="inspire" dark>
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
          <v-icon color="green">play_circle_filled</v-icon>
        </v-list-tile>
        <v-list-tile @click="navigateTo('/web', 'Web Server')">
          <v-list-tile-action>
            <v-icon>http</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Web Server</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>PS4 X-Host by Hugh Hoang &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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
    ...mapState('Layout', ['title']),
  },
};
</script>

<style lang="scss">
//@import "~material-design-icons-iconfont/dist/material-design-icons";
/* CSS */
</style>
