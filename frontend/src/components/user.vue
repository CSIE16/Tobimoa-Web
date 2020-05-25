<template>
  <v-row>
    <v-col cols="12" md="10" class="fill-screen">
      <v-data-table
        :headers="headers"
        :items="users"
        :expanded.sync="expanded"
        :single-expand="singleExpand"
        item-key="Name"
        show-expand
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>User list</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-simple-table style="background-color: #34333b;">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Serial Number</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in item.Child" :key="i.Name">
                  <td>{{i.Name}}</td>
                  <td>{{i.SerialNum}}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deletebox.show = true,
                deletebox.item = {Name : item.Name, PhoneNum : item.PhoneNum},
                deletebox.msg='사용자의 정보를 삭제합니다.'">
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-col>
      <v-btn
        class="ma-3"
        @click="addDialog.show = true"
        outlined
        color="primary">
        추가하기
      </v-btn>
      <v-btn
        class="ma-3"
        @click="deletebox.show = true,
        deletebox.msg='모든 사용자의 정보를 삭제합니다.',
        deletebox.item=''"
        outlined
        color="primary">
        모든 데이터 삭제
      </v-btn>

      <addUser :addDialog="addDialog"/>
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
        users: [{Name: "aa", PhoneNum: "bb", listview: false}, {Name: "cc", PhoneNum: "dd", listview: false}],
        snackbar: false,
        timeout: 2000,
        text: "",
        addDialog: {
          name: "",
          phoneNum: "",
          password: "",
          child: [],
          show: false,
          show1: false,
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters'
          }
        },
        deletebox: {
          item: "",
          show: false,
          msg: "",
          accept: false,
        },
        expanded: [],
        singleExpand: false,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'Name',
          },
          {text: 'Phone Number', value: 'PhoneNum'},
          {text: 'Password', value: 'Password'},
          {text: 'Actions', value: 'actions', sortable: false},
          {text: '', value: 'data-table-expand'},
        ],
      };
    },
    methods: {
      deleteOne(item) {
        this.$http.delete('/api/delete/protector', {data: {pro: item}})
          .then(res => {
            alert("삭제되었습니다.")
            window.location.reload(true)
          })
          .catch(err => console.log(err))
      },
      deleteAll() {
        this.$http.delete('/api/delete/all')
          .then(res => {
            alert("삭제되었습니다.")
            window.location.reload(true)
          })
      },
      isaccept(yes) {
        if (this.deletebox.item == "") {
          if (yes) this.deleteAll()
          else this.deletebox.show = true
        } else {
          if (yes) this.deleteOne(this.deletebox.item)
          else this.deletebox.show = false
        }
      }
    },
    async created() {
      this.$http.get('/api/userlist')
        .then(async res => {
          this.users = res.data
          await this.users.forEach(i => i.listview = false)
        })
        .catch(err => console.log(err))
    },
    components: {
      addUser: () => import('./cardbox/adduser'),
      isdelete: () => import('./cardbox/isdelete'),
    }
  };
</script>
