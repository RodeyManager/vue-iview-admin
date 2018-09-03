import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import iView from 'iview';
import App from '@/App';
import router from '@/router';
import store from '@/store';

import '@/assets/css/iview_vars.less';
import '@/assets/css/app.scss';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(iView, {
  transfer: true,
  size: 'small',
});

// 挂载
// Vue.prototype.isMobile = navigator.userAgent.match(/mobile/i);
// import Service from '@/service';
// Vue.prototype.Service = Service;

// 定义全局filter
// Vue.filter('formatMoney', formatMoney);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
  render: h => h(App),
});
