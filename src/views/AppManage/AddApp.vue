<template>
  <div class="add_app">
    <img src="../../assets/img/icon_add.png" class="icon_add" alt="添加">
    <div class="text">添加广告</div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * 添加广告按钮
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component
  export default class AddApp extends Vue {
  }
</script>

<style scoped>
  .add_app {
    display: inline-block;
    width: 148px;
    height: 323px;
    border: 1px dashed var(--color-light);
    text-align: center;
    cursor: pointer;
  }

  .icon_add {
    display: inline-block;
    margin-top: 122px;
    font-size: 30px;
    color: #B2BCC6;
  }

  .text {
    margin-top: 20px;
    color: var(--color-light);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
</style>
