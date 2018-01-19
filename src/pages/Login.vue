<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Admin login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field @keyup.enter="login" v-model="username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
          <v-text-field @keyup.enter="login" v-model="password" prepend-icon="lock" name="password" label="Password" id="password"
            type="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    created() {
      const adminStorage = localStorage.getItem('xtravelous_admin')
      if (JSON.parse(adminStorage).username === '@dm1n' && JSON.parse(adminStorage).password === 'xtr@vel0us') {
        location.href = '#/subscribers'
      }
    },
    methods: {
      login() {
        if (this.username === '@dm1n' && this.password === 'xtr@vel0us') {
          localStorage.setItem("xtravelous_admin", JSON.stringify({
            username: this.username,
            password: this.password
          }))
          location.href = "#/subscribers"
        } else {
          alert('Invalid credentials.')
        }
      }
    }
  }

</script>

