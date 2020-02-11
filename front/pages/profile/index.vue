<template>
  <div> 
    <div 
      class="list"
    >
      <h1>{{ $t('profile') }}</h1>
      <span>Id: {{ profile.id }}</span>
      <span>Username: {{ profile.username }}</span>    
    </div>

    <h2>{{ $t('sessions') }}</h2>
    <v-expansion-panels
      class="col-5 session-details"
    >
      <v-expansion-panel
        v-for="session in sessions"
        :key="session.id"
        class="session-info"
      >
        <v-expansion-panel-header>{{ $t('sessionId') }}: {{session.id}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div><h3>{{ $t('token') }}:</h3> {{session.token}}</div>
          <hr>
          <div><h3>{{ $t('refreshToken') }}:</h3> {{session.refreshToken}}</div>
          <hr>
          <div><h3>{{ $t('createdAt') }}:</h3> {{ session.createdAt }}</div>
          <hr>
          <h3>{{ $t('fingerPrint') }}:</h3>
          <div
            v-for="item in session.fingerPrint"
            :key="item.key"
          >
            <span><b>{{item.key}}:</b> {{item.value}}</span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import auth from '@/middleware/auth';

  export default {
    middleware: [auth],
    data: () => ({
      profile: {},
      sessions: []
    }),
    async asyncData ({ store }){
      const data = await store.dispatch('auth/getProfile');
      data.sessions = data.sessions.map( session => ({...session, fingerPrint: JSON.parse(session.fingerPrint)}));
      return data;
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
  margin-bottom: 3rem;
  span{
    display: block;
  }
}
.session-details{
  padding: 0;
  .session-info{
    *{
      word-wrap: break-word;
    }
  }
}
</style>