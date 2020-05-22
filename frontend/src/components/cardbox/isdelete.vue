<template>

    <v-dialog
      v-model="deletebox.show"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">정말 삭제하시겠습니까?</v-card-title>

        <v-card-text>
          <br/>
          {{deletebox.msg}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="isaccept(deletebox.item, true)"
          >
            네!!
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="isaccept(deletebox.item,  false)"
          >
            절대 안돼ㅐㅐ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['deletebox'],
    methods : {
      isaccept(item, yes){
        this.$emit('isaccept', item, yes);
      }
    }
  }
</script>
