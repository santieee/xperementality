<template>
  <section>
    <div class="chat">
      <v-sheet
        class="chat-window"
        id="chat-window"
        :elevation="10"
      >
      <template
        v-if="loader"
      >
        <v-skeleton-loader
          v-for="i in 5"
          :key="i"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </template>
        <v-card
          class="message"
          elevation="5"
          v-for="(message, i) in messagesComputed"
          :key="i"
          :color="message.self ? 'primary': ''"
        >
          <div
            class="message-head"
          >
            <span>{{message.user.username}}</span>
            <span
              :title="message.createdAt"
            >
              {{message.createdAt}}
            </span>
          </div>   
          <hr>
          <span>{{message.message}}</span>       
        </v-card>
      </v-sheet>
      <v-form
        class="chat-sendbox"
        @submit.prevent="sendMessage"
      >
        <v-text-field
          v-model="message"
          outlined
          dense
        />
        <v-btn 
          type="submit"
        >Send</v-btn>
      </v-form>
      
    </div>
    <div class="chat-info">
      <h2>{{$t('online')}}:</h2>
      <template
        v-for="(item, idx) in onlineUsersComputed"
      >
        <span 
          :class="[item.self ? 'self' : '']"
          :key="idx"
        >
          {{item.user}}
        </span>
      </template>
    </div>
  </section>
</template>

<script>
import io from 'socket.io-client';
import { mapGetters } from 'vuex';
import auth from '@/middleware/auth';

  export default {
    name: 'chat',
    middleware: [auth],
    data: () => ({
      message: '',
      messages: [],
      onlineUsers: [],
      loader: true
    }),
    methods:{
      async sendMessage() {  
        await this.socket.emit('sendMessageAction', { msg: this.message, profile: this.profile });
        this.message = '';
      },
      showParseDateTime(dateToParse){
        const [date, time] = dateToParse.split('T');
        const [hour, min, sec] = time.split('.')[0].split(':');
        return `${hour}:${min}:${sec}`;
      },
      showParseDate(dateToParse){
        const [date, time] = dateToParse.split('T');
        const [yy, mm, dd] = date.split('-');
        const [hour, min, sec] = time.split('.')[0].split(':');
        return `${hour}:${min}:${sec} ${dd}.${mm}.${yy}`;
      },
      scrollingChatWindow(){
        if(!process.client) return;  
        const chatWindow = document.getElementById('chat-window');
        if(!chatWindow) return;
        const bottom = chatWindow.scrollHeight + 50;
        chatWindow.scrollTo(0, bottom);
      },
      socketGetChatData(){
        this.socket.on('chatData', data => {
          this.messages = data;
          this.scrollingChatWindow();
          this.loader = false;
        });
      },
      socketGetOnline(){
        this.socket.on('online', data => {
          this.onlineUsers = data;
        });
      }
    },
    computed:{
      ...mapGetters('auth', ['profile']),
      messagesComputed(){
        return this.messages.map( msg => { 
          msg.self = msg.user.username === this.profile.username ? true : false;
          msg.createdAt = this.showParseDate(msg.createdAt);
          return msg;
        });
      },
      onlineUsersComputed(){
        return this.onlineUsers.map( user => user === this.profile.username ? {user, self: true} : {user, self: false} );
      }
    },
    created(){
      this.socket = io('http://127.0.0.1:4000/', {query: {profile: JSON.stringify(this.profile)} });
      this.socketGetChatData();
      this.socketGetOnline();
      this.socket.emit('getChatData');
    },
    beforeDestroy(){
      this.socket.close();
    }
  };
</script>

<style lang="scss" scoped>
  $chatWidth: 70%;
  @mixin chatWidth(){
    -webkit-box-flex: 0;
    flex: 0 0 $chatWidth;
    max-width: $chatWidth;
  }
  
 
  section{
    display: flex;
    .chat{
      @include chatWidth();
      .chat-window{
        padding: 1rem 0;
        border: 1px solid #fff;
        height: 350px;
        overflow: auto;
        
        .message{
          margin: .25rem .5rem;
          padding: .25rem 1rem;
        }
      }
      .chat-sendbox{
        width: 100%;
        display: flex;
        margin: 2rem 0 !important;
        padding: 0 !important;
        justify-content: flex-end;
        flex-direction: column;
      }
      .message{
        display: flex;
        flex-direction: column;
        .message-head{
          display: flex;
          justify-content: space-between;
        }
      } 
    }
    .chat-info{
      margin-left: 2rem;
      .self{
        color: plum;
        text-shadow: 0 0 10px;
      }
      span{
        display: block;
      }
    }
  }
</style>