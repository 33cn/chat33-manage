<template>
  <div class="group_set">
    <div class="label">群红包手续费设置</div>
    <div class="form">
      <common-input v-for="(item, index) in chargeList"
                    class="form-item"
                    :value="Number(item.amount)"
                    @input="setBindValue(item, $event)"
                    :rightLabel="`${item.currency}/次`"
                    :key="index"
                    isMoney/>
    </div>
    <button class="g-btn_primary btn_confirm" @click="handleConfirm">确定</button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CommonInput from '@/components/CommonInput.vue';
  import {GroupChargeItem, ResGetGroupCharge} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * 群红包手续费设置
   * @author yuanzeyu
   * @date 2019-07-11
   * @desc
   */
  @Component({
    components: {
      CommonInput,
    },
  })
  export default class GroupSet extends Vue {
    public chargeList: GroupChargeItem[] = [];

    public created() {
      this.fetchSet();
    }

    public setBindValue(item: GroupChargeItem, val: number) {
      item.amount = String(val);
    }

    public handleConfirm() {
      this.submitSet();
    }

    private async fetchSet() {
      const res: ResGetGroupCharge | null = await this.$post(Apis.GET_GROUP_CHARGE);
      if (res) {
        this.chargeList = res.config;
      }
    }

    private async submitSet() {
      const res = await this.$post(Apis.SET_GROUP_CHARGE, {
        config: this.chargeList,
      });
      if (res) {
        this.$chatNotify.success('修改成功');
      }
    }
  }
</script>

<style scoped>
  .group_set {
    width: 264px;
    padding: 0 20px;
    display: inline-block;
    text-align: left;
  }

  .label {
    text-align: left;
    margin-top: 30px;
    line-height: 20px;
    font-weight: 500;
    font-size: var(--base-font-size);
  }

  .form {
    height: 290px;
    overflow: auto;
  }

  .form-item {
    margin-top: 10px;
    width: 250px;
  }

  .btn_confirm {
    margin-top: 20px;
    width: 250px;
  }
</style>
