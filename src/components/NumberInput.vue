<template>
  <div class="number_input">
    <div class="unit">{{unit}}</div>
    <input class="g-reset_input t-input" type="number" :value="value" @input="emitInput">
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * 数量输入框
   * @author yuanzeyu
   * @date 2019-04-18
   * @desc
   */
  @Component
  export default class NumberInput extends Vue { // todo 限制整数
    @Prop() public unit!: string;
    @Prop({required: true, type: String}) public value!: string;

    public emitInput(e: any) {
      this.$emit('input', e.target.value);
    }
  }
</script>

<style scoped>
  .number_input {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    background: var(--background);
  }

  .t-input {
    line-height: 40px;
    width: calc(100% - 14px);
    font-weight: 500;
  }

  .unit {
    float: right;
    font-weight: 500;
    line-height: 40px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
