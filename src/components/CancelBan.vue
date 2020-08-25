<template>
  <div>
    <div class="ban_label">{{banLabel}}</div>
    <div class="ban_note">{{note}}</div>
    <button class="g-btn_default btn" @click="clickCancel">取消</button>
    <button class="g-btn_primary btn btn_submit" @click="submitCancelBan">确定解封</button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Apis} from '@/config/Apis';

  /**
   * @name 取消封号
   * @author yuanzeyu
   * @date 2019-04-17
   */
  @Component
  export default class CancelBan extends Vue {
    @Prop() public id!: string;
    @Prop({default: false}) public isGroup!: boolean;
    @Prop() public note!: string;
    @Prop() public banLabel!: string; // 直接使用表格的禁言倒计时

    public clickCancel() {
      this.$emit('cancel');
    }

    public async submitCancelBan() {
      const data = await this.$post(this.isGroup ? Apis.GROUP_CANCEL_BAN : Apis.USER_CANCEL_BAN, {
        id: this.id,
      });
      if (data) {
        this.$emit('submitted');
      }
    }
  }
</script>

<style scoped>
  .ban_label {
    color: #CF4646;
    font-weight: 500;
    line-height: 20px;
  }

  .ban_note {
    margin: 10px 0 30px 0;
    line-height: 20px;
  }

  .btn {
    width: 90px;
  }

  .btn_submit {
    margin-left: 20px;
  }
</style>
