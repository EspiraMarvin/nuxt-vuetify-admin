<template>
  <v-app dark>
    <div v-if="loggedIn === true">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="loggedIn === true" />
      <v-toolbar-title class="ml-16" v-text="title" />
      <v-spacer />
      <div v-if="loggedIn === true">
<!--        username-->
 <!--       {{ // $auth.user }} -->
 <!--        logout button-->
        <v-btn text @click="logout">Logout</v-btn>


      </div>
      <div v-else>
<!--        login-->
        <v-btn text to="/">Login</v-btn>

<!--       register-->
<!--        <v-btn text to="/register">Register</v-btn>-->

      </div>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
<!--    </div>-->

      <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as firebase from "firebase"
import 'firebase/auth'
import Cookies from 'js-cookie'
import {getUserFromCookie} from "../helpers";

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Contacts',
          to: '/contacts'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Test',
      loggedIn: false
    }
  },


  // created() {
  //   let user = firebase.auth().currentUser
  //   if (!user){
  //     this.$router.push('/')
  //   }
  // },
  //
  asyncData({req,redirect}) {
    if (process.server){
      const user = getUserFromCookie(req);
      console.log('user with cookies', user);
      if (!user) {
        redirect('/')
      }
    }else{
      let user = firebase.auth().currentUser
      if(!user) {
        redirect('/')
      }
    }
  },

  mounted() {
    //check current user
    // let currentUser = firebase.auth().currentUser;
    // console.log(currentUser)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.$router.push('/contacts')
        // firebase.auth().currentUser.getIdToken(true)
        // .then(token => {
        //   Cookies.set('access_token', token)
        // });
        console.log("User exists", user);

      }else{
        this.loggedIn = false;
        this.$router.push('/')

        // Cookies.remove('access_token');
        console.log("user does not exist", user);
      }
    })
  },
  methods: {
    logout(){
      firebase.auth().signOut()
        .then(() => {
          console.log('User Signed Out')
          this.$router.push("/")
        });
    },
  }
}
</script>
