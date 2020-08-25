<template>
  <div class="set_form">
    <div class="form-item-label">单次邀请奖励</div>
    <common-input class="form-item-input"
                  v-model="singleInviterNum"
                  label="邀请人奖励"
                  :rightLabel="singleInviterCoin"
                  isMoney/>
    <common-input class="form-item-input"
                  v-model="singleInvitedNum"
                  label="被邀请人奖励"
                  :rightLabel="singleInvitedCoin"
                  isMoney/>
    <div class="form-item-label">叠加邀请奖励</div>
    <common-input class="form-item-input" style="margin-top: 11px" v-model="multiInvitedCount" label="邀请人数" rightLabel="人" isMoney/>
    <common-input class="form-item-input" v-model="multiInvitedGiftNum" label="邀请人奖励" isMoney>
      <div slot="inner" @click="showSelect">
        <span>{{multiInvitedGiftCoin}}</span>
        <i class="iconfont iconfanhui-copy-copy-copy-copy-copy-copy-copy t-icon_switch"
           :class="{'t-icon_switch_show':isShowCoinSelect}"></i>
      </div>
      <select-col v-show="isShowCoinSelect"
                  class="l-tab_select"
                  :selected="multiInvitedGiftCoin"
                  :options="multiInviteCoinOptions"
                  @mousedown.native.stop
                  @click.native.stop
                  @select="handleSelect"/>
    </common-input>
    <div class="bottom-tip">被邀请人实名后为有效人数</div>
    <button class="g-btn_primary bottom-btn_confirm" @click="handleConfirm">确定</button>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import LabelInput from '@/components/LabelInput.vue';
  import {OptionItem} from '@/typings/local';
  import CommonInput from '@/components/CommonInput.vue';
  import SelectCol from '@/components/SelectCol.vue';
  import {ParamFundsSet, ResFundCoin, ResFundsGetSet} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';

  /**
   * 资金管理-资金配置表单
   * @author yuanzeyu
   * @date 2019-06-27
   * @desc
   */
  @Component({
    components: {
      LabelInput,
      CommonInput,
      SelectCol,
    }
  })
  export default class SetForm extends Vue {

    public singleInvitedNum: number = 0;
    public singleInvitedCoin: string = '';
    public singleInviterNum: number = 0;
    public singleInviterCoin: string = '';
    public multiInvitedCount: number = 0;
    public multiInvitedGiftNum: number = 0;
    public multiInvitedGiftCoin: string = '';


    public multiInviteCoinOptions: OptionItem[] = [];

    public isShowCoinSelect: boolean = false;

    public created() {
      this.fetchFundSet();
      this.fetchCoinList();
    }

    public showSelect() {
      this.isShowCoinSelect = true;
      document.addEventListener('mousedown', this.onSelectHind);
    }

    public onSelectHind() {
      this.isShowCoinSelect = false;
      document.removeEventListener('mousedown', this.onSelectHind);
    }

    public handleSelect(val: string) {
      this.multiInvitedGiftCoin = val;
      this.onSelectHind();
    }

    public handleConfirm() {
      this.submitFundSet();
    }

    /**
     * 请求资金设置
     */
    private async fetchFundSet() {
      const res: ResFundsGetSet | null = await this.$post(Apis.FUNDS_GET_SET);
      if (res) {
        const advice = res.advance;
        const base = res.base;
        this.singleInvitedNum = Number(base.rewardForUser);
        this.singleInvitedCoin = base.currency;
        this.singleInviterNum = Number(base.rewardForInviter[0]);
        this.singleInviterCoin = base.currency;
        this.multiInvitedCount = Number(advice.reachNum);
        this.multiInvitedGiftNum = Number(advice.rewardForNum);
        this.multiInvitedGiftCoin = advice.currency;
      }
    }

    private async submitFundSet() {
      const params: ParamFundsSet = {
        baseCurrency: this.singleInviterCoin,
        baseOpen: 1,
        rewardForUser: this.singleInvitedNum,
        rewardForInviter: [this.singleInviterNum],
        advanceCurrency: this.multiInvitedGiftCoin,
        advanceOpen: 1,
        reachNum: this.multiInvitedCount,
        rewardForNum: this.multiInvitedGiftNum,
      };
      const res = await this.$post(Apis.FUNDS_SET, params);
      if (res) {
        this.$chatNotify.success('修改成功');
      }
    }

    private async fetchCoinList() {
      const res: ResFundCoin | null = await this.$post(Apis.FUNDS_COIN);
      if (res) {
        this.multiInviteCoinOptions = res.coins.map((corn) => {
          return {
            id: corn,
            label: corn,
            value: corn,
          };
        });
      }
    }
  }
</script>

<style scoped>
  .set_form {
    position: relative;
    padding: 10px 18px 0 22px;
    width: 250px;
    text-align: left;
    display: inline-block;
    font-size: 0;
  }

  .form-item-label {
    margin-top: 20px;
    line-height: 20px;
    font-weight: 500;
    font-size: var(--base-font-size);
  }

  .form-item-input {
    margin-top: 10px;
    width: 100%;
  }

  .t-icon_switch {
    margin-left: 9px;
    display: inline-block;
    color: var(--color-light);
    font-size: 12px;
    transform: scale(.833);
  }

  .t-icon_switch_show {
    transform: scale(.833) rotateX(180deg);
  }

  .l-tab_select {
    z-index: 1;
    position: absolute;
    top: 40px;
    right: 0;
    width: 80px;
    max-height: 200px;
    overflow: auto;
  }

  .bottom-btn_confirm {
    margin-top: 39px;
    width: 100%;
  }

  .bottom-tip {
    margin-top: 10px;
    color: var(--color-light);
    font-size: var(--base-font-size);
    line-height: 20px;
    text-align: center;
  }
</style>
