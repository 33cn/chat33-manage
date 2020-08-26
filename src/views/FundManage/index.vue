<template>
  <div>
    <div class="top_wrapper">
      <div class="top_left_wrapper">
        <group-set/>
      </div>
      <div class="top_left_wrapper l-margin_mid">
        <set-form/>
      </div>
      <div class="top_right_wrapper">
        <fund-count/>
      </div>
    </div>
    <div class="bottom_wrapper">
      <data-list/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SetForm from '@/views/FundManage/SetForm.vue';
  import DataList from '@/views/FundManage/DataList.vue';
  import FundCount from '@/views/FundManage/FundCount.vue';
  import GroupSet from '@/views/FundManage/GroupSet.vue';

  /**
   * 资金管理
   * @author yuanzeyu
   * @date 2019-06-27
   * @desc
   */
  @Component({
    components: {
      GroupSet,
      SetForm,
      FundCount,
      DataList,
    },
  })
  export default class index extends Vue {
  }
</script>

<style scoped>
  .top_wrapper {
    height: 420px;
    display: flex;
  }

  .top_left_wrapper {
    flex: 1;
    background: #fff;
    text-align: center;
  }

  .l-margin_mid {
    margin: 0 22px 0 18px;
  }

  .top_right_wrapper {
    width: 600px;
    background: #fff;
  }

  .bottom_wrapper {
    margin-top: 20px;
    background: #fff;
  }
</style>
