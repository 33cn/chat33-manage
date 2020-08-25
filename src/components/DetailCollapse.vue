<template>
  <div>
    <div class="switch_wrapper">
      <div class="title">
        <div class="btn_export" @click="exportExcel">导出</div>
        <div v-show="show" class="btn_switch" @click="switchDetailShow">
          <span>收起明细数据</span>
          <div class="btn-icon_wrapper"><i class="iconfont iconfanhui-copy-copy-copy-copy-copy-copy btn-icon"></i></div>
        </div>
        <div v-show="!show" class="btn_switch" @click="switchDetailShow">
          <span>展开明细数据</span>
          <div class="btn-icon_wrapper"><i class="iconfont iconfanhui-copy-copy-copy-copy-copy-copy-copy btn-icon"></i>
          </div>
        </div>
      </div>
    </div>
    <template v-if="firstLoaded">
      <div v-show="show">
        <slot></slot>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import axios from 'axios';
  import {getDayEndStamp} from '@/utils/tool';
  import {Apis} from '@/config/Apis';

  /**
   * @name 展开收起明细
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component
  export default class DetailCollapse extends Vue {
    @Prop() public show!: boolean; // sync
    @Prop() public dateRange!: number[];
    @Prop() public version!: string | null;
    @Prop() public exportApi!: string;
    @Prop() public sortParam!: any;

    public firstLoaded: boolean = false; // 第一次展开时创建子元素，后面不销毁

    public switchDetailShow() {
      this.$emit('update:show', !this.show);
      if (this.show) {
        this.$emit('on-show');
      }
    }

    @Watch('show')
    public onShowChange(val: boolean) {
      if (val) {
        this.firstLoaded = true;
      }
    }

    public created() {
      if (this.show) {
        this.firstLoaded = true;
      }
    }

    public async exportExcel() {
      let param = {
        startTime: this.dateRange[0],
        endTime: getDayEndStamp(this.dateRange[1]),
      };
      if (this.version) {
        param = Object.assign(param, {
          version: this.version,
        });
      }
      if (this.sortParam) {
        param = Object.assign(param, this.sortParam);
      }
      const data = await this.$post(this.exportApi, param);
      if (data) {
        axios({
          method: 'get',
          url: Apis.DOWNLOAD_EXCEL,
          params: {
            filename: data.filename,
          },
          responseType: 'arraybuffer',
        }).then((res) => {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          window.location.href = URL.createObjectURL(blob);
        }).catch((e) => {
          this.$chatNotify.fail(`${e.response.status} ${e.response.statusText}`);
        });
      }
    }
  }
</script>

<style scoped>
  .title {
    padding: 0 20px;
    line-height: 60px;
    font-size: var(--base-font-size);
    color: var(--theme-color);
    font-weight: 500;
  }

  .btn_switch {
    display: inline-block;
    cursor: pointer;
  }

  .btn_export {
    float: right;
    cursor: pointer;
    font-size: var(--base-font-size);
  }

  .btn-icon {
    font-size: 12px;
    margin-left: 10px;
  }

  .btn-icon_wrapper {
    display: inline-block;
    transform: scale(0.8, 0.8);
  }
</style>
