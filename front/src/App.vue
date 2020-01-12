<template>
  <div id="app">
    <taskList/>
    <taskCreate/>
    <form @submit.prevent="clearForm(form)">
      <p>{{form}}</p>      
      <button type="submit">clear</button>
    </form>
  </div>
</template>

<script>
import taskList from './components/taskList'
import taskCreate from './components/taskCreate'

export default {
  name: 'app',
  components: {
    taskList,
    taskCreate
  },
  data: () => ({
    form:{
      test: '123',
      check: 'check',
      obj: {
        ch: 21
      },
      arr: [1,2,3,4]
    }
  }),
  methods:{
    clearForm(form){
      for(let key of Object.keys(form)){
        switch (typeof form[key]){
          case 'string':
            form[key] = ''
            break
          case 'object':
            form[key] = Array.isArray(form[key]) ? [] : {}
            break
        }       
      }
    }
  }
}
</script>
