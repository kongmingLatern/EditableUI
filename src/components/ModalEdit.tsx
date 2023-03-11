import EditTable from './EditTable'
import Save from './Save'

export default defineComponent({
  props: {
    isShow: {
      type: Object,
    },
    allChildren: {
      type: Array,
    },
  },
  setup({ isShow, allChildren }, { slots }) {
    function save() {
      isShow!.value = false
    }
    function getAllChildrenEdit(children) {
      console.log('children', children)

      return children.map((child, index) => {
        if (Array.isArray(child)) {
          return child.map(ch =>
            ch.value !== '' ? (
              <EditTable
                child={ch}
                index={index}
                onSave={save}
              />
            ) : (
              getAllChildrenEdit(ch.children)
            )
          )
        } else if (child.value === '' && child.children) {
          return getAllChildrenEdit(child.children)
        } else {
          return (
            <EditTable
              child={child}
              index={index}
              onSave={save}
            />
          )
        }
      })
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
