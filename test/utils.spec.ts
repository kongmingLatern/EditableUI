import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'
import { getAllSlotsChildrenContext } from '~/shared/helpers'

describe('utils', () => {
  it('getAllSlotsChildren', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    const data = (wrapper.vm.$slots as any).default()
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          children: 'Click me',
        },
      ])
    )
  })
})
