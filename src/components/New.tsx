import { defineComponent } from 'vue'
export default defineComponent({
  name: 'New',
  setup() {
    return () => {
      return (
        <div class="w-[30%]">
          <h3 class="text-center">File</h3>
          <ul>
            <li>/mnt/usr/xxxx</li>
          </ul>
        </div>
      )
    }
  },
})
