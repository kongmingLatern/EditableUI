import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'
describe('Button component slots', () => {
  it('test text node', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
  })
  // it("button's slots should be rendered", async () => {
  //   const wrapper = mount(Button, {
  //     slots: {
  //       default: h('div', null, h('span', null, '123123')),
  //     },
  //   })
  //   expect(wrapper.text()).toBe('123123')
  // })
})
