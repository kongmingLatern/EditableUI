import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'
import { getAllSlotsChildrenContext } from '~/shared/helpers'

describe('getAllSlotsChildrenContext Function', () => {
  it('TextContent', () => {
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
          value: 'Click me',
        },
      ])
    )
  })
  it('nested tag', () => {
    const wrapper = mount(Button, {
      slots: {
        default: h('div', null, h('span', null, '123123')),
      },
    })
    const data = (wrapper.vm.$slots as any).default()
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          value: '',
          children: [
            {
              value: '123123',
            },
          ],
        },
      ])
    )
  })
  it('array slots with TextContent', () => {
    const wrapper = mount(Button, {
      slots: {
        default: [
          h('div', null, h('span', null, '123123')),
          'lalala',
        ],
      },
    })
    const data = (wrapper.vm.$slots as any).default()
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          value: '',
          children: [
            {
              value: '123123',
            },
          ],
        },
        {
          value: '',
          children: [
            {
              value: 'lalala',
            },
          ],
        },
      ])
    )
  })
  it('array slots with common tag', () => {
    const wrapper = mount(Button, {
      slots: {
        default: [
          h('div', null, h('span', null, '123123')),
          h('div', null, 'hahaha'),
        ],
      },
    })
    const data = (wrapper.vm.$slots as any).default()
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          value: '',
          children: [
            {
              value: '123123',
            },
          ],
        },
        {
          value: 'hahaha',
        },
      ])
    )
  })
})
