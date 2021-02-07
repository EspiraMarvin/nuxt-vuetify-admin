<template>
  <v-row>
    <v-col class="text-center">


      <v-card class="pa-1 ma-1">
        <v-card-text>
          <h3>List of Contacts</h3>
          <v-card class="mt-4">
            <v-card-title>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
              <v-text-field
                outlined
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search Contact"
                class="md-8"
              ></v-text-field>
                  </v-col>

                  <v-spacer />
              <v-fab-transition>
                <v-btn
                  color="green"
                  fab
                  dark
                  small
                  right
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>

                </v-row>
              </v-container>

            </v-card-title>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="contacts"
              item-key="name"
              :search="search"
              show-select
              hide-default-footer
            >
              <template v-slot:item.image="{ item }">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
              </template>

              <template v-slot:item.rating="{ item }">

                  <v-icon
                    center
                  >
                    mdi-star
                  </v-icon>

                <v-spacer />
              </template>

              <template v-slot:item.option="{ item }">

              <v-icon
                center
              >
                mdi-dots-vertical
              </v-icon>
              </template>

            </v-data-table>
          </v-card>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
  import { getUserFromCookie } from "../helpers";
  import * as firebase from "firebase";

  export default {
    data () {
      return {
        search: '',
        selected: [],
        headers: [
          {
            text: 'Image',
            align: 'start',
            sortable: false,
            value: 'image',
          },
          { text: 'Name', value: 'name' },
          { text: 'Email ', value: 'email' },
          { text: 'Contact', value: 'contact' },
          { text: 'Rating', value: 'rating' },
          { text: 'Option', value: 'option' },
        ],
        contacts: [
          {
            name: 'Alice Blue',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            email: 'aliceblue@example.com',
            contact: 194803977,
          },
          {
            name: 'Jack Jackson',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            email: 'jack@example.com',
            contact: 856270960,
          },
          {
            name: 'Bruce Canta',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            email: 'bruce@example.com',
            contact: 838569758,
          },
          {
            name: 'Denis Richard',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            email: 'denis@example.com',
            contact: 39121480,
          },
          {
            name: 'Mia Wilson',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            email: 'mia@example.com',
            contact: 707670822,
          },
          {
            name: 'Florence Brown',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            email: 'travis@mail.com',
            contact: 906657210,
          }
        ],
      }
    },


    asyncData({req,redirect}) {
      if (process.server){
        const user = getUserFromCookie(req);
        console.log('user', user);
      }else{
        let user = firebase.auth().currentUser
        if(!user) {
          redirect('/')
        }
      }
    }

  }
</script>

