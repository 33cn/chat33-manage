<template>
  <div class="app_item">
    <name-editor :name="adItem.name" @confirm="submitEditName"/>
    <img class="img_source" :src="adItem.url" alt="图片">
    <h2 class="title">广告时间</h2>
    <div class="duration_box">{{adItem.duration}}秒</div>
    <h2 class="title">广告链接</h2>
    <div class="link_box">
      {{adItem.link}}
    </div>
    <button v-if="adItem.isActive" class="g-btn_primary btn" @click="switchActive(false)">已激活</button>
    <button v-else class="g-btn_primary btn btn_enable" @click="switchActive(true)">未激活</button>
    <button class="g-btn_default btn btn_delete" @click="handleDelete">删除</button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {AdItem, Bool, ParamActiveAd, ParamDeleteAd, ParamEditAdName} from '@/typings/interfaces';
  import NameEditor from '@/views/AppManage/NameEditor.vue';
  import {Apis} from '@/config/Apis';

  /**
   * 已添加的广告
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component({
    components: {
      NameEditor,
    },
  })
  export default class AppItem extends Vue {
    @Prop() adItem!: AdItem;

    public async submitEditName(name: string) {
      const backUp = this.adItem.name;
      this.adItem.name = name;
      const params: ParamEditAdName = {
        id: this.adItem.id,
        name,
      };
      const res = await this.$post(Apis.EDIT_AD_NAME, params);
      if (!res) { // 失败还原
        this.adItem.name = backUp;
      }
    }

    public async handleDelete() {
      const params: ParamDeleteAd = {
        id: this.adItem.id,
      };
      const res = await this.$post(Apis.DELETE_AD, params);
      if (res) {
        this.$emit('afterDelete');
      }
    }

    public async switchActive(isActive: boolean) {
      const params: ParamActiveAd = {
        id: this.adItem.id,
        isActive: isActive ? Bool.Yes : Bool.No,
      };
      const res = await this.$post(Apis.ACTIVE_AD, params);
      if (res) {
        this.$emit('afterActive', isActive);
      }
    }
  }
</script>

<style scoped>
  .app_item {
    display: inline-block;
    width: 150px;
    font-size: 0;
  }

  .title {
    margin: 0;
    line-height: 40px;
    color: var(--color-dark);
    font-size: 14px;
  }

  .img_source {
    margin-bottom: 10px;
    width: 150px;
    height: 325px;
  }

  .duration_box {
    margin-bottom: 10px;
    width: 129px; /* 150 - 21 */
    padding-left: 21px;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    background: var(--background);
    font-size: 14px;
  }

  .link_box {
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    padding: 10px 19px 20px 21px;
    background: var(--background);
    font-size: 14px;
    word-break: break-word;
    font-weight: 500;
  }

  .btn {
    width: 70px;
    height: 30px;
  }

  .btn_delete {
    float: right;
  }


  .btn_enable {
    background: var(--color-light);
  }

</style>
