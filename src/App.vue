<script setup>
import Index from '~/pages/index.vue'
import Edit from '~/components/Edit'
import New from '~/components/New'
const src = ref('src/assets/cj1.jpeg')
const alt = ref('this a photo')
const changeSrc = () => {
  src.value = 'src/assets/cj.png'
}
</script>
<template>
  <!-- <button btn>I'm common button</button>
  <img :src="src" alt="this a picture" />
  {{ src }} -->
  <div>1231</div>
  <button btn @click="changeSrc">changeSrc</button>
  <Index :src="src" :alt="alt" />
  <Edit><New /></Edit>
</template>
