import Save from './Save'
import { getAllChildrenEdit } from '~/runtime'

export default defineComponent({
  props: {
    isShow: {
      type: Object,
    },
    allChildren: {
      type: Array,
    },
  },
  setup({ isShow, allChildren }) {
    function save() {
      isShow!.value = false
    }
    return () => (
      <>
        {isShow!.value && (
          <div className="flex flex-col color-white h-screen absolute top-0 right-0 overflow-y-scroll">
            {getAllChildrenEdit(allChildren)}
            <Save onSave={save} />
          </div>
        )}
      </>
    )
  },
})
