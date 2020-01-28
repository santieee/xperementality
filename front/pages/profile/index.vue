<template>
  <div>
    <h1>Profile</h1>
    <div class="list">
      <span>Id: {{ profile.id }}</span>
      <span>Username: {{ profile.username }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import auth from '@/middleware/auth';

  export default {
    middleware: [auth],
    data: () => ({
      profile: {}
    }),
    async asyncData ({ store }){
      const profile = await store.dispatch('auth/getProfile');
      return { profile };
    },
    methods:{
      ...mapActions({
        getProfile: 'auth/getProfile'
      })
    }
  };
</script>

<style lang="scss" scoped>
.list{
  span{
    display: block;
  }
}
</style>