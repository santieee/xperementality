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
          <button @click="remove(task.id)">remove</button>
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
      },
      async remove(id){
        await window.axios.delete('http://localhost:3000/tasks', { data: {id} })
        await this.getTask()
      }
  },
  }
</script>
