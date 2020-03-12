<template>
  <div class="auth">
    <v-tabs
      class="col-4"
    >
      <v-tab 
        class="col-6"
        @click="componentId = 'signIn'"
      >
      {{ $t('signin') }}
      </v-tab>
      <v-tab 
        class="col-6"
        @click="componentId = 'signUp'"
      >
      {{ $t('signup') }}
      </v-tab>
    </v-tabs>
    <component 
      :is="componentId"
      class="col-4 sign"
    ></component>
  </div>
</template>

<script>
import signIn from '@/components/auth/signIn.vue';
import signUp from '@/components/auth/signUp';
import notAuth from '@/middleware/not-auth';

  export default {
    name: 'auth',
    middleware: [notAuth],
    components:{
      signIn,
      signUp
    },
    data:() => ({
      componentId: 'signIn',
    })
  };

</script>

<style lang="scss" scoped>

.auth{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.v-tabs{
  margin: 0;
  padding: 0;
}
.sign{
  height: 100%;
}
</style>