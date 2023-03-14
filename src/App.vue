<script setup>
import Index from '~/pages/index.vue'
import Edit from '~/components/Edit'
</script>
<template>
  <button btn>I'm common button</button>
  <img src="./assets/cj1.jpeg" alt="this a picture" />
  <Edit>
    <button>I'm inside Edit button</button>
    <div @click="add">
      12313
      <span>12313</span>
    </div>
  </Edit>
</template>
