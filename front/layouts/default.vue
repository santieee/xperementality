<template>
  <v-app>

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
export default {
  components:{
    headerCp,
    drawerCp
  },
  data: () => ({
    drawer: false,
  }),
  beforeCreate(){
    this.$vuetify.theme.dark =  this.$store.state.ui.isDarkTheme;
  }
};
</script>