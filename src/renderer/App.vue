<template>
  <v-app id="ps4-xhost" dark>
    <shell></shell>
  </v-app>
</template>

<script>
import Shell from '@/components/Layout/Shell';

export default {
  components: {
    [Shell.name]: Shell,
  },
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
