import { getAllSlotsChildrenContext } from '~/shared/helpers'
import { SlotsType } from '~/shared/SlotsType'

describe('getAllSlotsChildrenContext Function', () => {
  it('TextContent', () => {
    const data = [
      {
        type: Symbol(1),
        children: 'Click me',
      },
    ]
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
          value: 'Click me',
        },
      ])
    )
  })
  it('nested tag', () => {
    const data = [
      {
        type: 'div',
        children: [
          {
            type: 'span',
            children: '123123',
          },
        ],
      },
    ]
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: SlotsType.ELEMENT_CONTENT,
          value: '',
          children: [
            {
              type: SlotsType.ELEMENT_CONTENT,
              value: '123123',
            },
          ],
        },
      ])
    )
  })
  it('array slots with TextContent', () => {
    const data = [
      {
        type: 'div',
        children: [
          {
            type: 'span',
            children: '123123',
          },
        ],
      },
      {
        type: Symbol(1),
        children: [
          {
            type: Symbol(1),
            children: 'lalala',
          },
        ],
      },
    ]
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: SlotsType.ELEMENT_CONTENT,
          value: '',
          children: [
            {
              type: SlotsType.ELEMENT_CONTENT,
              value: '123123',
            },
          ],
        },
        {
          type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
          value: '',
          children: [
            {
              type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
              value: 'lalala',
            },
          ],
        },
      ])
    )
  })
  it('array slots with common tag', () => {
    const data = [
      {
        type: 'div',
        children: [
          {
            type: 'span',
            children: '123123',
          },
        ],
      },
      {
        type: 'span',
        children: 'hahaha',
      },
    ]
    const allChildren = getAllSlotsChildrenContext(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: SlotsType.ELEMENT_CONTENT,
          value: '',
          children: [
            {
              type: SlotsType.ELEMENT_CONTENT,
              value: '123123',
            },
          ],
        },
        {
          type: SlotsType.ELEMENT_CONTENT,
          value: 'hahaha',
        },
      ])
    )
  })
})
