export function combineStrByProps(arr) {
  let str = ''
  arr.map(prop => {
    if (prop.key !== 'data-edit' && prop.key !== '')
      str += prop.key + ':"' + prop.value + '",'
  })
  return '{' + str.slice(0, str.length - 1) + '}'
}
export function copyText(content: string) {
  var input = document.createElement('input')
  //将input的值设置为需要复制的内容
  input.value = content
  //添加input标签
  document.body.appendChild(input)
  //选中input标签
  input.select()
  //执行复制
  document.execCommand('copy')
  //移除input标签
  document.body.removeChild(input)
}
