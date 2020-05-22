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
            <td style="text-align : right" ><v-btn @click="deletebox.show = true, deletebox.item = item">
              <v-icon>clear</v-icon>
            </v-btn></td>
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
        color="primary">
        추가하기
      </v-btn>

      <AddUser :addDialog="addDialog"/>
      <isdelete :deletebox="deletebox" @isaccept="isaccept"/>

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
        users: [{Name : "aa", PhoneNum : "bb"}],
        snackbar: false,
        timeout: 2000,
        text: "",
        addDialog: {
          name: "",
          phoneNum: "",
          password: "",
          child : [],
          show: false,
          show1: false,
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters'
          }
        },
        deletebox : {
          item : {Name : "", PhoneNum : ""},
          show : false,
          accept : false,
        }
      };
    },
    methods : {
      deleteOne(item){
        this.$http.delete('/api/delete/user', item)
          .then(res => {
            alert("삭제되었습니다.")
            window.location('/user')
          })
          .catch(err => console.log(err))
      },
      isaccept(item, yes){
        if(yes) this.deleteOne(item)
        else this.deletebox.show = false
      }
    },
    async created() {
      this.$http.get('/api/userlist')
        .then(res => this.users = res.data)
        .catch(err => console.log(err))
    },
    components: {
      AddUser: () => import('./cardbox/adduser'),
      isdelete: () => import('./cardbox/isdelete'),
    }
  };
</script>
