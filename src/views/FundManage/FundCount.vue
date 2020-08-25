<template>
  <div class="fund_count">
    <div class="flex_item">
      <h2 class="title">累计收取红包手续费</h2>
      <p v-for="(item,index) in getCount" class="count-item" :key="`a${index}`">
        {{Number(item.amount)}} {{item.currency}}
      </p>
    </div>
    <div class="flex_item">
      <h2 class="title">累计发放邀请奖励</h2>
      <p v-for="(item,index) in giveCount" class="count-item" :key="`b${index}`">
       {{Number(item.total)}} {{item.currency}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CountGroupItem, CountItem, ResFundsCount, ResFundsGroupCount} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * 资金管理-统计数字
   * @author yuanzeyu
   * @date 2019-06-27
   * @desc
   */
  @Component
  export default class FundCount extends Vue {
    public getCount: CountGroupItem[] = [];
    public giveCount: CountItem[] = [];
    private timer: any = 0;
    private groupTimer: any = 0;

    public created() {
      this.fetchCounts();
      this.fetchGroupCounts();
    }

    public beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.groupTimer) {
        clearTimeout(this.groupTimer);
      }
    }

    private async fetchGroupCounts() {
      const res: ResFundsGroupCount | null = await this.$post(Apis.FUNDS_GROUP_COUNT);
      if (res) {
        this.getCount = res.statistics;
      }
      this.groupTimer = setTimeout(() => {
        this.fetchGroupCounts();
      }, 10000);
    }

    private async fetchCounts() {
      const res: ResFundsCount | null = await this.$post(Apis.FUNDS_COUNT);
      if (res) {
        this.giveCount = res.statistics;
      }
      this.timer = setTimeout(() => {
        this.fetchCounts();
      }, 10000);
    }
  }
</script>

<style scoped>
  .fund_count {
    display: flex;
    overflow: auto;
    height: 100%;
    padding-left: 60px;
  }
  .flex_item {
    width: 50%;
  }
  .title {
    margin: 30px 30px 0 0;
    font-size: var(--base-font-size);
    font-weight: 500;
    color: var(--color-light);
    line-height: 20px;
  }

  .count-item {
    margin: 10px 0 0 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
  }
</style>
