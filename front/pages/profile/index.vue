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
      class="col-10 session-details"
    >
      <v-expansion-panel
        v-for="session in sessions"
        :key="session.id"
        class="session-info"
      >
        <v-expansion-panel-header>
          <span>{{ $t('sessionId') }}: {{session.id}}</span>
          <span v-if="session.current">
            <v-chip
              color="green"
              class="current-badge"
              label
              outlined
            >
              {{$t('current')}}
            </v-chip>
          </span>
          <span class="close-session">
            <v-icon 
              :title="$t('closeSession')"
              @click.native.stop="destroySession(session)"
            >
              mdi-close-circle
            </v-icon>
          </span>
        </v-expansion-panel-header>
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
      data.sessions = data.sessions
        .map( session => ({
          ...session, 
          fingerPrint: JSON.parse(session.fingerPrint),
          current: session.token == store.getters['auth/profile'].token
        }))
        .reverse();
      return data;
    },
    methods:{
      ...mapActions({
        getProfile: 'auth/getProfile',
        closeSession: 'auth/closeSession',
        logout: 'auth/logout'
      }),
      async getSessions(){
        const data = await this.getProfile();
        return data.sessions
        .map( session => ({
          ...session, 
          fingerPrint: JSON.parse(session.fingerPrint),
          current: session.token == this.$store.getters['auth/profile'].token
        }))
        .reverse();
      },
      async destroySession(session){
        if(this.$store.getters['auth/profile'].token === session.token){
          if(!confirm(this.$t('closeCurrentSession'))) return;
          return this.logout();
        }
        await this.closeSession(session.token);
        this.sessions = await this.getSessions();
      }
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
    .current-badge{
      float: right;
      margin: 0 .5rem;
    }
    .close-session{
      max-width: 30px;
      & i:hover{
        transition: .25s all;
        color: red;
      }
    }
  }
}
</style>