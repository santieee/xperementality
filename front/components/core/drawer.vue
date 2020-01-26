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

        <n-link
          v-for="(group, id) in groups"
          :key="id"
          tag="v-list-item"
          :to="group.path"
        >
          <v-list-item-title>{{ group.label }}</v-list-item-title>
        </n-link>

      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="d-flex ma-5">
        <v-btn class="ma-auto p-2" @click="onChangeTheme">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </div>
      <v-btn
        block
        @click="logout"
      >
        <v-icon>
          mdi-logout
        </v-icon>
        Logout
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import groups from '@/static/data/rootGroups';
import { mapMutations } from 'vuex';
import { mapGetters, mapActions } from 'vuex';
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
    isEnableComputed:{
      get(){ return this.isEnable; },
      set(v){ this.$emit('update:isEnable', v); }
    }
  },
  methods:{
    ...mapActions({
     logout: 'auth/logout'
    }),
    ...mapMutations('ui', ['CHANGE_THEME']),
    listener(){
      if(event.keyCode !== 27) return;
      this.$emit('update:isEnable', false);
    },
    onChangeTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.CHANGE_THEME();
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
