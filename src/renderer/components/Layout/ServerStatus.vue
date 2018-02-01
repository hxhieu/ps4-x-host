<template>
  <label v-if="server[type]" class="server-status online">ON</label>
  <label v-else class="server-status offline">OFF</label>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'server-status',
  props: {
    type: String,
  },
  computed: {
    ...mapState('Layout', ['server']),
  },
};
</script>

<style lang="scss">
.server-status {
  font-weight: bold;
  &.online {
    color: #091;
  }
  &.offline {
    color: #f00;
  }
}
</style>
