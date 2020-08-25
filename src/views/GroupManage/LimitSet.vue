<template>
  <div class="limit_set">
    <div class="content_wrapper">
      <label class="content-label">单个群聊人数上限</label>
      <number-input class="content-input" v-model="memberLimit" unit="人"></number-input>
      <label class="content-label">单个账号创建群聊个数上限</label>
      <number-input class="content-input" v-model="createLimit" unit="个"></number-input>
      <button class="g-btn_primary content-btn" @click="createdGroupSet">确定</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import NumberInput from '@/components/NumberInput.vue';
  import {Apis} from '@/config/Apis';
  import {ParamGroupSet} from '@/typings/interfaces';

  /**
   * 群聊限制设置
   * @author yuanzeyu
   * @date 2019-04-18
   * @desc
   */
  @Component({
    components: {
      NumberInput,
    },
  })
  export default class LimitSet extends Vue {
    public memberLimit: string = '500';
    public createLimit: string = '500';

    public async getGroupSet() {
      const data: ParamGroupSet | null = await this.$post(Apis.GET_GROUP_SET);
      if (data) {
        this.memberLimit = String(data.memberLimit);
        this.createLimit = String(data.roomCreateLimit);
      }
    }

    public async createdGroupSet() {
      if (!(this.memberLimit && this.createLimit)) {
        return;
      }
      const param: ParamGroupSet = {
        memberLimit: Number(this.memberLimit),
        roomCreateLimit: Number(this.createLimit),
      };
      const data = await this.$post(Apis.GROUP_SET, param);
      if (data) {
        this.$chatNotify.success('修改成功');
      }
    }

    public created() {
      this.getGroupSet();
    }
  }
</script>

<style scoped>
  .limit_set {
    background: #fff;
  }

  .content_wrapper {
    width: 300px;
    padding: 10px 0 30px;
    margin: 0 auto;
  }

  .content-label {
    display: inline-block;
    margin-top: 20px;
    font-weight: 500;
    line-height: 20px;
  }

  .content-input {
    margin-top: 10px;
  }

  .content-btn {
    width: 100%;
    margin-top: 30px;
  }
</style>
