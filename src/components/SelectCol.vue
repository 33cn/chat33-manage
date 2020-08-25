<template>
  <div class="select_col">
    <div v-for="item in options"
         class="select-item"
         :class="{'select-item_selected': selected===item.value}"
         :key="item.id"
         @click="$emit('select',item.value)">
      {{item.label}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {OptionItem} from '@/typings/local';

  /**
   * 选项下拉菜单
   * @author yuanzeyu
   * @date 2019-06-14
   * @desc
   */
  @Component
  export default class SelectCol extends Vue {
    @Prop() options!: OptionItem;
    @Prop() selected!: any;
  }
</script>

<style scoped>
  .select_col {
    width: 150px;
    box-shadow: 0 0 14px 0 rgba(167, 184, 194, 1);
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }

  .select-item {
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-dark);

    &:hover {
      background: #E8F3FF;
    }
  }

  .select-item_selected {
    color: var(--theme-color);
  }
</style>
