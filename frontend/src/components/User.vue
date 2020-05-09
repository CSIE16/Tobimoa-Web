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
            <tr v-for="item in users" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.phoneNumber }}</td>
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
      <v-dialog v-model="addDialog.show" persistent max-width="300px">
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
import axios from "axios";
export default {
  data() {
    return {
      users: "",
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
  },
  methods: {
  }
};
</script>