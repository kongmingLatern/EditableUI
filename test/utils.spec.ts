import {
  reactiveChildren,
  renderChildren,
} from '~/shared/helpers'
import { SlotsType } from '~/shared/SlotsType'

describe('reactiveChildren Function', () => {
  it('TextContent', () => {
    const data = [
      {
        type: Symbol(1),
        children: 'Click me',
      },
    ]
    const allChildren = reactiveChildren(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: Symbol(1),
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
    const allChildren = reactiveChildren(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: 'div',
          value: '',
          children: [
            {
              type: 'span',
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
    const allChildren = reactiveChildren(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: 'div',
          value: '',
          children: [
            {
              type: 'span',
              value: '123123',
            },
          ],
        },
        {
          type: Symbol(1),
          value: '',
          children: [
            {
              type: Symbol(1),
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
    const allChildren = reactiveChildren(data)
    expect(allChildren).toEqual(
      reactive([
        {
          type: 'div',
          value: '',
          children: [
            {
              type: 'span',
              value: '123123',
            },
          ],
        },
        {
          type: 'span',
          value: 'hahaha',
        },
      ])
    )
  })
  it.skip('render Component', () => {
    const data = [
      {
        type: {
          setup: () => {
            return {
              children: [
                {
                  type: 'span',
                  children: '123123',
                },
              ],
            }
          },
        },
        children: null,
      },
    ]

    const allChildren = reactiveChildren(data)
    expect(allChildren).toEqual([
      reactive([
        {
          type: SlotsType.COMPONENT_CONTENT,
          value: '123123',
        },
      ]),
    ])
  })
})

describe('renderChildren Function', () => {
  it('renderCommon', () => {
    const data = [
      {
        type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
        value: 'hahaha',
      },
    ]
    const result = renderChildren(data)
    expect(result).toEqual(['hahaha'])
  })
  it('nestedChildren', () => {
    const data = [
      {
        type: SlotsType.ELEMENT_CONTENT,
        value: '',
        children: [
          {
            type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
            value: '123123',
          },
        ],
      },
    ]
    const result = renderChildren(data)
    expect(result).toEqual([['123123']])
  })
  // it('nestedChildrenAndCommon', () => {
  //   const data = [
  //     {
  //       type: SlotsType.ELEMENT_CONTENT,
  //       value: '',
  //       children: [
  //         {
  //           type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
  //           value: '123123',
  //         },
  //       ],
  //     },
  //     {
  //       type: SlotsType.TEXT_OR_FRAGMENT_CONTENT,
  //       value: 'hahaha',
  //     },
  //   ]
  //   const result = renderChildren(data)
  //   expect(result).toEqual([['123123'], 'hahaha'])
  // })
})
