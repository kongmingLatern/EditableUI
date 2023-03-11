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
          props: {},
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
          props: {},
          value: '',
          children: [
            {
              type: 'span',
              props: {},
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
        props: {},
        children: [
          {
            type: 'span',
            props: {},
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
          props: {},
          value: '',
          children: [
            {
              type: 'span',
              value: '123123',
              props: {},
            },
          ],
        },
        {
          type: Symbol(1),
          props: {},
          value: '',
          children: [
            {
              type: Symbol(1),
              value: 'lalala',
              props: {},
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
          props: {},
          children: [
            {
              type: 'span',
              props: {},
              value: '123123',
            },
          ],
        },
        {
          type: 'span',
          props: {},
          value: 'hahaha',
        },
      ])
    )
  })
  it('render Component', () => {
    const data = [
      {
        type: {
          setup: () => {
            return {
              children: [
                {
                  type: 'span',
                  props: {},
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
    expect(allChildren).toMatchInlineSnapshot(`
      [
        [
          {
            "children": [
              {
                "props": {},
                "type": "span",
                "value": "123123",
              },
            ],
            "props": {},
            "type": undefined,
            "value": "",
          },
        ],
      ]
    `)
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
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "__v_isVNode": true,
          "__v_skip": true,
          "anchor": null,
          "appContext": null,
          "children": "hahaha",
          "component": null,
          "ctx": null,
          "dirs": null,
          "dynamicChildren": null,
          "dynamicProps": null,
          "el": null,
          "key": null,
          "patchFlag": 0,
          "props": {},
          "ref": null,
          "scopeId": null,
          "shapeFlag": 9,
          "slotScopeIds": null,
          "ssContent": null,
          "ssFallback": null,
          "staticCount": 0,
          "suspense": null,
          "target": null,
          "targetAnchor": null,
          "transition": null,
          "type": "TEXT_OR_FRAGMENT_CONTENT",
        },
      ]
    `)
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
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "__v_isVNode": true,
          "__v_skip": true,
          "anchor": null,
          "appContext": null,
          "children": [
            {
              "__v_isVNode": true,
              "__v_skip": true,
              "anchor": null,
              "appContext": null,
              "children": "123123",
              "component": null,
              "ctx": null,
              "dirs": null,
              "dynamicChildren": null,
              "dynamicProps": null,
              "el": null,
              "key": null,
              "patchFlag": 0,
              "props": {},
              "ref": null,
              "scopeId": null,
              "shapeFlag": 9,
              "slotScopeIds": null,
              "ssContent": null,
              "ssFallback": null,
              "staticCount": 0,
              "suspense": null,
              "target": null,
              "targetAnchor": null,
              "transition": null,
              "type": "TEXT_OR_FRAGMENT_CONTENT",
            },
          ],
          "component": null,
          "ctx": null,
          "dirs": null,
          "dynamicChildren": null,
          "dynamicProps": null,
          "el": null,
          "key": null,
          "patchFlag": 0,
          "props": {},
          "ref": null,
          "scopeId": null,
          "shapeFlag": 17,
          "slotScopeIds": null,
          "ssContent": null,
          "ssFallback": null,
          "staticCount": 0,
          "suspense": null,
          "target": null,
          "targetAnchor": null,
          "transition": null,
          "type": "ELEMENT_CONTENT",
        },
      ]
    `)
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
