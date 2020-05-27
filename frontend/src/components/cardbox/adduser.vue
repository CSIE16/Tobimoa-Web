<template>
  <v-dialog v-model="addDialog.show" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">사용자 {{this.addDialog.msg}}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="addDialog.Name"
          class="ma-3"
          label="Name"
          hide-details
          outlined
        ></v-text-field>
        <v-text-field
          v-model="addDialog.PhoneNum"
          class="ma-3"
          label="Phone Number"
          outlined
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="addDialog.Password"
          :append-icon="addDialog.show1 ? 'visibility_off' : 'visibility'"
          :rules="[addDialog.rules.required, addDialog.rules.min]"
          class="ma-3"
          label="Password"
          hint="At least 4 characters"
          counter
          outlined
          :type="addDialog.show1 ? 'text' : 'Password'"
          @click:append="addDialog.show1 = !addDialog.show1"
        ></v-text-field>
        <v-btn @click="addChild()">
          <v-icon>add</v-icon>
        </v-btn>
            <v-row v-for="item in addDialog.Child">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.Name"
                  :rules="[addDialog.rules.required]"
                  class="ma-3"
                  label="Name"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.SerialNum"
                  :rules="[addDialog.rules.required]"
                  class="ma-3"
                  label="Serial Number"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
      </v-card-text>
      <v-card-text>
        해당 항목을 {{addDialog.msg}} 하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addUser()" text color="success">{{this.addDialog.msg}}</v-btn>
        <v-btn @click="cancel()" text>취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    Name: "AddUser.vue",
    props: ['addDialog'],
    methods: {
      async addUser() {
        const user = this.addDialog;
        let list = [];
        list = "hi";
        const constList = [];
        constList.push(1);
  // TS
        let cnt = 0;
        let cnt: number = 0;
        cnt = true; // TYPE ERROR!

        const values = {
          cnt: 0
        }
        values.cnt++;

        this.$http.post('/api/adduser/', {
          Name: user.Name,
          PhoneNum: user.PhoneNum,
          Password: user.Password,
          player: user.Child,
        })
          .then(res => {
            console.log(res);
            alert("등록을 완료하였습니다.");
            window.location.reload(true);
          })
          .catch(err => console.log(err))
      },
      addChild() {
        this.$emit('addChild')
      },
      cancel(){
        this.$emit('cancel')
      }
    }
  }
</script>
