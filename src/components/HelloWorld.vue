<script  setup>
import { Repl } from '@vue/repl'
import '@vue/repl/style.css'
import CodeMirror from '@vue/repl/codemirror-editor'


import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div>hello vue</div>
  <Repl :editor="CodeMirror" />
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

