<template>
  <v-dialog v-model="addDialog.show" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add User</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="addDialog.name"
          class="ma-3"
          label="Name"
          hide-details
          outlined
        ></v-text-field>
        <v-text-field
          v-model="addDialog.phoneNum"
          class="ma-3"
          label="Phone Number"
          hide-details
          outlined
        ></v-text-field>
        <v-text-field
          v-model="addDialog.password"
          :append-icon="addDialog.show1 ? 'visibility_off' : 'visibility'"
          :rules="[addDialog.rules.required, addDialog.rules.min]"
          :type="addDialog.show1 ? 'text' : 'password'"
          class="ma-3"
          label="Password"
          hint="At least 4 characters"
          counter
          @click:append="addDialog.show1 = !addDialog.show1"
          hide-details
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        해당 항목을 추가 하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addUser()" text color="success">추가</v-btn>
        <v-btn @click="addDialog.show = false" text>취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      name: "AddUser.vue",
      props: ['addDialog'],
      methods: {
        addUser(){
          let user = this.addDialog;
          this.$http.post('/api/adduser/', {
            name : user.name,
            phoneNum : user.phoneNum,
            password : user.password,
          })
            .then(res =>{
              console.log(res);
              alert("등록을 완료하였습니다.");
              window.location.reload(true);
            })
            .catch(err => console.log(err))
        }
      }
    }
</script>
