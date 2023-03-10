import { SlotsType } from '~/shared/SlotsType'
function getType(child) {
  return typeof child.type === 'symbol'
    ? SlotsType.TEXT_OR_FRAGMENT_CONTENT
    : SlotsType.ELEMENT_CONTENT
}
export function getAllSlotsChildrenContext(
  children: any[]
) {
  console.log(children)
  const newArr = children.map(child => {
    if (!Array.isArray(child.children)) {
      return {
        type: getType(child),
        value: child.children,
      }
    } else {
      // 普通节点
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
}
export function renderChildren(children) {
  return children.map(child => {
    if (child.value === '' && child.children) {
      return renderChildren(child.children)
    } else {
      return child.value
    }
  })
}
