import { SlotsType } from '~/shared/SlotsType'
function getType(child) {
  return typeof child.type === 'symbol'
    ? SlotsType.TEXT_OR_FRAGMENT_CONTENT
    : typeof child.type === 'object' && child.type !== null
    ? SlotsType.COMPONENT_CONTENT
    : SlotsType.ELEMENT_CONTENT
}

export function getComponentContext(children: any[]) {
  return reactive(
    children.map(child => {
      return getComponentContext([child])
    })
  )
}

function getAllSlotsChildrenContext(children: any[]) {
  const newArr = children.map(child => {
    const isComponent = child.type.setup?.()()
    if (isComponent) {
      return getAllSlotsChildrenContext([isComponent])
    } else if (!Array.isArray(child.children)) {
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
  return newArr
}

export function reactiveChildren(children: any[]) {
  return reactive(getAllSlotsChildrenContext(children))
}

export function renderChildren(children) {
  console.log('children', children, Array.isArray(children))

  return children.map(child => {
    if (child.value === '' && child.children) {
      return renderChildren(child.children)
    } else {
      return child.value
    }
  })
}
