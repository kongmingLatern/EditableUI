function getAllSlotsChildrenContext(children: any[]) {
  console.log('children', children)
  const newArr = children.map(child => {
    const isComponent =
      child.type.render?.() ??
      child.type.setup?.() ??
      child.type.setup?.()?.()

    if (isComponent) {
      return getAllSlotsChildrenContext([isComponent])
    } else if (!Array.isArray(child.children)) {
      return {
        type: child.type,
        props: child.props || {},
        value: child.children,
      }
    } else {
      return {
        props: child.props || {},
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
        } else {
          return h(
            child.type,
            child.props || {},
            child.value
          )
        }
      })
    : children
}
