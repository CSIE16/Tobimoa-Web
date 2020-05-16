<template>
  <v-row>
    <v-col cols="12" md="10" class="fill-screen">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users">
              <td>{{ item.Name }}</td>
              <td>{{ item.PhoneNum }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col>
      <v-btn
        class="ma-3"
        @click="addDialog.show = true"
        outlined
        color="primary"
        :small="$vuetify.breakpoint.smAndDown">
        <v-icon v-if="$vuetify.breakpoint.xsOnly">
          mdi-plus
        </v-icon>
        <span v-else>
          추가하기
        </span>
      </v-btn>

      <AddUser :addDialog="addDialog"/>

      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{text}}
        <v-btn
          color="blue"
          text
          @click="snackbar=false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      snackbar: false,
      timeout: 2000,
      text: "",
      addDialog: {
        name: "",
        phoneNum: "",
        password: "",
        show: false,
        show1: false,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters'
        }
      }
    };
  },
  async created() {
    this.$http.get('/api/userlist')
    .then(res => this.users = res.data)
    .catch(err => console.log(err))
  },
  components: {
    AddUser: () => import('./AddUser'),
  }
};
</script>
