<p align='center'>
  <img src='https://user-images.githubusercontent.com/11247099/111864893-a457fd00-899e-11eb-9f05-f4b88987541d.png' alt='Vitesse - Opinionated Vite Starter Template' width='600'/>
</p>

<h6 align='center'>
<a href="https://vitesse-lite.netlify.app/">Live Demo</a>
</h6>

<h5 align='center'>
<b>A tool can help you debug css  when starting server</b>
</h5>

<br>

<p align='center'>
<b>English</b> | <a href="https://github.com/antfu/vitesse-lite/blob/main/README.zh-CN.md">简体中文</a>
<!-- Contributors: Thanks for geting interested, however we DON'T accept new transitions to the README, thanks. -->
</p>

## Preview

![Preview](https://github.com/kongmingLatern/EditableUI/blob/main/src/assets/help.gif)

## Usage

### Install

```bash
  npm install editable-ui -D
```

### App.use

```js
import Edit from 'editable-ui/EditableUi.esm'
import 'editable-ui/style.css' // This UI will be depended on 'unocss', Later I will change it

createApp(App).use(Edit).mount('#app')
```

### Use

```vue
<Edit>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      />
    </a>
    <div>123132</div>
    1123123
  </Edit>
```

> And then you can edit the element value and attribute by double click！

## Features

- ⚡️ Reactivity UI with Vue 3【基于 Vue3 的响应式组件】

- 🗂 Support update Element Value and Attribute【支持更新元素的值和属性】

- 🗂 Support Vue3 Setup And TSX【支持 Vue3 Setup 格式的 vue 组件以及 tsx 组件】

- 📦 Support Host Component【支持原生标签】

- 🎨 Support Nested Component【支持嵌套标签】

- 😃 Support Vue3 Component【支持普通 Vue3 组件】

- 🔥 Support Vue3 TSX Component【支持普通 Vue3 TSX Setup 语法的组件】

- ✅ Support HighLight when edit【当进行编辑的时候可以高亮显示】

- ✅ Support Antd render 【支持 Antd 组件库的渲染】

<br>

See [](https://github.com/antfu/vitesse) for full featureset.

## Furture

- ⚡️ Inject CSS Style【提前注入样式】

- ⚡️ All aspects of support various component library【全方面支持各种组件库】

## How realize

### Thought

The page are all elements in the value through `Proxy`, and rebuild the rendering process

【获取到标签内的所有元素，并将这些元素值均通过 Proxy 代理起来，并重新构建渲染流程】

### Difficulty

- How to get the value of the element【如何获取元素的值】

- ✅ How to get the vnode of the element【如何获取元素的 vnode】

- ✅ How to proxy all the elements【如何代理所有的元素】

- ✅ How to rebuild the rendering process【如何重新构建渲染流程】

- ✅ How to support vue component library【如何支持 vue 组件】

- ✅ How to support vue tsx component library【如何支持 vue tsx 组件】

- ❌ How to support various component library【如何支持各种组件库】
