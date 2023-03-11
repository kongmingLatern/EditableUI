export default defineComponent({
  props: {
    child: {
      type: Object,
    },
  },
  setup({ child }) {
    console.log('child', child)
    const input = ref<HTMLInputElement>()
    return () => (
      <div className="bg-[#888] border">
        <table className="border">
          <tr className="border-b-2">
            <th>Key</th>
            <th>Value</th>
          </tr>
          <tr className="border-b-2">
            <td>TextArea's value</td>
            <td>
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
            <td>
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
            <td>TextArea's Attribute</td>
            <td>
              {child!.props ? (
                <div className="flex">
                  <table>
                    <tr>
                      <th>key</th>
                      <th>value</th>
                    </tr>
                    <tr>
                      <td>
                        {Object.keys(child!.props).map(
                          key => (
                            <input
                              className="color-black z-10 bg-pink-100"
                              ref={input}
                              type="textarea"
                              value={
                                key === null ? 'null' : key
                              }
                              onInput={event => {
                                const newKey = (
                                  event.target as HTMLInputElement
                                ).value
                                child!.props[newKey] =
                                  child!.props[key]
                                delete child!.props[key]
                              }}
                            />
                          )
                        )}
                      </td>
                      <td>
                        {Object.values(child!.props).map(
                          value => (
                            <input
                              className="color-black z-10 bg-pink-100"
                              ref={input}
                              type="textarea"
                              value={
                                value === null
                                  ? 'null'
                                  : value
                              }
                              onInput={event => {
                                const newValue = (
                                  event.target as HTMLInputElement
                                ).value
                                child!.props[
                                  Object.keys(child!.props)[
                                    Object.values(
                                      child!.props
                                    ).indexOf(value)
                                  ]
                                ] = newValue
                              }}
                            />
                          )
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              ) : (
                <span color-white font-bold>
                  NULL
                </span>
              )}
            </td>
          </tr>
        </table>
      </div>
    )
  },
})
