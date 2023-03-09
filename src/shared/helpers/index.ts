export function getAllSlotsChildrenContext(
  children: any[]
) {
  const newArr = children.map(child => {
    if (!Array.isArray(child.children)) {
      return {
        value: child.children,
      }
    } else {
      return {
        value: '',
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
