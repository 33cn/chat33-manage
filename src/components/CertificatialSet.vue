<template>
  <div class="cert_set">
    <div class="col col_left">
      <h2 class="col_left-title">认证设置</h2>
      <common-input class="col_left-input"
                    v-model="personal"
                    label="个人认证"
                    :rightLabel="coin"
                    isMoney/>
      <common-input class="col_left-input"
                    v-model="group"
                    label="群聊认证"
                    :rightLabel="coin"
                    isMoney/>
      <button class="g-btn_primary col_left-btn_confirm" @click="setLimits">确定</button>
    </div>
    <div class="col col_right">
      <h2 class="col_right-title">累计收取认证费</h2>
      <span class="col-right-count">{{count}} {{coin}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import CommonInput from '@/components/CommonInput.vue';
  import { Apis } from '@/config/Apis';
  const AuthTypes = {
    PersonalAuth: 1,
    GroupChatAuth: 2
  }

  @Component({
    components: {
      CommonInput,
    },
  })
  export default class CertificatialSet extends Vue {
    public personal: number = 0; // 个人认证
    public group: number = 0; // 群聊认证
    public coin: string = 'TSC'; // 币种
    public count: number = 0;

    public mounted(){
      this.loadLimits();
      this.loadFeeStatistics();
    }

    public async loadLimits(){
      let rlt = await this.$post(Apis.GET_AUTH_FEE_LIMIT);
      if(rlt && rlt.config){
        for(let i = 0; i < rlt.config.length; i++){
          let item = rlt.config[i];
          if(item.type==AuthTypes.PersonalAuth){
            this.personal = item.amount;
          }
          else if(item.type==AuthTypes.GroupChatAuth){
            this.group = item.amount;
          }
        }
      }
    }

    public async loadFeeStatistics(){
      let rlt = await this.$post(Apis.AUTH_FEE_STATISTICS);
      if(rlt && rlt.data && rlt.data.statistics){
        if(rlt.data.statistics.length > 0){
          let firstElem = rlt.data.statistics[0];
          this.coin = firstElem.currency;
          this.count = firstElem.amount;
          return;
        }
      }

      this.coin = '';
      this.count = 0;
    }

    public async setLimits(){
      if(this.personal > 0 && this.group > 0){

      }
      else{
        return;
      }

      let cfg = {
        "config": [{
            "type": AuthTypes.PersonalAuth,
            "amount": String(this.personal)
          },
          {
            "type": AuthTypes.GroupChatAuth,
            "amount": String(this.group)
          }
        ]
      }
      let rlt = await this.$post(Apis.SET_AUTH_FEE_LIMIT, cfg);
      if(rlt && rlt.result==0){
        this.loadLimits();
      }
    }
  }
</script>

<style scoped>
  .cert_set {
    height: 130px;
    padding-left: 20px;
    background: #fff;
  }

  .col_left {
    vertical-align: top;
    width: 720px;
    display: inline-block;
  }

  .col_right {
    vertical-align: top;
    display: inline-block;
  }

  .col_left-title {
    margin: 18px 0 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .col_left-input {
    margin-right: 20px;
    width: 250px;
  }

  .col_left-btn_confirm {
    width: 100px;
    height: 40px;
  }

  .col_right-title {
    margin: 30px 0 10px 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-light);
    line-height: 20px;
  }

  .col-right-count {
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
  }
</style>
