<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="$emit('isEnable')" />

    <v-toolbar-title>  
      <nuxt-link to="/">Xperimentality</nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <nuxt-link 
      v-if="!isAuth"
      :to="userLink" 
      exact
    >
      <v-icon>mdi-account</v-icon>
    </nuxt-link>
    <v-menu
      v-else
      left
      bottom
    >
      <template v-slot:activator="{ on }">
        <span>
          {{profile.username}}
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </span>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link to="/profile">
              <v-btn>
                profile
              </v-btn>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>

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
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('auth',['isAuth', 'profile']),
    userLink(){
      return this.isAuth ? '/profile' :  '/auth';
    }
  },
  methods:{
    ...mapActions({
      logout: 'auth/logout',
      getProfile: 'auth/getProfile',
    })
  }
};
</script>