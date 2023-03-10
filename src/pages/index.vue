<template>
  <Edit>
    <Button1 />
    <Button1></Button1>
    <button btn>123123</button>

    {{ num }}
    <div v-for="item in arr" :key="item">
      {{ item }}
    </div>
  </Edit>
  <Button1></Button1>
</template>

<script setup lang="ts">
import Edit from '~/components/Edit'
import Button1 from '~/components/Button'
const num = ref(0)
const arr = reactive([1, 2, 3])
</script>

<style scoped></style>
