import { SlotsType } from '~/shared/SlotsType'
function getType(child) {
  return typeof child.type === 'symbol'
    ? SlotsType.TEXT_OR_FRAGMENT_CONTENT
    : SlotsType.ELEMENT_CONTENT
}
export function getAllSlotsChildrenContext(
  children: any[]
) {
  const newArr = children.map(child => {
    if (!Array.isArray(child.children)) {
      return {
        type: getType(child),
        value: child.children,
      }
    } else {
      return {
        value: '',
        type: getType(child),
        children: getAllSlotsChildrenContext(
          child.children
        ),
      }
    }
  })
  return reactive(newArr)

  // return ref(
  //   children.value.reduce((acc: any[], child: any) => {
  //     // console.log(child)
  //     if (child.__v_isVNode) {
  //       acc.push(child.children)
  //     } else if (typeof child === 'object') {
  //       getAllSlotsChildrenContext(child)
  //     }
  //     return acc
  //   }, [])
  // )
}
