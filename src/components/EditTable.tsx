import {
  renderChildrenProps,
  renderHighLight,
} from '~/packages/reactivity-dom'

import {
  copyText as copyToBoard,
  combineStrByProps,
} from '~/packages/shared'
// 记录所有元素的 props
let allProps: any = []

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
    const { initProps, combineArrayToAttribute } =
      renderChildrenProps(child!.props)

    const { initHighLight, removeHighLight } =
      renderHighLight()

    initProps(allProps)
    console.log('render', allProps)

    const renderContent = type => {
      return (
        <td onClick={() => initHighLight(child)}>
          <textarea
            className="color-black z-10 bg-pink-100"
            ref={input}
            type="textarea"
            value={
              typeof child![type] === 'symbol'
                ? 'text'
                : child![type]
            }
            onInput={event => {
              child![type] = (
                event.target as HTMLInputElement
              ).value
            }}
          />
        </td>
      )
    }

    const renderFileName = () => {
      console.log('renderFileName', child)

      return (
        <td onClick={() => initHighLight(child)}>
          <span className="bg-red-500 z-10 font-bold color-white">
            {child!.file}
          </span>
        </td>
      )
    }

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
          value={value}
          onInput={event => inputEvent(event, type)}
        />
      )
    }

    function setupProps(index) {
      console.log('index', index, allProps[index])
      child!.props = {}

      Object.assign(
        child!.props,
        combineArrayToAttribute(allProps[index])
      )
    }

    function showAttribute(index) {
      return allProps[index].map(prop => {
        return prop.key !== 'data-edit' ? (
          <tr>
            <td>{Input(prop, 'key', prop.key)}</td>
            <td>{Input(prop, 'value', prop.value)}</td>
          </tr>
        ) : null
      })
    }

    function copyText(index) {
      // 根据 props 拼接字符串
      let content = combineStrByProps(allProps[index])
      // 复制到剪切板
      copyToBoard(content)
    }
    function addAttribute(index) {
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
            <td>File</td>
            {renderFileName()}
          </tr>
          <tr className="border-b-2">
            <td>TextArea's value</td>
            {renderContent('value')}
          </tr>
          <tr className="border-b-2">
            <td>TextArea's type</td>
            {renderContent('type')}
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
                Add Attribute
              </button>
              <button
                className="btn bg-white color-black"
                onClick={() => {
                  removeHighLight()
                }}
              >
                No HighLight
              </button>
              <button
                className="btn bg-white color-black"
                onClick={() => {
                  copyText(index)
                }}
              >
                copy
              </button>
            </td>
            <td>{showAttribute(index)}</td>
          </tr>
        </table>
      </div>
    )
  },
})
