<template>
  <h1 m10 @click="generateCode">123123</h1>
  <button @click="generateCode" btn>点击</button>


  <ul>
    <li @click="generateCode">123123</li>
  </ul>
</template>

<script setup lang='ts'>
import { code } from '~/shared';

const generateCode = (event: Event) => {
  const element: string = (event.target! as any).nodeName.toLowerCase()

  generateFile(element, event.type)
}
const generateFile = (element: string, type: any) => {
  code(element, type)
}

</script>

<style scoped>

</style>
