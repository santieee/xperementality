<template>
  <v-card>
    <v-form 
      v-model="valid"
      @submit.prevent="sign"
    >
      <v-text-field
        v-model="form.username"
        label="Login"
        autocomplete="username"
        :rules="usernameRule"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
        autocomplete="new-password"
        :rules="passwordRule"
      ></v-text-field>
      <v-text-field
        v-model="form.rpassword"
        label="Repeat password"
        type="password"
        :rules="rpasswordRule"
        autocomplete="new-password"
      ></v-text-field>
      <v-btn
        block
        type="submit"
        @click.prevent="sign"
        class="mt-3"
        :disabled="!valid"
      >
        sign up
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: 'signUp',
    data: () => ({
      form: {
        username: '',
        password: '',
        rpassword: ''
      }, 
      valid: true,
    }),
    computed:{
      usernameRule(){ 
        return [ v => !!v || 'Required field'];
      },
      passwordRule(){
        return [ 
          v => !!v || 'Required field',
          v => v.length >= 6 || "Min password length 6"
        ];
      },
      rpasswordRule(){
        return [
          v => !!v || 'Required field',
          v => v == this.form.password || 'Passwords don`t match'
        ];
      }
    },
    methods:{
      validate(){
        if(this.form.password !== this.form.rpassword) return false;
        return this.valid;
      },
      async sign(){
        if(!this.validate()) return;
        const regData = {
          username: this.form.username,
          password: this.form.password, 
        };
        this.$store.dispatch('auth/signUp', regData);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>