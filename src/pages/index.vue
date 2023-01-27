<template>
  <h1 m10 @click="generateCode">123123</h1>
  <button @click="generateCode" btn>点击</button>
</template>

<script setup lang='ts'>
import { code } from '~/shared';

const generateCode = (event: Event) => {
  const element: EventTarget = event.target!
  generateFile(element, event.type)
}
const generateFile = (element: EventTarget, type: any) => {
  console.log(element, type);
  code(element, type)
}

</script>

<style scoped>

</style>