// 记录选择的元素
let selectedElement: Element | null = null
export function renderHighLight() {
  function initHighLight(child) {
    function getElementByDataEdit() {
      return document.querySelector(
        `[data-edit="${child.props['data-edit']}"]`
      )
    }

    const element = getElementByDataEdit()
    console.log('element', element)
    console.log('selectedElement', selectedElement)
    // 排他思想，高亮显示
    // 清除数组中的元素
    removeHighLight()
    selectedElement = element
    // 高亮显示
    addHighLight(element)
  }
  function removeHighLight() {
    selectedElement &&
      // 去除 highLight 样式
      selectedElement!.classList.remove('highLight')
  }
  function addHighLight(selectedElement) {
    selectedElement!.classList.add('highLight')
  }

  return {
    initHighLight,
    removeHighLight,
    addHighLight,
  }
}
