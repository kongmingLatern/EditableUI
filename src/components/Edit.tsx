import { reactiveChildren } from '~/shared/helpers'
import { renderAllChildren } from '~/packages/runtime'
import ModalEdit from './ModalEdit'

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup({ vertical }, { slots }) {
    const isShow = ref<boolean>(false)
    const input = ref<HTMLInputElement>()
    const children = slots.default?.() || []
    let allChildren = reactiveChildren(children)
    console.log('allChildren', allChildren)

    function editInputContent(event: Event) {
      console.log('edit')
      isShow.value = true
      nextTick(() => {
        input.value?.focus()
      })
    }

    return () => {
      return (
        <>
          <div onDblclick={editInputContent}>
            {renderAllChildren(allChildren)}
          </div>
          <ModalEdit
            vertical={vertical}
            isShow={isShow}
            allChildren={allChildren}
          />
        </>
      )
    }
  },
})
