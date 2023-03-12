import { v4 as uuidv4 } from 'uuid'
function getAllSlotsChildrenContext(children: any[]) {
  console.log('children', children)
  const newArr = children.map(child => {
    const isComponent =
      child?.type?.render?.() ??
      child?.type?.setup?.() ??
      child?.type?.setup?.()?.()

    if (isComponent) {
      if (typeof isComponent === 'object') {
        return getAllSlotsChildrenContext([isComponent])
      } else {
        return {
          props: { ...child.props, '': uuidv4() },
          value: isComponent,
          type:
            typeof child.type.render() === 'string'
              ? 'text'
              : child.type,
          children:
            child?.children &&
            getAllSlotsChildrenContext(child?.children),
        }
      }
    } else if (!Array.isArray(child.children)) {
      return {
        type: child.type,
        props: { ...child.props, 'data-edit': uuidv4() },
        value: child.children,
      }
    } else {
      return {
        props: { ...child.props, 'data-edit': uuidv4() },
        value: '',
        type: child.type,
        children: getAllSlotsChildrenContext(
          child?.children
        ),
      }
    }
  })
  return newArr
}

export function reactiveChildren(children: any[]) {
  return reactive(getAllSlotsChildrenContext(children))
}

// helper 函数 渲染元素(主递归)
export function renderChildren(children) {
  console.log('children', children)
  return Array.isArray(children)
    ? children.map(child => {
        if (child.value === '' && child.children) {
          return h(
            child.type,
            child.props || {},
            renderChildren(child.children)
          )
        } else if (child.value) {
          return h(
            child.type,
            child.props || {},
            child.value
          )
        } else {
          // child 是数组的情况
          return renderChildren(child)
        }
      })
    : children
}
