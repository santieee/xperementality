<template>
  <div>
    <button @click="getTask">GetTask</button>
    <div class="list">
      <ul>
        <li 
          v-for="task in tasks"
          :key="task.id"
        >
          {{task}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'taskList',
    data: () => ({
      tasks: []
    }),
    methods:{
      async getTask(){
        const { data } = await window.axios('http://localhost:3000/tasks')
        this.tasks = data
      }
  },
  }
</script>
