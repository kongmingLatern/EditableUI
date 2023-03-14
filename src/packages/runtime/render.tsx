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
  return allChildren.map(child => {
    if (Array.isArray(child)) {
      return child.map(ch => {
        // 单节点的组件只有一个 value 值
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
    // return {
    //   parent: vnode,
    //   type: 'Fragment',
    //   props: { 'data-edit': uuidv4() },
    //   value: '',
    //   file: vnode.file,
    //   children: vnode.children.map(item =>
    //     initChildrenByType({
    //       ...item,
    //       file: vnode.file,
    //       parent: vnode,
    //     })
    //   ),
    // }
    // 去除最外层
    return vnode.children.map(item => {
      return {
        parent: vnode,
        type: item.type,
        value: item.children,
        props: { ...item.props, 'data-edit': uuidv4() },
        file: vnode.file,
      }
    })
  } else {
    return {
      // 纯文本
      // 本来的样式 Symbol(Text)
      // type: vnode.type,
      // 为了方便调试，对于纯文本，添加一个 text 标签
      type: 'text',
      props: { 'data-edit': uuidv4() },
      value: vnode.children,
      file: vnode.file,
      parent: vnode.parent || null,
    }
  }
  // Fragment
  // if (Array.isArray(vnode.children)) {
  //   return {
  //     parent: vnode,
  //     type: 'Fragment',
  //     props: { 'data-edit': uuidv4() },
  //     value: '',
  //     file: vnode.file,
  //     children: vnode.children.map(item =>
  //       initChildrenByType({
  //         ...item,
  //         file: vnode.file,
  //         parent: vnode,
  //       })
  //     ),
  //   }
  // } else {
  //   return {
  //     type: 'Fragment',
  //     props: { 'data-edit': uuidv4() },
  //     value: vnode.children,
  //     file: vnode.file,
  //     parent: vnode.parent || null,
  //   }
  // }
}

function getComponentType(type) {
  return Component(type)
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
      parent: child,
      value: '',
      type: child.type,
      props: { ...child.props, 'data-edit': uuidv4() },
      children: child.children.map(item =>
        initChildrenByType({
          ...item,
          file: child.file,
          parent: child,
        })
      ),
      file: child.file,
    }
  } else {
    return {
      parent: child.parent || null,
      props: { ...child.props, 'data-edit': uuidv4() },
      value: child.children,
      type: child.type,
      file: child.file,
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
  const renderOrSetup = child.type.render(
    child.ctx,
    {},
    child.props
  )
  // // child.type?.setup(child.props, {
  // //   expose: () => {},
  // // }) ?? child.type.render?.()
  // child.type?.setup?.(child?.props, {
  //   expose: () => {},
  // }) ??
  // child.type.render?.(child, child?.props) ??
  // child.type?.setup?.()?.()

  const file = child.type?.__file

  file && (renderOrSetup['file'] = file)

  console.log('renderOrSetup', renderOrSetup)
  console.log('file', file)

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
export function renderChildren(children) {
  console.log('renderChildren', children)

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
