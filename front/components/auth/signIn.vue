<template>
<v-card>
  <v-form
    v-model="valid"
    @submit.prevent="sign"
  >
    <v-text-field
      v-model="form.username"
      label="Login"
      :rules="usernameRule"
      autocomplete="username"
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="form.password"
      label="Password"
      autocomplete="password"
      :rules="passwordRule"
    ></v-text-field>
    <v-btn
      block
      type="submit"
      @click.prevent="sign"
      class="mt-3"
      :disabled="!valid"
    >
      sign in
    </v-btn>
  </v-form>
</v-card>
</template>

<script>
  export default {
    name: 'signIn',
    data: () => ({
      form: {
        username: '',
        password: ''
      },
      valid: true,
    }),
    computed:{
      usernameRule: () => [ v => !!v || 'Required field'], 
      passwordRule: () => [ 
        v => !!v || 'Required field',
        v => v.length >= 6 || "Min password length 6"
      ],
    },
    methods:{
      async sign(){
        if(!this.valid) return;
        this.$store.dispatch('auth/signIn', this.form);
      }
    }
  };
</script>

<style lang="scss" scoped>
.signIn{
  height: 100%;
  background: #424242;
}

</style>