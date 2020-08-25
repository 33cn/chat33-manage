<template>
  <div class="user_count">
    <ul class="counts_wrapper">
      <li class="counts-item">
        <h3 class="counts-item-title">累计用户</h3>
        <div class="counts-item-count">{{totalUser}}</div>
      </li>
      <li class="counts-item">
        <h3 class="counts-item-title">累计群聊</h3>
        <div class="counts-item-count">{{totalGroup}}</div>
      </li>
      <li class="counts-item">
        <h3 class="counts-item-title">封号用户</h3>
        <div class="counts-item-count">{{banUser}}</div>
      </li>
      <li class="counts-item">
        <h3 class="counts-item-title">封聊数量</h3>
        <div class="counts-item-count">{{banGroup}}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {ResUserCount} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * @name 用户统计数字
   * @author yuanzeyu
   * @date 2019-04-17
   * @desc
   */
  @Component
  export default class UserCount extends Vue {
    public totalUser: number = 0;
    public totalGroup: number = 0;
    public banUser: number = 0;
    public banGroup: number = 0;

    public async getCounts() {
      const data: ResUserCount | null = await this.$post(Apis.USER_COUNT);
      if (data) {
        this.totalUser = data.totalUser;
        this.totalGroup = data.totalRoom;
        this.banUser = data.banUser;
        this.banGroup = data.banRoom;
      }
    }

    public created() {
      this.getCounts();
    }
  }
</script>

<style scoped>
  .user_count {
    background: #fff;
  }

  .counts_wrapper {
    margin: 0 0 0 90px;
    height: 100px;
    padding: 0;
  }

  .counts-item {
    display: inline-block;
    width: 25%;
  }

  .counts-item-title {
    margin: 21px 0 0 0;
    font-size: var(--base-font-size);
    line-height: 20px;
    font-weight: 500;
    color: var(--color-light);
  }

  .counts-item-count {
    margin-top: 10px;
    font-size: 24px;
    line-height: 33px;
    font-weight: 500;
  }
</style>
