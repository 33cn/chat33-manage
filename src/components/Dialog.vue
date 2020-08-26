<template>
  <div class="dialog_mask" v-if="show" @click="closeDialog">
    <div class="dialog-main" @click.stop>
      <h2 class="dialog-main-title">{{title}}</h2>
      <div class="dialog-main-close_wrapper" @click="closeDialog">
        <i class="iconfont iconcha1-copy"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * @name 弹窗
   * @author yuanzeyu
   * @date 2019-04-17
   * @desc
   */
  @Component
  export default class MyDialog extends Vue {
    @Prop({required: true, type: Boolean}) public show!: boolean; // sync
    @Prop({required: true, type: String}) public title!: string;

    public closeDialog() {
      this.$emit('update:show', false);
    }
  }
</script>

<style scoped>
  .dialog_mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(66, 78, 92, 0.8);
    z-index: 1; /* 覆盖el表格的边框 */
  }

  .dialog-main {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .dialog-main-title {
    line-height: 50px;
    text-align: center;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  .dialog-main-close_wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 54px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
  }
</style>
