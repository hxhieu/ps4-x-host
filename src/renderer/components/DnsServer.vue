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
               <v-radio-group v-model="settings.internet" column hint="Requests to playstation.net are ALWAYS blocked" persistent-hint>
                <v-radio :disabled="server.dns" label="No Internet"
                  color="info"
                  value="none"></v-radio>
                <v-radio :disabled="server.dns" label="Lmited Internet access"
                  color="info"
                  value="google"></v-radio>
                </v-radio-group>
                <v-divider class="mb-4 mt-4"></v-divider>
                <h3>PS4 exploit host</h3>
                <v-radio-group v-model="settings.redirect.type">
                  <v-radio :disabled="server.dns" label="Internal"
                    color="info"
                    value="internal"></v-radio>
                  <v-radio :disabled="server.dns" label="PS4 update blocker (LightningMods &amp; CelesteBlue)"
                    color="info"
                    value="ps4henv2"></v-radio>
                  <v-radio :disabled="server.dns" label="Other"
                    color="info"
                    value="other"></v-radio>
                </v-radio-group>
                <v-text-field
                  v-if="settings.redirect.type === 'other'"
                  label="IP or domain"
                  v-model="settings.redirect.value"
                  required></v-text-field>
              </v-form>
            </v-card-text>
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
  }),
  computed: {
    ...mapState('Layout', ['server']),
    onOff: {
      get() {
        return this.server.dns;
      },
      set(status) {
        this.setServerStatus({ server: 'dns', status });
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
