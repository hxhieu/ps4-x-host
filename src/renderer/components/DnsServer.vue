<template>
  <div id="dns-server">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex md6 sm12>
          <v-card>
            <v-card-title>
              <h2>Status</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-switch label="ON / OFF" hide-details v-model="onOff" color="success"></v-switch>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md6 sm12>
          <v-card>
            <v-card-title>
              <h2>Settings</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form>
              <h3>Internet access</h3>
               <v-radio-group v-model="settings.internet" column hint="NOTE: Requests to playstation.net are ALWAYS blocked" persistent-hint>
                <v-radio :disabled="server.dns" label="No Internet"
                  color="primary"
                  value="none"></v-radio>
                <v-radio :disabled="server.dns" label="Limited Internet access"
                  color="primary"
                  value="google"></v-radio>
                </v-radio-group>
                <v-divider class="mb-4 mt-4"></v-divider>
                <h3>PS4 exploit host</h3>
                <v-radio-group v-model="settings.redirect.type">
                  <v-radio :disabled="server.dns" label="Built-in"
                    color="primary"
                    value="internal"></v-radio>
                  <v-radio :disabled="server.dns" label="Custom"
                    color="primary"
                    value="other"></v-radio>
                </v-radio-group>
                <v-text-field
                  :disabled="server.dns"
                  v-if="settings.redirect.type === 'other'"
                  label="IP or domain"
                  v-model="settings.redirect.value"
                  required></v-text-field>
              </v-form>
            </v-card-text>
            <v-snackbar
              :top="true"
              :color="snackbar.colour"
              v-model="snackbar.show">{{ snackbar.text }}
              <v-btn dark flat @click.native="snackbar.show = false">Close</v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    settings: {
      internet: 'none',
      redirect: {
        type: 'internal',
        value: '',
      },
    },
    snackbar: {
      show: false,
      text: '',
    },
  }),
  created() {
    this.checkValidHost = host => {
      const domain = /^(?=.{0,253}$)(([a-z0-9][a-z0-9-]{0,61}[a-z0-9]|[a-z0-9])\.)+((?=.*[^0-9])([a-z0-9][a-z0-9-]{0,61}[a-z0-9]|[a-z0-9]))$/i;
      const digit = /^\d+$/;
      const ip = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      const hostString = host.replace(/\./g, '');

      return digit.test(hostString) ? ip.test(host) : domain.test(host);
    };
  },
  computed: {
    ...mapState('Layout', ['server']),
    onOff: {
      get() {
        return this.server.dns;
      },
      set(status) {
        this.snackbar.colour = 'success';

        if (status) {
          if (
            this.settings.redirect.type === 'other' &&
            !this.checkValidHost(this.settings.redirect.value)
          ) {
            this.snackbar.text =
              'Cannot start server. Invalid IP or domain for custom host.';
            this.snackbar.colour = 'error';
          } else {
            this.snackbar.text = 'DNS Server has started successfully.';
          }
        } else {
          this.snackbar.text = 'DNS Server has stopped successfully.';
        }

        this.snackbar.show = true;

        if (this.snackbar.colour === 'success') {
          this.setServerStatus({ server: 'dns', status });
        }
      },
    },
  },
  methods: {
    ...mapActions('Layout', ['setServerStatus']),
  },
};
</script>

<style lang="scss">

</style>
