<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="$emit('isEnable')" />

    <v-toolbar-title>  
      <nuxt-link to="/">Xperimentality</nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <langSwithcerCp/>
    <!-- <template v-slot:extension>
      <v-tabs
        align-with-title
      >
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </template> -->

  </v-app-bar>
</template>
<script>
import langSwithcerCp from '@/components/core/language-switcher';
export default {
  components:{
    langSwithcerCp
  }
};
</script>