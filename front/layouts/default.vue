<template>
  <v-app>
    <!-- <preloaderCp v-if="!isPageLoaded"/> -->
    <snackbarCp />
    <header-cp @isEnable="drawer = !drawer"/>
    <drawer-cp :isEnable.sync="drawer" />

    <v-content>
      <nuxt class="page"/>
    </v-content>

  </v-app>
</template>

<script>
import headerCp from '@/components/core/header';
import drawerCp from '@/components/core/drawer';
import snackbarCp from '@/components/core/snackbar';
import preloaderCp from '@/components/core/preloader';

export default {
  components:{
    headerCp,
    drawerCp,
    preloaderCp,
    snackbarCp
  },
  data: () => ({
    drawer: false,
    isPageLoaded: false
  }),
  beforeCreate(){
    this.$vuetify.theme.dark =  this.$store.state.ui.isDarkTheme;
  }
};
</script>