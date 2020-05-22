<template>
  <v-dialog v-model="addDialog.show" persistent max-width="800px">
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
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="addDialog.password"
          :append-icon="addDialog.show1 ? 'visibility_off' : 'visibility'"
          :rules="[addDialog.rules.required, addDialog.rules.min]"
          class="ma-3"
          label="Password"
          hint="At least 4 characters"
          counter
          outlined
          :type="addDialog.show1 ? 'text' : 'password'"
          @click:append="addDialog.show1 = !addDialog.show1"
        ></v-text-field>
        <v-btn @click="addChild()">
          <v-icon>add</v-icon>
        </v-btn>
        <div v-if="addDialog.child[cnt - 1]">
          <div v-for="(item,i) in cnt">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="addDialog.child[i].name"
                  :rules="[addDialog.rules.required]"
                  class="ma-3"
                  label="Name"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="addDialog.child[i].serial"
                  :rules="[addDialog.rules.required]"
                  class="ma-3"
                  label="Serial Number"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
      <v-card-text>
        해당 항목을 추가 하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addUser()" text color="success">추가</v-btn>
        <v-btn @click="cancel()" text>취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "AddUser.vue",
    props: ['addDialog'],
    data() {
      return {
        cnt: 0,
      }
    },
    methods: {
      addUser() {
        let user = this.addDialog;
        this.$http.post('/api/adduser/', {
          name: user.name,
          phoneNum: user.phoneNum,
          password: user.password,
          player: user.child,
        })
          .then(res => {
            console.log(res);
            alert("등록을 완료하였습니다.");
            window.location.reload(true);
          })
          .catch(err => console.log(err))
      },
      addChild() {
        this.cnt++;
        this.addDialog.child.push({name: "", serial: ""});
      },
      cancel(){
        this.addDialog.show = false;
        this.cnt = 0;
        this.addDialog.child.splice(0,this.cnt);
      }
    }
  }
</script>
