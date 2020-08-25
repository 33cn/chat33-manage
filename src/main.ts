import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axiosPlugin from '@/plugins/axios-plugin';
import './plugins/element.js';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import {formatDate} from '@/utils/tool';
import Notify from '@/plugins/NotifyPop';

Vue.config.productionTip = false;


Vue.filter('format-percent', (val: any) => `${Math.round(val * 100)}%`);
Vue.filter('format-date', (val: number) => formatDate(val));
Vue.use(Notify, '$chatNotify');

Vue.use(axiosPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
