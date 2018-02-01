<template>
  <div id="dns-server">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card>
            <v-card-title>
              <h2>Status {{turnOn}}</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-switch label="ON / OFF" v-model="turnOn" color="success" @change="switchOnOff"></v-switch>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6 disabled>
          <v-card>
            <v-card-title>
              <h2>Settings</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-btn @click="test">test me</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    turnOn: true,
  }),

  methods: {
    test() {
      this.turnOn = false;
    },
    switchOnOff() {
      console.log(this.turnOn);
    },
  },
};
</script>

<style lang="scss">

</style>
