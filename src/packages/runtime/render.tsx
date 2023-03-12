import {
  isSimpleComponent,
  isNested,
  isObject,
  SlotsType,
  ComponentType,
} from '~/shared'
import { v4 as uuidv4 } from 'uuid'
import EditTable from '~/components/EditTable'

// 渲染所有元素（包括组件）
export function renderAllChildren(allChildren) {
  console.log('renderAllChildren', allChildren)

  return allChildren.map(child => {
    if (Array.isArray(child)) {
      console.log('renderAllChildren component', child)

      return child.map(ch => {
        // 单节点的组件只有一个 value 值
        console.log('ch', ch)
        return Array.isArray(ch)
          ? renderChildren(ch)
          : isSimpleComponent(ch.value)
          ? h(ch.type, ch.props || {}, ch.value)
          : h(
              ch.type,
              ch.props || {},
              renderChildren(ch.children)
            )
      })
    } else if (isNested(child)) {
      return h(
        child.type,
        child.props,
        renderChildren(child.children)
      )
    } else if (child.value !== '') {
      return h(child.type, child.props || {}, child.value)
    }
  })
}

let index = 0
// 获取所有需要编辑的元素
export function getAllChildrenEdit(children) {
  console.log('children', children)

  return children.map(child => {
    // 组件
    if (Array.isArray(child)) {
      return child.map(ch =>
        Array.isArray(ch) ? (
          getAllChildrenEdit(ch)
        ) : isSimpleComponent(ch.value) ? (
          <EditTable child={ch} index={index++} />
        ) : (
          getAllChildrenEdit(ch.children)
        )
      )
    } else if (isNested(child)) {
      return getAllChildrenEdit(child.children)
    } else {
      return <EditTable child={child} index={index++} />
    }
  })
}

// 获取 type
export function getType(vnode) {
  return isObject(vnode.type)
    ? SlotsType.COMPONENT
    : typeof vnode.type === 'string'
    ? SlotsType.ELEMENT
    : SlotsType.TEXT_OR_FRAGMENT
}

export function initChildrenByType(vnode) {
  const type = getType(vnode)
  console.log('initChildrenByType', type)
  switch (type) {
    case SlotsType.COMPONENT:
      return renderComponent(vnode)
    case SlotsType.ELEMENT:
      return renderElement(vnode)
    case SlotsType.TEXT_OR_FRAGMENT:
      return renderTextOrFragment(vnode)
  }
}

function renderTextOrFragment(vnode) {
  console.log('renderTextOrFragment', vnode)

  if (typeof vnode === 'string') {
    return {
      type: 'text',
      props: { 'data-edit': uuidv4() },
      value: vnode,
    }
  }

  if (Array.isArray(vnode.children)) {
    return {
      type: 'text',
      props: { 'data-edit': uuidv4() },
      value: '',
      children: vnode.children.map(item =>
        initChildrenByType(item)
      ),
    }
  } else {
    return {
      type: 'text',
      props: { 'data-edit': uuidv4() },
      value: vnode.children,
    }
  }
}

function getComponentType(type) {
  return Component(type)
  // 判断是什么组件库
  // return ComponentType.ANT_DESIGN_VUE
}

function Component(type) {
  function AntdComponent() {
    return type.hasOwnProperty('install')
  }
  function VueComponent() {
    return (
      type.hasOwnProperty('render') ||
      type.hasOwnProperty('setup')
    )
  }
  if (AntdComponent()) {
    return ComponentType.ANT_DESIGN_VUE
  } else if (VueComponent()) {
    return ComponentType.VUE_COMPONENT
  }
}

function renderElement(child) {
  // Implement
  console.log('renderElement', child)

  if (Array.isArray(child.children)) {
    return {
      value: '',
      type: child.type,
      props: { ...child.props, 'data-edit': uuidv4() },
      children: child.children.map(item =>
        initChildrenByType(item)
      ),
    }
  } else {
    return {
      props: { ...child.props, 'data-edit': uuidv4() },
      value: child.children,
      type: child.type,
    }
  }
}

function renderAntdComponent(child) {
  console.log('renderAntdComponent', child)
  const defaults =
    child?.children?.default?.() ?? child?.children
  console.log(defaults)
  if (Array.isArray(defaults)) {
    console.log(
      'defaults',
      defaults.map(item => {
        return initChildrenByType(item)
      })
    )
    return defaults.map(item => {
      return initChildrenByType(item)
    })
  }
}

function renderComponent(child) {
  // 渲染 component
  console.log('renderComponent', child)
  const type = getComponentType(child.type)
  console.log(type)

  switch (type) {
    case ComponentType.ANT_DESIGN_VUE:
      return renderAntdComponent(child)
    case ComponentType.VUE_COMPONENT:
      return renderVueComponent(child)
  }
}

function renderVueComponent(child) {
  console.log('renderVueComponent', child)
  const renderOrSetup =
    child.type.render?.() ??
    child.type?.setup?.() ??
    child.type?.setup?.()?.()
  console.log('renderOrSetup', renderOrSetup)

  // 组件嵌套
  if (isObject(renderOrSetup)) {
    return initChildrenByType(renderOrSetup)
  } else if (Array.isArray(renderOrSetup)) {
    console.log(
      'renderOrSetup',
      renderOrSetup.map(item => {
        return initChildrenByType(item)
      })
    )
    return renderOrSetup.map(item => {
      return initChildrenByType(item)
    })
  } else {
    console.log('renderOrSetup', renderOrSetup)

    return initChildrenByType(renderOrSetup)
  }
}

// helper 函数 渲染元素(主递归)
function renderChildren(children) {
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
