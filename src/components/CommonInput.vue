<template>
  <div class="common_input">
    <div class="wrapper">
      <div class="label_left" v-if="label">{{label}}</div>
      <div class="input_wrapper">
        <input class="g-reset_input input"
               type="text"
               :value="valueBind"
               @input="emitInput"
               v-bind="$attrs">
      </div>
      <div v-if="rightLabel" class="label_right">{{rightLabel}}</div>
      <slot name="inner"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {numberCheck} from '@/utils/tool';

  /**
   * 输入框(以资金管理为准)
   * @author yuanzeyu
   * @date 2019-06-27
   * @desc
   */
  @Component
  export default class CommonInput extends Vue {
    @Prop({required: true}) public value!: string | number;
    @Prop({type: String, default: ''}) public label!: string;
    @Prop({type: String, default: ''}) public rightLabel!: string;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;
    @Prop({type: Boolean, default: false}) public isMoney!: boolean;

    public get valueBind() {
      return String(this.value);
    }

    public emitInput(e: any) {
      const val = e.target.value;
      if (this.isMoney) {
        const result = numberCheck(val);
        e.target.value = result;
        this.$emit('input', Number(result));
      } else {
        this.$emit('input', e.target.value);
      }
    }
  }
</script>

<style scoped>
  .common_input {
    position: relative;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    background: var(--background);
    font-size: var(--base-font-size);
  }

  .wrapper {
    padding: 0 10px;
    height: 100%;
    display: flex;
  }

  .label_left {
    width: 112px; /* 132 - 20 */
    color: var(--color-light);
    flex-shrink: 0;
  }

  .input_wrapper {
    flex: 1;
    vertical-align: middle;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
  }

  .label_right {
    padding-left: 5px;
  }
</style>
