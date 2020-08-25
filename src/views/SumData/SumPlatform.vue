<template>
  <div class="sum_platform">
    <h2 class="title">平台列表</h2>
    <el-table
      :data="list"
      class="g-table">
      <el-table-column
        label="平台">
        <template v-slot="{row}">
          <span class="g-table-btn">{{row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="todayNew"
        label="今日新增用户">
      </el-table-column>
      <el-table-column
        prop="yesterdayNew"
        label="昨日新增用户">
      </el-table-column>
      <el-table-column
        prop="todayActive"
        label="今日活跃用户">
      </el-table-column>
      <el-table-column
        prop="yesterdayActive"
        label="昨日活跃用户">
      </el-table-column>
      <el-table-column
        prop="todayOpen"
        label="今日启动次数">
      </el-table-column>
      <el-table-column
        prop="yesterdayOpen"
        label="昨日启动次数">
      </el-table-column>
      <el-table-column
        prop="todayTotal"
        label="累计用户">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {PlatformItem, ResPlatformData} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * @name 汇总数据页的平台列表
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component
  export default class SumPlatform extends Vue {
    public list: PlatformItem[] = [];

    public async getList() {
      const data: ResPlatformData | null = await this.$post(Apis.SUM_PLATFORM_DATA);
      if (data) {
        this.list = data.list;
      }
    }

    public created() {
      this.getList();
    }
  }
</script>

<style scoped>
  .sum_platform {
    padding-bottom: 20px;
    background: #fff;
  }

  .title {
    line-height: 60px;
    padding-left: 20px;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
</style>
