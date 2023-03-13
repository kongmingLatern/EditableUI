import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Edit from 'editable-ui/EditableUi.esm'
import 'editable-ui/style.css'

createApp(App).use(Edit).mount('#app')
