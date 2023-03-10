import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import Antd from 'ant-design-vue'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// const editDirective = {
//   mounted(el, binding, vnode, prevNode) {
//     console.log(el, binding, vnode, prevNode)
//     el.addEventListener('click', () => {
//       console.log(el)
//       el.contentEditable = true
//       el.focus()
//     })
//   },
// }
// app.directive('edit', editDirective)

app.use(router)
// app.use(Antd)
app.mount('#app')
