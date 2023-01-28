export const exec = (element: string, type: any) => {

  try {
    const code = {
      element,
      type,
    }

    generateCodeByNodeName(code)

  } catch (e) {
    console.log(e);
  }
}
export const code = (element: string, type: string) => exec(element, type)


function generateCodeByNodeName({ element: name, type }) {
  return `await wrapper.find('${name}').trigger('${type}')`
}
