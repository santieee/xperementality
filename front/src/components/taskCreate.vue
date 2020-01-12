<template>
  <div>
    <form @submit.prevent="taskCreate">
      <input v-model="form.title" type="text">
      <input v-model="form.description" type="text">
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
const form = () => ({
  title: '',
  description: ''
})
export default {
  data: () => ({
    form: form()
  }),
  methods:{
    async taskCreate(){
      await window.axios.post('http://localhost:3000/tasks', this.form)
      this.form = form() //clear from
    }
  }
}
</script>