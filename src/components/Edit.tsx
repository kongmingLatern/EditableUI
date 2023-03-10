import {
  getAllSlotsChildrenContext,
  renderChildren,
} from '~/shared/helpers'
import ModalEdit from './ModalEdit'

export default defineComponent({
  setup(_, { slots }) {
    const isShow = ref<boolean>(false)
    const input = ref<HTMLInputElement>()
    const children = slots.default?.() || []
    // console.log(children[0].ctx.setupState.Button1.setup)
    // children[0].ctx.setupState.Button1.setup()()
    let allChildren = getAllSlotsChildrenContext(children)
    console.log(allChildren)

    function editInputContent(event: Event) {
      isShow.value = true
      nextTick(() => {
        input.value?.focus()
      })
    }

    return () => (
      <>
        <div onDblclick={editInputContent}>
          {allChildren.map(
            (child: { value: string; children: any }) => {
              if (child.value === '' && child.children) {
                return renderChildren(child.children)
              } else if (child.value !== '') {
                return child.value
              }
            }
          )}
        </div>
        <ModalEdit
          isShow={isShow}
          allChildren={allChildren}
        />
      </>
    )
  },
})
