declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  export interface EventTarget {
    target: EventTarget
    nodeName: string
    type: any
  }
}
