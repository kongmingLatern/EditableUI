import { Ref } from 'vue'

export function getAllSlotsChildrenContext(
  children: Ref<any[]>
) {
  return ref(
    children.value.reduce((acc: any[], child: any) => {
      // console.log(child)
      if (child.__v_isVNode) {
        acc.push(child.children)
      } else {
        acc.push(child)
      }
      return acc
    }, [])
  )
}
