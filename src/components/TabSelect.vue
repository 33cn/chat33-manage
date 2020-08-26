<template>
  <div class="tab_select">
    <div v-for="item in options"
        class="select-item"
        :class="{'tab-item_active': item.value===value}"
        :key="item.value"
        @click="emitSelect(item.value)">
      {{item.label}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  interface Option {
    label: string;
    value: any;
  }

  /**
   * @name 封号选时间使用的选项组件
   * @author yuanzeyu
   * @date 2019-04-17
   */
  @Component
  export default class TabSelect extends Vue {
    @Prop({required: true}) value!: string;
    @Prop({required: true}) options!: Option[]; // 优先

    public get width() {
      const len = this.options.length;
      return len * 100 - len + 1;
    }

    public emitSelect(val: any): void {
      this.$emit('input', val);
      this.$emit('select', val);
    }
  }
</script>

<style scoped>
  .tab_select {
    display: flex;
    background: var(--background);
    height: 50px;
    line-height: 48px;
    text-align: center;
  }

  .select-item {
    flex: 1;
    color: var(--color-light);
    box-sizing: border-box;
    border: 1px solid var(--background);
  }

  .tab-item_active {
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
    font-size: 16px;
    font-weight: bold;
  }
</style>
