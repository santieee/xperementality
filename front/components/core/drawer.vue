<template>
  <v-navigation-drawer
    v-model="isEnableComputed"
    fixed
    app
    width="200"
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group>
        <div class="auth-block">
          <n-link 
            :to="userLink"
            tag="v-list-item"
            class='auth-block'
          >
            <v-list-item-title class='auth-title'> 
              <template v-if="isAuth">
                 <v-icon>mdi-account</v-icon>
                {{profile.username}}
              </template>
              <template v-else>
                <v-icon>mdi-account</v-icon>
                {{ $t('guest') }}
              </template>
            </v-list-item-title> 
          </n-link>
        </div>
        <n-link
          v-for="(group, id) in groups"
          :key="id"
          tag="v-list-item"
          :to="group.path"
        >
          <v-list-item-title>{{ $t(group.label) }}</v-list-item-title>
        </n-link>

      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="d-flex ma-5">
        <v-btn class="ma-auto p-2" @click="onChangeTheme">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </div>

      <client-only
        v-if="isAuth"
      >    
        <v-btn
          block     
          @click="logout"
        >
          <v-icon>
            mdi-logout
          </v-icon>
          {{ $t('logout') }}
        </v-btn>
      </client-only>
    </template>
  </v-navigation-drawer>
</template>

<script>
import groups from '@/static/data/rootGroups';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props:{
    isEnable:{
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    groups,
  }),
  computed:{
    ...mapGetters('auth',['isAuth', 'profile']),
    ...mapState('ui',['isDarkTheme']),
    isEnableComputed:{
      get(){ return this.isEnable; },
      set(v){ this.$emit('update:isEnable', v); }
    },
    userLink(){
      return this.isAuth ? '/profile' :  '/auth';
    }
  },
  methods:{
    ...mapActions({
      logout: 'auth/logout',
      setTheme: 'ui/setTheme',
      snackbar: 'ui/snackbar'
    }),
    listener(){
      if(event.keyCode !== 27) return;
      this.$emit('update:isEnable', false);
    },
    onChangeTheme(){
      this.setTheme(!this.isDarkTheme);
    }
  },
  watch:{
    isEnable(v){
      if(v) return addEventListener('keydown', this.listener);
      removeEventListener('keydown', this.listener);
    }
  }
};
</script>
<style lang="scss" scoped>
.auth-block{
  .auth-title{
    line-height: 2rem;
  }
  margin-bottom: 2rem;
}
</style>