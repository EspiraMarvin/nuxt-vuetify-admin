<template>
  <form @submit.prevent="submit">
    <v-row justify="center" align="center">
      <h1>Login to your account</h1>
    </v-row>

    <v-row class="ma-6" justify="center" align="center">
      <p  class="subheading"> sign in with </p>
    </v-row>

    <v-layout row wrap class="mb-6">
      <v-row justify="center" align="center">
          <v-btn
            class="mr-10"
            @click="twitter"
          > Twitter </v-btn>

          <v-btn
            class=" "
            @click="facebook"
          > Facebook </v-btn>
      </v-row>
    </v-layout>


    <v-row class="mb-6 mt-16" justify="center" align="center">
      <p  class="subheading"> Or sign in with credentials </p>
    </v-row>

    <v-text-field
      v-model="email"
      label="E-mail"
      required
      :rules="inputRulesEmail"
    >
    </v-text-field>
    <v-text-field
      v-model="password"
      :counter="6"
      label="Password"
      type="password"
      required
      :rules="inputRulesPass"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      label="Remember me"
      required
    ></v-checkbox>
    <v-row justify="center" align="center">
      <v-btn
        class="mr-4"
        @click="submit"
      >
        Sign in
      </v-btn>
    </v-row>
    <v-row justify="center" align="center">
      <div class="error">{{ error.message }}</div>
    </v-row>
  </form>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: "index",
    data() {
      return {
        email: '',
        password: '',
        checkbox: '',
        error: '',
        inputRulesPass: [
          v => v.length >= 6 || 'min length is 6 characters'
        ],
        inputRulesEmail: [
          v => v.length !== 0 || 'Email is required'
        ]
      }
    },


    methods: {
      submit() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          // console.log(data)
          this.$router.push('/contacts')
        }).catch(error => (this.error = error))
      },

      twitter(){
        let provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            console.log('results twi', result)
            this.$router.push('/contacts')

          })
          .catch(err => console.log(err))
      },

      facebook(){
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            // console.log(result)
            this.$router.push('/contacts')
          })
          .catch(err => console.log(err))
      }

    }

  }
</script>

<style scoped>

</style>
