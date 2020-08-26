<template>
  <div>
    <recent-data/>
    <data-chart class="l-margin"/>
    <sum-platform class="l-margin"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import RecentData from './RecentData.vue';
  import DataChart from './DataChart.vue';
  import SumPlatform from './SumPlatform.vue';

  /**
   * @name 汇总数据页
   * @author yuanzeyu
   * @date 2019-04-15
   * @desc
   */
  @Component({
    components: {
      RecentData,
      DataChart,
      SumPlatform,
    },
  })
  export default class SumData extends Vue {
  }
</script>

<style scoped>
  .l-margin {
    margin-top: 20px;
  }
</style>
