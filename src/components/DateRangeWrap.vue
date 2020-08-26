<template>
  <el-date-picker
    class="date_range"
    clear-icon="date_range-close"
    v-model="bindValue"
    type="daterange"
    range-separator="~"
    size="small"
    start-placeholder="开始日期"
    @change="$emit('change')"
    value-format="timestamp"
    :clearable="false"
    :picker-options="pickerOptions"
    end-placeholder="结束日期">
  </el-date-picker>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * @name el日期范围组件包装
   * @author yuanzeyu
   * @date 2019-04-19
   * @desc
   */
  @Component
  export default class DateRangeWrap extends Vue {
    @Prop() public value!: number[];
    @Prop({type: Boolean, default: false}) public disabledBefore!: boolean; // 默认禁用今日之后

    public get bindValue() {
      return this.value;
    }

    public set bindValue(val: number[]) {
      this.$emit('input', val);
    }

    public pickerOptions = {
      disabledDate: (time: any) => {
        const noBefore = time.getTime() < Date.now();
        return this.disabledBefore ? noBefore : !noBefore;
      },
    };
  }
</script>

<style scoped>
  .date_range {
    height: 30px;
    width: 220px;
    border: 1px solid var(--color-light);
    border-radius: 0;
    color: var(--color-light);
  }
</style>

<style>
  .date_range {
    & .el-range__close-icon {
      display: none;
    }
    & .el-icon-date {
      line-height: 22px;
      color: var(--color-light);
    }
  }
</style>
