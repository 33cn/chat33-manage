<template>
  <div class="time_selector">
    <el-date-picker
      class="picker"
      v-model="bindDate"
      ref="pickerDom"
      type="date"
      value-format="timestamp"
      :picker-options="pickerOptions">
    </el-date-picker>
    <label-input class="input" v-model="bindLabel" label="自定义时间" @click.native="showPicker" disabled isAlignLeft>
      <i class="iconfont iconrili input-icon"></i>
    </label-input>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import LabelInput from '@/components/LabelInput.vue';
  import {formatDate} from '@/utils/tool';

  /**
   * @name 选择从今天开始到的日期
   * @author yuanzeyu
   * @date 2019-04-17
   * @desc 用于封号自定义时间
   */
  @Component({
    components: {
      LabelInput,
    },
  })
  export default class TimeSelector extends Vue {
    @Prop() public value!: number; // 绑定的结束时间戳
    public pickerOptions = {
      disabledDate(time: any) {
        return time.getTime() < Date.now();
      },
    };

    public get bindLabel() {
      const endLabel: string = this.value >= 7258089600000 ? '永远' : formatDate(this.value);
      return `${formatDate(Date.now())} ~ ${endLabel}`;
    }

    public get bindDate(): number | null {
      return this.value === 7258089600000 ? null : this.value;
    }

    public set bindDate(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    }

    public showPicker() {
      (this.$refs as any).pickerDom.focus();
    }
  }
</script>

<style scoped>
  .time_selector {
    position: relative;
    cursor: pointer;
  }

  .input {
    line-height: 50px;
    height: 50px;
  }

  .input-icon {
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 18px;
    color: var(--color-light);
  }

  .picker {
    position: absolute;
    top: 5px;
    left: 40px;
  }
</style>
