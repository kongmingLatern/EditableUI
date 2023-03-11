import {
  renderChildren,
  isSimpleComponent,
  isNested,
} from '~/shared'
import EditTable from '~/components/EditTable'

// 渲染所有元素（包括组件）
export function renderAllChildren(allChildren) {
  console.log('renderAllChildren', allChildren)

  return allChildren.map(child => {
    if (Array.isArray(child)) {
      console.log('renderAllChildren component', child)

      return child.map(ch =>
        // 单节点的组件只有一个 value 值
        isSimpleComponent(ch.value)
          ? h(ch.type, ch.props || {}, ch.value)
          : h(
              ch.type,
              ch.props || {},
              renderChildren(ch.children)
            )
      )
    } else if (isNested(child)) {
      return renderChildren(child.children)
    } else if (child.value !== '') {
      return h(child.type, child.props || {}, child.value)
    }
  })
}

// 获取所有需要编辑的元素
export function getAllChildrenEdit(children) {
  console.log('children', children)

  return children.map((child, index) => {
    // 组件
    if (Array.isArray(child)) {
      return child.map(ch =>
        isSimpleComponent(ch.value) ? (
          <EditTable child={ch} index={index} />
        ) : (
          getAllChildrenEdit(ch.children)
        )
      )
    } else if (isNested(child)) {
      return getAllChildrenEdit(child.children)
    } else {
      return <EditTable child={child} index={index} />
    }
  })
}
