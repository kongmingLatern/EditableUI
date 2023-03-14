export * from './helpers'

export * from './SlotsType'

export * from './ComponentType'

export function isSimpleComponent(value) {
  return value !== ''
}

export function isNested(child: any) {
  return child.value === '' && child.children
}

export function isObject(value) {
  return (
    value != null &&
    (typeof value == 'object' ||
      typeof value == 'function') &&
    Array.isArray(value) === false
  )
}
