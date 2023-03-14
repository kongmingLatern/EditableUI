import { initChildrenByType } from '~/packages/runtime'

function getAllSlotsChildrenContext(children: any[]) {
  console.log('children', children)
  const newArr = children.map(child => {
    return initChildrenByType(child)
  })
  return newArr
}

export function reactiveChildren(children: any[]) {
  return reactive(getAllSlotsChildrenContext(children))
}
