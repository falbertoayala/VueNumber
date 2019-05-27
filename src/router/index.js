import Vue from 'vue'
import Router from 'vue-router'
import Number from '@/components/Number'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Number',
      component: Number
    }
  ]
})
