import fs from 'fs-extra'
export const exec = (element: EventTarget, type: any) => {
  console.log(1);
  const code = `
    import  { describe, it, expect } from 'vitest';
      describe('test in ${element}', () => {
        it('should work', () => {
          console.log('test in ${element} and type is ${type}')
          expect(1).toBe(1)
        }) 
      });
  `
  fs.outputFile('../../src/shared/generate.ts', '1', (e) => console.log(e)
  )
}
export const code = (element: EventTarget, type: string) => exec(element, type)