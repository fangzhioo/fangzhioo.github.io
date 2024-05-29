import { Theme } from 'vitepress'

import Layout from './Layout.vue'
// global components
import VPBadge from './components/VPBadge.vue'

import './styles/index.css'

const theme: Theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component('Badge', VPBadge)
  }
}

export default theme
