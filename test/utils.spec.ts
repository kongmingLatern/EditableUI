import { renderChildren } from '~/packages/runtime'
import { reactiveChildren } from '~/shared'
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
    expect(allChildren).toMatchInlineSnapshot(`
      [
        {
          "file": undefined,
          "parent": {
            "children": "Click me",
            "type": Symbol(1),
          },
          "props": {
            "data-edit": "977c86b3-ab29-45cb-8e2d-49b2702d3aa0",
          },
          "type": "text",
          "value": "Click me",
        },
      ]
    `)
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
    expect(allChildren).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "file": undefined,
              "parent": {
                "children": "123123",
                "file": undefined,
                "type": "span",
              },
              "props": {
                "data-edit": "76ccc4b4-3dbc-4777-b832-5f9102e2982b",
              },
              "type": "span",
              "value": "123123",
            },
          ],
          "file": undefined,
          "parent": {
            "children": [
              {
                "children": "123123",
                "type": "span",
              },
            ],
            "type": "div",
          },
          "props": {
            "data-edit": "bb968692-4f62-47b5-ac15-47387fe9c144",
          },
          "type": "div",
          "value": "",
        },
      ]
    `)
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
    expect(allChildren).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "file": undefined,
              "parent": {
                "children": "123123",
                "file": undefined,
                "props": {},
                "type": "span",
              },
              "props": {
                "data-edit": "177c9ba3-1df6-4f1e-9085-eb6fb3a40bcd",
              },
              "type": "span",
              "value": "123123",
            },
          ],
          "file": undefined,
          "parent": {
            "children": [
              {
                "children": "123123",
                "props": {},
                "type": "span",
              },
            ],
            "props": {},
            "type": "div",
          },
          "props": {
            "data-edit": "dd66b5d4-9884-4f02-94b0-565517a54696",
          },
          "type": "div",
          "value": "",
        },
        {
          "children": [
            {
              "file": undefined,
              "parent": {
                "children": "lalala",
                "file": undefined,
                "type": Symbol(1),
              },
              "props": {
                "data-edit": "d6f22293-d6ed-444c-9125-061f244613e3",
              },
              "type": "text",
              "value": "lalala",
            },
          ],
          "file": undefined,
          "parent": {
            "children": [
              {
                "children": "lalala",
                "type": Symbol(1),
              },
            ],
            "type": Symbol(1),
          },
          "props": {
            "data-edit": "938ed862-4fcb-4104-8287-b01921b03167",
          },
          "type": "text",
          "value": "",
        },
      ]
    `)
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
    expect(allChildren).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "file": undefined,
              "parent": {
                "children": "123123",
                "file": undefined,
                "type": "span",
              },
              "props": {
                "data-edit": "dbdccdc3-cb75-4d47-982e-35c894573036",
              },
              "type": "span",
              "value": "123123",
            },
          ],
          "file": undefined,
          "parent": {
            "children": [
              {
                "children": "123123",
                "type": "span",
              },
            ],
            "type": "div",
          },
          "props": {
            "data-edit": "0e772246-d779-43cb-ba8d-7a068e9742f7",
          },
          "type": "div",
          "value": "",
        },
        {
          "file": undefined,
          "parent": {
            "children": "hahaha",
            "type": "span",
          },
          "props": {
            "data-edit": "7e534c88-9555-4abc-a5d3-4d8ada243d47",
          },
          "type": "span",
          "value": "hahaha",
        },
      ]
    `)
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
        {
          "children": [
            {
              "file": undefined,
              "parent": {
                "children": "123123",
                "file": undefined,
                "props": {},
                "type": "span",
              },
              "props": {
                "data-edit": "96c219fe-fb38-45b4-871e-f55ab03a5eae",
              },
              "type": "span",
              "value": "123123",
            },
          ],
          "file": undefined,
          "parent": {
            "children": [
              {
                "children": "123123",
                "props": {},
                "type": "span",
              },
            ],
          },
          "props": {
            "data-edit": "fe32cda6-c72b-4beb-95fb-4292e9a6ff77",
          },
          "type": "text",
          "value": "",
        },
      ]
    `)
  })
})

describe('renderChildren Function', () => {
  it('renderCommon', () => {
    const data = [
      {
        type: SlotsType.TEXT_OR_FRAGMENT,
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
          "type": "TEXT_OR_FRAGMENT",
        },
      ]
    `)
  })
  it('nestedChildren', () => {
    const data = [
      {
        type: SlotsType.ELEMENT,
        value: '',
        children: [
          {
            type: SlotsType.TEXT_OR_FRAGMENT,
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
              "type": "TEXT_OR_FRAGMENT",
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
          "type": "ELEMENT",
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
