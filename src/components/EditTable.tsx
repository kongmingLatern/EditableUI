export default defineComponent({
  props: {
    child: {
      type: Object,
    },
  },
  setup({ child }) {
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
              {/* {child!.type} */}
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
        </table>
      </div>
    )
  },
})
