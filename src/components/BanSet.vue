<template>
  <div class="ban_set">
    <div class="tip">请选择封{{isGroup?'群':'号'}}时间，倒计时结束后自动解封</div>
    <tab-select class="l-margin" v-model="selectTime" :options="timeOptions" @select="syncEndTime"/>
    <time-selector v-model="currentEndTime" class="l-margin" @change="syncTime"></time-selector>
    <label-input class="input_note l-margin" v-model="note" :label="`封${isGroup?'群':'号'}备注`" isAlignLeft></label-input>
    <button class="g-btn_default btn" @click="clickCancel">取消</button>
    <button class="g-btn_primary btn btn_submit" @click="submitBan">确定封{{isGroup?'群':'号'}}</button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import LabelInput from '@/components/LabelInput.vue';
  import TabSelect from '@/components/TabSelect.vue';
  import TimeSelector from '@/components/TimeSelector.vue';
  import {ParamTargetBan} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * 封号操作
   * @author yuanzeyu
   * @date 2019-04-17
   * @event cancel submitted
   */
  @Component({
    components: {
      LabelInput,
      TabSelect,
      TimeSelector,
    },
  })
  export default class BanSet extends Vue { // todo 检查是否存在时间临界异常
    @Prop({required: true, type: String}) public id!: string;
    @Prop({type: Boolean,default: false}) public isGroup!: string; // 封群
    public note: string = '';
    public selectTime: number = 7258089600000; // select绑定的时间长度
    public currentEndTime: number = 7258089600000; // 自定义时间绑定的结束时间戳
    public timeOptions = [
      {
        label: '永远',
        value: 7258089600000,
      },
      {
        label: '30天',
        value: 2592000000,
      },
      {
        label: '15天',
        value: 1296000000,
      },
      {
        label: '一周',
        value: 604800000,
      },
      {
        label: '72小时',
        value: 259200000,
      },
      {
        label: '24小时',
        value: 86400000,
      }
    ];

    public syncTime(endTime: number) {
      const now = new Date();
      const todayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      this.selectTime = endTime - todayBegin;
    }

    public syncEndTime(duration: number) {
      if (duration === 7258089600000) {
        this.currentEndTime = 7258089600000;
      } else {
        this.currentEndTime = Date.now() + duration;
      }
    }

    public clickCancel() {
      this.$emit('cancel');
    }

    public async submitBan() {
      const now = Date.now();
      const param: ParamTargetBan = {
        id: this.id,
        reason: this.note,
        startTime: now,
        endTime: this.selectTime === 7258089600000 ? 7258089600000 : now + this.selectTime,
      };
      const data = await this.$post(this.isGroup ? Apis.GROUP_BAN : Apis.USER_BAN, param);
      if (data) {
        this.$emit('submitted');
      }
    }
  }
</script>

<style scoped>
  .ban_set {
    text-align: center;
  }

  .input_note {
    margin-bottom: 30px;
    width: 100%;
    line-height: 50px;
    height: 50px;
  }

  .l-margin {
    margin-top: 10px;
  }

  .btn {
    width: 90px;
  }

  .btn_submit {
    margin-left: 20px;
  }

  .tip {
    font-size: 12px;
    color: var(--color-light);
    line-height: 17px;
    font-weight: 500;
  }
</style>
