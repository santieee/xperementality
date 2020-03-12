<template>
  <div> 
   
    <div 
      class="list"
    > 
      <div class="profile-avatar">
        <v-avatar
          color="primary"
          class="avatar"
          size="100"
          @click="uploadPhoto"
        > 
          <client-only>
            <img :src='avatar'>
          </client-only>
        </v-avatar>
      </div>
      <div class="profile">
        <h1>{{ $t('profile') }}</h1>
        <span>Id: {{ profile.id }}</span>
        <span>Username: {{ profile.username }}</span>  
      </div>  
      <div class="profile">
        <client-only>
          <input
            ref="uploadPhoto"
            type="file"
            v-show="false"
            @change="savePhoto"
          />
        </client-only>
      </div>
    </div>

    <h2>{{ $t('sessions') }}</h2>
    <v-expansion-panels
      class="col-12 session-details"
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
import { mapActions, mapGetters } from 'vuex';
import auth from '@/middleware/auth';

  export default {
    middleware: [auth],
    async mounted(){
      await this.getProfile();
    },
    computed: {
      ...mapGetters('auth',['profile', 'sessions']),
      avatar(){
        if(!this.profile.photoPath) return `/image/userphoto/default.jpg`;
        return this.profile.photoPath;
      }
    },
    methods:{
      ...mapActions({
        getProfile: 'auth/getProfile',
        closeSession: 'auth/closeSession',
        logout: 'auth/logout',
        saveAvatar: 'auth/saveAvatar'
      }),
      uploadPhoto(){
        this.$refs.uploadPhoto.click();
      },
      async savePhoto($event){
        const formData = new FormData();
        formData.append('photo', $event.target.files[0]);
        this.saveAvatar(formData);
      },
      async destroySession(session){
        if(this.profile.token === session.token){
          if(!confirm(this.$t('closeCurrentSession'))) return;
          return this.logout();
        }
        await this.closeSession(session.token);
        await this.getProfile();
      }
    }
  };
</script>

<style lang="scss" scoped>
.list{
  margin-bottom: 3rem;
  display: flex;
  .profile{
    width: 50%;
    &-avatar{
      width: 150px; 
    }
  }
  .avatar{
    cursor: pointer;
  }
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