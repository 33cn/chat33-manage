<template>
  <div class="group_count">
    <div class="count-title">累计群聊</div>
    <div class="count">{{total}}</div>
    <div class="count-title">封群数量</div>
    <div class="count">{{ban}}</div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ResGroupCount} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * 群聊数量统计
   * @author yuanzeyu
   * @date 2019-04-18
   * @desc
   */
  @Component
  export default class GroupCount extends Vue {
    public total: number = 0;
    public ban: number = 0;

    public async getCount() {
      const data: ResGroupCount | null = await this.$post(Apis.GROUP_COUNT);
      if (data) {
        this.total = data.total;
        this.ban = data.ban;
      }
    }

    public created() {
      this.getCount();
    }
  }
</script>

<style scoped>
  .group_count {
    background: #fff;
    padding-left: 60px;
    box-sizing: border-box;
  }

  .count-title {
    padding-top: 39px;
    color: var(--color-light);
    font-weight: 500;
    line-height: 20px;
  }

  .count {
    padding: 10px 0 38px;
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
  }
</style>
