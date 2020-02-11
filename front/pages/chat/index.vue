<template>
  <div>
    <v-sheet
      class="chat-window"
      id="chat-window"
      :elevation="10"
    >
    <template
      v-if="!messages.length"
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
        v-for="(item, i) in messages"
        :key="i"
      >
        <div
          class="message-head"
        >
          <span>{{item.user.username}}</span>
          <span
            :title="showParseDate(item.createdAt)"
          >{{showParseDateTime(item.createdAt)}}</span>
        </div>   
        <hr>
        <span>{{item.message}}</span>       
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
        this.$nextTick(() => {
          const chatWindow = document.getElementById('chat-window');
          const bottom = chatWindow.scrollHeight + 50;
          chatWindow.scrollTo(0, bottom);
        });
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
    beforeDestroy(){
      this.socket.close();
    }
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
      margin: .25rem .5rem;
      padding: .25rem 1rem;
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