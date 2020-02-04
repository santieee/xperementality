<template>
  <client-only>
    <v-snackbar
      :timeout="snackbar.timeout"
      v-model="snackbarStatus"
      top
      right
      :color="snackbar.type"
    >
      {{ snackbar.msg }}
      <v-icon
        text  
        @click="CLOSE_SNACKBAR"
      >
        mdi-close
      </v-icon>
    </v-snackbar>
  </client-only>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {
    computed:{
      ...mapGetters('ui', ['snackbar']),
      snackbarStatus:{
        get(){
          return this.$store.getters['ui/snackbar'].status;
        },
        set(v){
          if(!v) this.CLOSE_SNACKBAR();
        }
      }
    },
    methods:{
      ...mapMutations({
        CLOSE_SNACKBAR:'ui/CLOSE_SNACKBAR'
      }),
    }
  };
</script>

<style lang="scss" scoped>
.v-snack--top {
  top: 2rem;
}
</style>