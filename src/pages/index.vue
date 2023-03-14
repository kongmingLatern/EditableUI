<template>
  <img :src="src" :alt="alt" />
  <div>123123 {{ src }} {{ alt }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
}>()
console.log('src', props)
</script>

<style scoped></style>
