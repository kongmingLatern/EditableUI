import { reactiveChildren } from '~/shared/helpers'
import { renderAllChildren } from '~/runtime'
import ModalEdit from './ModalEdit'

export default defineComponent({
  setup(_, { slots }) {
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
            isShow={isShow}
            allChildren={allChildren}
          />
        </>
      )
    }
  },
})
