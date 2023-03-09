export function getAllSlotsChildrenContext(
  children: any[]
) {
  // const t = Array.isArray(children)
  // console.log(t)
  const newArr = children.map(child => {
    if (child.children) {
      return {
        children: child.children,
      }
    }
  })
  // children.reduce((acc: any[], child: any) => {
  //   console.log('child', child)
  //   if (child.__v_isVNode) {
  //     acc.push(child.children)
  //   }
  //   return acc
  // })
  console.log('text', newArr)

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
