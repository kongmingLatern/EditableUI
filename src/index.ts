import { App } from 'vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import Edit from './components/Edit'

export { Edit }

export default {
  install(app: App) {
    app.component('Edit', Edit)
  },
}
