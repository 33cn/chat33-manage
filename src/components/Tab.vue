<template>
  <ul class="tab" :style="`width:${width}px`">
    <li v-for="(item, index) in options"
        class="tab-item"
        :class="{'tab-item_active': item.value===value}"
        :style="`left:-${index}px`"
        :key="index"
        @click="emitSelect(item.value)">
      {{item.label}}
    </li>
  </ul>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  interface Option {
    label: string;
    value: any;
  }

  /**
   * @name tab
   * @author yuanzeyu
   * @date 2019-04-15
   * @desc @select v-model
   */
  @Component
  export default class Tab extends Vue {
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
  .tab {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 28px;
    color: var(--color-light);
    font-size: var(--base-font-size);
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .tab-item {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100px;
    border: 1px solid var(--color-light);
    cursor: pointer;
  }

  .tab-item_active {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    z-index: 2;
  }
</style>
