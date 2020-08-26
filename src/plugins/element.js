// todo 分到组件内引入？
import Vue from 'vue';
import {
  Button,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  Input,
  Popover,
  Notification,
  Loading,
} from 'element-ui';

Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;
