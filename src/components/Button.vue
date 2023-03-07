<template>
  <button @dblclick="editInputContent" btn>
    <span v-show="!isShow">
      {{ value }}
    </span>
    <span>
      <input
        ref="input"
        v-model="value"
        v-show="isShow"
        @blur="isShow = false"
        type="text"
        color-black
        autofocus
      />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
}>()
const value = ref(props?.value)
const input = ref<HTMLInputElement>()
const isShow = ref<boolean>(false)

function editInputContent(event: Event) {
  isShow.value = true
  nextTick(() => {
    input.value?.focus()
  })
  console.log(event)
}
</script>

<style scoped></style>
