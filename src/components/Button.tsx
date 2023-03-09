import { getAllSlotsChildrenContext } from '~/shared/helpers'

export default defineComponent({
  setup(props, { slots }) {
    const isShow = ref<boolean>(false)
    const value = ref((props as any).value)
    const input = ref<HTMLInputElement>()
    const children = slots.default?.() || []
    console.log(children)
    let allChildren = getAllSlotsChildrenContext(children)

    function editInputContent(event: Event) {
      isShow.value = true
      nextTick(() => {
        input.value?.focus()
      })
    }

    function renderChildren(children) {
      return children.map(child => {
        if (child.value === '' && child.children) {
          return renderChildren(child.children)
        } else {
          return child.value
        }
      })
    }

    return () => (
      <>
        <button
          onDblclick={editInputContent}
          className="btn"
        >
          {allChildren.map(child => {
            if (child.value === '' && child.children) {
              return renderChildren(child.children)
            } else {
              return child.value
            }
          })}
        </button>

        {isShow.value && (
          <input
            ref={input}
            type="text"
            value={value.value}
            onInput={event => {
              value.value = (
                event.target as HTMLInputElement
              ).value
            }}
          />
        )}
      </>
    )
  },
})
