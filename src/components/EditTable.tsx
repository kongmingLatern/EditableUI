// 记录所有元素的 props
let allProps: any = []
// 记录选择的元素
let selectedElement: Element | null = null

function initProps(childProps) {
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

function removeHighLight() {
  selectedElement &&
    // 去除 highLight 样式
    selectedElement!.classList.remove('highLight')
}
function highLightForContent(child) {
  function getElementByDataEdit() {
    return document.querySelector(
      `[data-edit="${child.props['data-edit']}"]`
    )
  }

  const element = getElementByDataEdit()
  // 排他思想，高亮显示
  // 清除数组中的元素
  removeHighLight()
  // 存入数组
  selectedElement = element
  // 高亮显示
  addHighLight(element)
}

function addHighLight(element: Element | null) {
  element!.classList.add('highLight')
}

function combineArrayToAttribute(arr: Array<any>) {
  const result = {}
  arr.forEach(prop => {
    result[prop.key] = prop.value
  })
  console.log(result)
  return result
}

export default defineComponent({
  props: {
    child: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  setup({ child, index }) {
    const input = ref<HTMLInputElement>()
    initProps(child!.props)
    console.log('render', allProps)
    const Input = (prop, type, value) => {
      const inputEvent = (event, type) => {
        const newValue = (event.target as HTMLInputElement)
          .value

        if (type === 'key') {
          prop.key = newValue
          delete prop[value]
        } else if (type === 'value') {
          prop['value'] = newValue
        }
        setupProps(index)
      }
      return (
        <input
          className="color-black z-10 bg-pink-100"
          ref={input}
          type="textarea"
          value={value === '' ? '' : value}
          onInput={event => inputEvent(event, type)}
        />
      )
    }
    function setupProps(index) {
      console.log('index', index)
      child!.props = {}
      Object.assign(
        child!.props,
        combineArrayToAttribute(allProps[index])
      )
    }

    function showAttribute(index) {
      console.log('showAttribute', allProps)
      console.log('index', index)

      return allProps[index].map(prop => {
        return prop.key !== 'data-edit' ? (
          <tr>
            <td>{Input(prop, 'key', prop.key)}</td>
            <td>{Input(prop, 'value', prop.value)}</td>
          </tr>
        ) : null
      })
    }

    function addAttribute(index) {
      console.log('index', index)
      console.log('allProps', allProps)
      allProps[index].push({
        key: '',
        value: '',
      })
    }

    return () => (
      <div className="bg-[#888] border">
        <table className="border">
          <tr className="border-b-2">
            <th>Key</th>
            <th>Value</th>
          </tr>
          <tr className="border-b-2">
            <td>TextArea's value</td>
            <td onClick={() => highLightForContent(child)}>
              <textarea
                className="color-black z-10 bg-pink-100"
                ref={input}
                type="textarea"
                value={child!.value}
                onInput={event => {
                  child!.value = (
                    event.target as HTMLInputElement
                  ).value
                }}
              />
            </td>
          </tr>
          <tr className="border-b-2">
            <td>TextArea's type</td>
            <td onClick={() => highLightForContent(child)}>
              <input
                className="color-black z-10 bg-pink-100"
                ref={input}
                type="textarea"
                value={
                  typeof child!.type === 'symbol'
                    ? 'text'
                    : child!.type
                }
                onInput={event => {
                  child!.type = (
                    event.target as HTMLInputElement
                  ).value
                }}
              />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="text-center">
              <div>TextArea's Attribute</div>
              <button
                className="btn bg-white color-black"
                onClick={() => {
                  addAttribute(index)
                }}
              >
                +
              </button>
              <button
                className="btn bg-white color-black"
                onClick={() => {
                  removeHighLight()
                }}
              >
                No HighLight
              </button>
            </td>
            <td>{showAttribute(index)}</td>
          </tr>
        </table>
      </div>
    )
  },
})
