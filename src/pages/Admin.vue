<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="headline">
          Subscribers </div>
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-card-title>
      <v-data-table :loading="loading" :rows-per-page-items="[10,15,20,{text:'All', value:-1}]" :search="search" :headers="headers"
        :items="subscribers" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.fullName }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.created_at | formatDate }}</td>
        </template>
        <template slot="footer">
          <td colspan="100%" class="text-xs-center">
            <v-btn @click.native="download" flat color="green darken-1">
              <v-icon left>file_download</v-icon> Download as spreadsheet</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import db from '@/firebaseInit'
  const users = db.collection('users')
  import moment from 'moment'
  import JSONToCSVConverter from '@/plugins/jsonTOCSV'
  export default {
    created() {
      this.fetchUsers()
      const adminStorage = localStorage.getItem('xtravelous_admin')
      if (!adminStorage) {
        location.href = '#/'
      } else {
        if (JSON.parse(adminStorage).username === 'x' || JSON.parse(adminStorage).password === 'x') {
          location.href = '#/'
        }
      }
    },
    data() {
      return {
        subscribers: [],
        currentMessage: '',
        dialog: false,
        search: '',
        headers: [{
            text: 'Name',
            align: 'left',
            value: 'fullName'
          },
          {
            text: 'Email Address',
            align: 'left',
            value: 'email'
          },
          {
            text: 'Date Subscribed',
            align: 'left',
            value: 'created_at'
          }
        ],
        loading: false
      }
    },
    methods: {
      fetchUsers() {
        this.loading = true
        users.onSnapshot(snapshot => {
          snapshot.docChanges.forEach(change => {
            if (change.type === 'added') this.subscribers.push(change.doc.data())
          })
          this.loading = false
        })
      },
      viewMessage(message) {
        this.currentMessage = message
        this.dialog = true
      },
      download() {
        let subscribers = this.subscribers.map(s => s)
        JSONToCSVConverter(subscribers, `Subscribers as of ${moment(Date.now()).format('L')}`, true)
      }
    },
    filters: {
      formatDate: (val) => {
        return moment(val).format('L LT')
      }
    }
  }

</script>

