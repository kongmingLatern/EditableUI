<template>
  <img :src="src" :alt="alt" />
  <div>123123 {{ src }} {{ alt }}</div>
  123123
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
}>()
</script>

<style scoped></style>
