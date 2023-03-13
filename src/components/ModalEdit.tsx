import Save from './Save'
import { getAllChildrenEdit } from '~/packages/runtime'

export default defineComponent({
  props: {
    isShow: {
      type: Object,
    },
    allChildren: {
      type: Array,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup({ isShow, allChildren, vertical }) {
    const style = ref(getStyleByVertical(vertical))
    function save() {
      isShow!.value = false
    }
    return () => (
      <>
        {isShow!.value && (
          <div
            className={
              'flex flex-col color-white overflow-y-scroll ' +
              style.value
            }
          >
            <button
              className="btn"
              onClick={() => {
                style.value = getStyleByVertical(!vertical)
                vertical = !vertical
              }}
            >
              转换视图
            </button>
            {getAllChildrenEdit(allChildren)}
            <Save onSave={save} />
          </div>
        )}
      </>
    )
  },
})
function getStyleByVertical(vertical: boolean): string {
  console.log('vertical', vertical)
  return vertical
    ? `
      h-screen absolute top-0 right-0
    `
    : `
     w-[100%] h-[440px] absolute bottom-0 left-0
    `
}
