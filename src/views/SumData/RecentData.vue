<template>
  <div class="recent-data">
    <div class="line">
      <div class="title title_today">今日</div>
      <div class="info">
        <h3 class="info-title">新增用户</h3>
        <div class="info-value">{{today.new}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">活跃用户</h3>
        <div class="info-value">{{today.active}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">启动次数</h3>
        <div class="info-value">{{today.open}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">累计用户</h3>
        <div class="info-value">{{today.total}}</div>
      </div>
    </div>
    <div class="line">
      <div class="title">昨日</div>
      <div class="info">
        <h3 class="info-title">新增用户</h3>
        <div class="info-value">{{yesterday.new}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">活跃用户</h3>
        <div class="info-value">{{yesterday.active}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">启动次数</h3>
        <div class="info-value">{{yesterday.open}}</div>
      </div>
      <div class="info">
        <h3 class="info-title">累计用户</h3>
        <div class="info-value">{{yesterday.total}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {ResLatestCount, SumCounts} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * @name 近期数据
   * @author yuanzeyu
   * @date 2019-04-15
   * @desc 汇总数据页顶部今天/昨天数据
   */
  @Component
  export default class RecentData extends Vue {
    public today: SumCounts = {
      new: 0,
      active: 0,
      open: 0,
      total: 0,
    };

    public yesterday: SumCounts = {
      new: 0,
      active: 0,
      open: 0,
      total: 0,
    };

    public async getCounts() {
      const data: ResLatestCount | null = await this.$post(Apis.LATEST_COUNT);
      if (data) {
        this.today = data.today;
        this.yesterday = data.yesterday;
      }
    }

    public created() {
      this.getCounts();
    }

  }
</script>

<style scoped>
  .recent-data {
    background: #fff;
  }

  .line {
    display: flex;
  }

  .title {
    margin-right: 60px;
    line-height: 100px;
    color: var(--theme-color);
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    width: 150px;
    white-space: nowrap;
  }

  .title_today {
    color: #fff;
    background: var(--theme-color);
  }

  .info {
    display: inline-block;
    width: 25%;
    min-width: 59px; /* 宽度过小时整体换行显示 */
    height: 100px;
    flex: 1;
  }

  .info-title {
    color: var(--color-light);
    font-size: var(--base-font-size);
    line-height: 20px;
    margin: 21px 0 0 0;
    font-weight: 500;
  }

  .info-value {
    margin-top: 9px;
    line-height: 33px;
    font-weight: 500;
    font-size: 24px;
  }

</style>
