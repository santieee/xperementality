<template>
  <div id="app">
    <taskList/>
    <taskCreate/>
    <p>{{form}}</p>      
    <form @submit.prevent="clearForm(form)">
      <input type="text" v-model="form.test">
      <input type="text" v-model="form.check">
      <input type="text" v-model="form.obj.test">
      <button type="submit">clear</button>
    </form>
    <button @click="sendMessage">Click</button>
    {{message}}
  </div>
</template>

<script>
import taskList from './components/taskList'
import taskCreate from './components/taskCreate'
import io from 'socket.io-client'

export default {
  name: 'app',
  components: {
    taskList,
    taskCreate
  },
  data: () => ({
    socket: null,
    message: [],
    form:{
      test: '',
      check: '',
      obj: {
        test: ''
      }
    }
  }),
  created(){
    this.socket = io('http://localhost:3000')
    this.socket.on('msgToClient', (message) => {
      console.log(message)
      this.message.push(message)
    })
  },
  methods:{
    clearForm(){

    },
    sendMessage() {  
      this.socket.emit('msgToServer', 'olaoala')
    },
  }
}
</script>
