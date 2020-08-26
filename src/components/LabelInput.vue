<template>
  <div class="label_input">
    <label class="label" :class="{'label-left':isAlignLeft}">{{label}}</label>
    <input class="g-reset_input input"
           :class="{'input_left':isAlignLeft}"
           :value="value"
           @input="emitInput"
           :readonly="disabled"
           :type="isPassword?'password':'text'"
           @keyup.enter="$emit('enter')"
           v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * @name 带名称的输入框
   * @author yuanzeyu
   * @date 2019-04-15
   */
  @Component
  export default class LabelInput extends Vue {
    @Prop({required: true}) public value!: string;
    @Prop({type: String, required: true}) public label!: string;
    @Prop({type: Boolean, default: false}) public isPassword!: boolean;
    @Prop({type: Boolean, default: false}) public isAlignLeft!: boolean;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    public emitInput(e: any) {
      this.$emit('input', e.target.value);
    }
  }
</script>

<style scoped>
  .label_input {
    position: relative;
    display: inline-block;
    background: var(--background);
    height: 40px;
    line-height: 40px;
    font-size: var(--base-font-size);
  }

  .label {
    position: absolute;
    display: inline-block;
    left: 20px;
    color: var(--color-light);
    width: 110px;
    text-align: left;
  }

  .label-left {
    position: initial;
    padding-left: 20px;
    width: 90px;
  }

  .input {
    width: 100%;
    text-align: center;

  }

  .input_left {
    width: calc(100% - 110px);
    text-align: left;
  }

</style>
