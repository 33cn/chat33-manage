<template>
  <div class="common_tip">
    <el-popover
      placement="right-start"
      width="420"
      trigger="click">
      <div class="content_wrapper">
        <h2 class="content-title">{{tipInfo.title}}</h2>
        <p v-for="(item, index) in tipInfo.tips" class="content-item" :key="index">
          <span class="content-item-title">{{item.title}}</span>
          <span>：{{item.tip}}</span>
        </p>
        <p v-if="tipInfo.bottom" class="content-item">{{tipInfo.bottom}}</p>
      </div>
      <i slot="reference" class="iconfont iconwenhao tip-icon"></i>
    </el-popover>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * @name 问好图标和介绍弹窗
   * @author yuanzeyu
   * @date 2019-04-18
   * @desc
   */
  @Component
  export default class CommonTip extends Vue {
    @Prop() public tipInfo!: any;
  }
</script>

<style scoped>
  .common_tip {
    display: inline-block;
    width: 14px;
    vertical-align: top;
  }

  .tip-icon {
    font-size: 14px;
    color: var(--color-light);
    cursor: pointer;
  }

  .content_wrapper {
    padding: 20px;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    color: var(--color-light);
  }

  .content-title {
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    margin: 0;
  }

  .content-item {
    margin: 17px 0 0 0;
  }

  .content-item-title {
    color: var(--theme-color);
  }
</style>

<style>
  .el-popper {
    padding: 0;
  }
</style>
