<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        name: 'login',
        created() {
          const url = window.location.href
          if(url.includes('http://')) location.href = 'https://subscribers.xtravelous.com'
        }
    }
</script>