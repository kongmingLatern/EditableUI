export * from './helpers'

export function isSimpleComponent(value) {
  return value !== ''
}

export function isNested(child: any) {
  return child.value === '' && child.children
}
