<script setup>
import Index from '~/pages/index.vue'
import Edit from '~/components/Edit'
import cj from '~/assets/cj1.jpeg'
</script>
<template>
  <button btn>I'm common button</button>
  <Edit>
    <div>
      <span>BBBBB</span>
      <span>BBBBB</span>
      <span>BBBBB</span>
      <span>BBBBB</span>
      <span>BBBBB</span>
      123123
    </div>
    <span>AAAA</span>
    <span>AAAA</span>
    <span>AAAA</span>
    <Index />
    <img :src="cj" alt="" />
    <button>I'm inside Edit button</button>
  </Edit>
</template>
