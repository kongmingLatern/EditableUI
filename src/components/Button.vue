<template>
  <button @dblclick="editInputContent" btn>
    <span v-show="!isShow">
      <!-- <slot></slot> -->
      <!-- <div v-for="item in allChildren" :key="item"> -->
      <span>
        <!-- {{ item.value }} -->
      </span>
      <span>
        <!-- {{
            typeof Array.isArray(item)
              ? typeof Array.isArray(item.value)
                ? item.value
                : 'false'
              : null -->
        <!-- }} -->
      </span>
      <!-- </div> -->
    </span>
    <span>
      <!-- <input
        v-for="item in allChildren"
        :key="item"
        ref="input"
        v-model="item.value"
        v-show="isShow"
        @blur="isShow = false"
        type="text"
        color-black
        autofocus
      /> -->
    </span>
  </button>
</template>

<script lang="ts">
// import { getAllSlotsChildrenContext } from '~/shared/helpers'

export default defineComponent({
  setup(props, { slots }) {
    const value = ref((props as any).value)
    const input = ref<HTMLInputElement>()
    const isShow = ref<boolean>(false)
    // const children = ref<unknown[]>(slots.default?.() || [])
    // let allChildren = getAllSlotsChildrenContext(children)
    // console.log(allChildren)
    // 给所有的 Child 添加响应式属性
    // allChildren = ref<any[]>(
    //   allChildren.value.map(child => {
    // if (typeof child === 'object' && child !== null) {
    //   Object.defineProperty(child, 'value', {
    //     get() {
    //       return value.value
    //     },
    //     set(newValue) {
    //       value.value = newValue
    //     },
    //   })
    // } else {
    //   // 如果是基本类型，赋值 ref 类型
    // child = ref(child)
    // }
    // console.log('child', child)
    //     return ref(child)
    //   })
    // )
    // console.log('allChildren', allChildren)
    // console.log('typeof', typeof allChildren.value[0])

    function editInputContent(event: Event) {
      isShow.value = true
      nextTick(() => {
        input.value?.focus()
      })
    }
    return {
      value,
      input,
      isShow,
      editInputContent,
      // allChildren,
    }
  },
})
</script>

<style scoped></style>
