// import { SlotsType } from '~/shared/SlotsType'
// function getType(child) {
//   return typeof child.type === 'symbol'
//     ? SlotsType.TEXT_OR_FRAGMENT_CONTENT
//     : typeof child.type === 'object' && child.type !== null
//     ? SlotsType.COMPONENT_CONTENT
//     : SlotsType.ELEMENT_CONTENT
// }

export function getComponentContext(children: any[]) {
  return reactive(
    children.map(child => {
      return getComponentContext([child])
    })
  )
}

function getAllSlotsChildrenContext(children: any[]) {
  console.log('children', children)
  const newArr = children.map(child => {
    const isComponent = child.type.setup?.()()
    if (isComponent) {
      return getAllSlotsChildrenContext([isComponent])
    } else if (!Array.isArray(child.children)) {
      return {
        type: child.type,
        props: child.props,
        value: child.children,
      }
    } else {
      return {
        props: child.props,
        value: '',
        type: child.type,
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
  console.log('children', children)
  return children.map(child => {
    if (child.value === '' && child.children) {
      return h(
        child.type,
        child.props,
        renderChildren(child.children)
      )
    } else {
      return h(child.type, child.props, child.value)
    }
  })
}
