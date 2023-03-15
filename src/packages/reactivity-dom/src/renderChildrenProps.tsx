export function renderChildrenProps(childProps) {
  function initProps(allProps) {
    allProps.push(combineAttribute(childProps))
  }

  function combineAttribute(props) {
    const propsKeys = Object.keys(props)
    const valueKeys = Object.values(props)
    const result = propsKeys.map((key, index) => {
      return {
        key,
        value: valueKeys[index],
      }
    })
    return reactive(result)
  }

  function combineArrayToAttribute(arr: Array<any>) {
    const result = {}
    arr.forEach(prop => {
      if (prop.key.startsWith('on')) {
        // 说明是函数
        console.log('函数')
        const func = new Function('return ' + prop.value)
        result[prop.key] = func()
      } else {
        result[prop.key] = prop.value
      }
    })
    console.log(result)
    return result
  }

  return {
    initProps,
    combineAttribute,
    combineArrayToAttribute,
  }
}
