<template>
  <div>
    <vue-topprogress ref="topProgress" color="#39BCFC"></vue-topprogress>
    <v-card>
      <v-card-text>
        <v-text-field ref="full_name" label="Full name" prepend-icon="person_pin" v-model="formData.fullName"></v-text-field>
        <v-text-field label="Email" prepend-icon="email" v-model="formData.email"></v-text-field>
        <v-text-field label="Message" multi-line prepend-icon="message" v-model="formData.message"></v-text-field>
        <div class="text-xs-center">
          <v-btn dark large color="orange darken-2" @click="register">GET THE BEST OFFERS!</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-snackbar :timeout="timeout" top right v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn flat color="light-blue lighten-2" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import db from '@/firebaseInit'
  import SmoothScroll from 'smooth-scroll/dist/js/smooth-scroll'
  const users = db.collection('users')
  export default {
    created() {
      new SmoothScroll('a[href*="#"]', {
        after: () => {
          this.$refs.full_name.focus()
        }
      })
    },
    data() {
      return {
        formData: {
          fullName: '',
          email: '',
          message: ''
        },
        snackbar: false,
        timeout: 3000,
        snackbarMessage: ''
      }
    },
    methods: {
      register() {
        if (!this.formData.fullName || !this.formData.email || !this.formData.message) {
          this.snackbarMessage = 'Oops. All fields are required.'
          this.snackbar = true
        } else {
          if (this.validateEmail(this.formData.email)) {
            this.$refs.topProgress.start()
            this.formData.created_at = Date.now()
            users.add(this.formData).then(res => {
              this.$refs.topProgress.done()
              this.snackbarMessage = 'Thank you for messaging us!'
              this.snackbar = true
              this.formData = {
                fullName: '',
                email: '',
                message: ''
              }
            }).catch(err => {
              this.$refs.topProgress.fail()
            })
          } else {
            this.snackbarMessage = 'Oops. Invalid email address.'
            this.snackbar = true
          }
        }
      },
      validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      }
    }
  }

</script>

