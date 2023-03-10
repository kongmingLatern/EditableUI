export default defineComponent({
  props: {
    onSave: {
      type: Function,
    },
  },
  setup({ onSave }) {
    return () => (
      <>
        <button
          className="btn bg-red-500"
          onClick={() => onSave!()}
        >
          保存
        </button>
      </>
    )
  },
})
