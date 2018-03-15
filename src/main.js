import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import * as firebase from 'firebase'

// Filters
import DateFilter from './filters/date'
import DistanceFilter from './filters/distance'

// Shared components
import AlertComponent from './components/Common/Alert'

import 'vuetify/dist/vuetify.min.css'
import config from './config'

Vue.use(Vuetify, { theme: {
  primary: '#673AB7',
  secondary: '#424242',
  accent: '#FF5252',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.filter('dateFormat', DateFilter)
Vue.filter('distanceFormat', DistanceFilter)

Vue.component('app-alert', AlertComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(config.firebase)
  }
})
