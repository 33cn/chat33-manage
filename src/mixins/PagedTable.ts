/**
 * @name 分页表格数据通用
 * @author yuanzeyu
 * @date 2019-04-19
 */

import {Component, Vue} from 'vue-property-decorator';
import axios from 'axios';
import {getDayEndStamp} from '@/utils/tool';

@Component
export default class PagedTable extends Vue { // todo 取消使用mixin
  public total: number = 0;
  public loading: boolean = false;
  public page: number = 1;
  public cancelSource: any = null;

  public async doLoadList() { // 外部掉用此方法加载列表
    if (this.cancelSource) {
      this.cancelSource.cancel();
    }
    this.loading = true;
    const that = this as any;
    const loadOptions = that.loadOptions;
    let param: any = {
      page: this.page,
      count: loadOptions.count || 16,
    };
    if (typeof that.select === 'number') {
      param.types = that.select === -1 ? [] : [that.select];
    }
    if (typeof that.query === 'string') {
      param.query = that.query;
    }
    if (that.dateRange) {
      param.startTime = that.dateRange[0];
      param.endTime = getDayEndStamp(that.dateRange[1]);
    }
    if (loadOptions.otherParam) {
      param = Object.assign({}, param, loadOptions.otherParam());
    }
    this.cancelSource = axios.CancelToken.source();
    const data = await that.$post(loadOptions.loadApi, param, {}, {
      cancelToken: this.cancelSource.token,
    });
    if (data) {
      if (loadOptions.customSetList) {
        loadOptions.customSetList(data.list);
      } else {
        that.list = data.list;
      }
      this.total = data.total;
      this.cancelSource = null;
    }
    this.loading = false;
  }

  public reloadList() {
    this.total = 0;
    this.page = 1;
    this.doLoadList();
  }

  public handleSelect() {
    (this as any).query = '';
    this.reloadList();
  }

  public handleSearch() {
    if (typeof (this as any).select !== 'undefined') {
      (this as any).select = -1;
    }
    this.reloadList();
  }

}
