<template>
  <div class="ad_manage">
    <h2 class="title">
      <span class="title-main">开屏广告设置</span>
      <span class="title-tip">激活的多条广告每次打开APP会随机选择播放</span>
    </h2>
    <!-- todo adItem -->
    <app-item class="list-item"
              v-for="item in adList"
              :key="item.id"
              :adItem.sync="item"
              @afterDelete="fetchAdList"
              @afterActive="fetchAdList"/>
    <edit-app class="list-item"
              v-for="(item, index) in editList"
              :key="item.id"
              :editItem="item"
              @afterSubmit="removeEdit(index)"/>
    <add-app v-if="total<5" class="btn_add" @click.native="addEdit"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AppItem from '@/views/AppManage/AppItem.vue';
  import {AdItem, Bool, ResAdList} from '@/typings/interfaces';
  import AddApp from '@/views/AppManage/AddApp.vue';
  import EditApp from '@/views/AppManage/EditApp.vue';
  import {formatDate} from '@/utils/tool';
  import {Apis} from '@/config/Apis';

  /**
   * 广告管理页
   * @author yuanzeyu
   * @date 2019-06-13
   * @desc
   */
  @Component({
    components: {
      AppItem,
      AddApp,
      EditApp,
    },
  })
  export default class AdManage extends Vue {

    public get total() {
      return this.adList.length + this.editList.length;
    }

    public adList: AdItem[] = [];

    public editList: AdItem[] = [];

    public addEdit() {
      const now = Date.now();
      this.editList.push({
        id: `${now}${Math.random()}`,
        name: formatDate(now),
        url: '',
        duration: 3,
        link: '',
        isActive: Bool.Yes,
      });
    }

    public async fetchAdList() {
      const res: ResAdList | null = await this.$post(Apis.AD_LIST);
      if (res && res.list) {
        this.adList = res.list;
      }
    }

    public removeEdit(i: number) {
      this.editList.splice(i, 1);
      this.fetchAdList();
    }

    public created() {
      this.fetchAdList();
    }
  }
</script>

<style scoped>
  .ad_manage {
    background: #fff;
    padding: 0 20px;
    height: 100%;
    overflow: auto;
  }

  .title {
    margin: 0;
    line-height: 60px;
  }

  .title-main {
    vertical-align: middle;
    font-size: 16px;
    color: var(--color-dark);
    font-weight: 500;
  }

  .title-tip {
    margin-left: 20px;
    vertical-align: middle;
    color: var(--color-light);
    font-size: 14px;
  }

  .list-item {
    vertical-align: top;
    margin-right: 30px;
    margin-bottom: 20px;
  }

  .btn_add {
    margin-top: 40px;
    vertical-align: top;
  }
</style>
