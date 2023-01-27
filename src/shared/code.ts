export const code = (element: HTMLElement) => `
  import  { describe, it, expect } from 'vitest';
    describe('test in ${element}', () => {
      it('should work', () => {
        expect(1).toBe(1)
      }) 
    });
`
