import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'
describe('Button component', () => {
  it("button's slots should be rendered", async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
  })
})
