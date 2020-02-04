<template>
  <div>
    CHAT
    <div
      class="chat-window"
      ref="chatWindow"
    >
      <div
        class="message"
        v-for="(item, i) in messages"
        :key="i"
      >
        <div
          class="message-head"
        >
          <span>{{item.user.username}}</span>
          <span>{{parseDate(item.createdAt)}}</span>
        </div>
        
        <span>{{item.message}}</span>
        
      </div>
    </div>
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
    <button
      @click="scrollingChatWindow"
    >check</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapGetters } from 'vuex';

  export default {
    name: 'chat',
    data: () => ({
      message: '',
      messages: [] 
    }),
    methods:{
      async sendMessage() {  
        const response = await this.socket.emit('sendMessageAction', { msg: this.message, profile: this.profile });
      },
      parseDate(dateToParse){
        const [date, time] = dateToParse.split('T');
        const [yy, mm, dd] = date.split('-');
        const [hour, min, sec] = time.split('.')[0].split(':');
        return `${hour}:${min}:${sec}`;
      },
      scrollingChatWindow(){
        if(!this.$refs.chatWindow) return;
        const chatWindow = this.$refs.chatWindow;
        const bottom = chatWindow.scrollHeight + 50;
        this.$nextTick(() => chatWindow.scrollTo(0, bottom));
      },
      socketChatData(){
        this.socket.on('chatData', data => {
          this.messages = data;
          this.scrollingChatWindow();
        });
      }
    },
    computed:{
      ...mapGetters('auth', ['profile'])
    },
    created(){
      this.socket = io('http://127.0.0.1:4000/');
      this.socketChatData();
      this.socket.emit('getChatData');
    },
  };
</script>

<style lang="scss" scoped>
  $width: 40%;
  @mixin chatWidth(){
    -webkit-box-flex: 0;
    flex: 0 0 $width;
    max-width: $width;
  }
  .chat-window{
    @include chatWidth();
    padding: 1rem 0;
    border: 1px solid #fff;
    height: 350px;
    overflow: auto;
    
    .message{
      padding: 0 1rem;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }
  .chat-sendbox{
    @include chatWidth();
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
</style>