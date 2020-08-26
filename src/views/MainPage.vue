<template>
  <div class="main-page">
    <header class="header">
      <img class="header-logo" src="../assets/img/logo.svg" alt="logo">
      <span class="header-title">{{Platform.name}}后台</span>
      <span class="header-btn_exit" @click="exit">退出</span>
      <span class="header-user">{{managerId}}</span>
    </header>
    <div class="bottom_wrapper">
      <aside class="menu">
        <div class="menu-item" :class="{'menu-item_active':currentPage==='sum'}" @click="go('sum')">汇总管理</div>
        <div class="menu-item" :class="{'menu-item_active':currentPage==='version'}" @click="go('version')">版本分布</div>
        <div class="menu-item" :class="{'menu-item_active':currentPage==='user'}" @click="go('user')">用户管理</div>
        <div class="menu-item" :class="{'menu-item_active':currentPage==='group'}" @click="go('group')">群聊设置</div>
        <div class="menu-item" :class="{'menu-item_active':currentPage==='log'}" @click="go('log')">操作记录</div>
        <div class="menu-item" :class="{'menu-item_active':currentPage==='ad'}" @click="go('ad')">广告设置</div>
        <!-- <div class="menu-item" :class="{'menu-item_active':currentPage==='fund'}" @click="go('fund')">资金管理</div> -->
        <!-- <div class="menu-item" :class="{'menu-item_active':currentPage==='cert'}"  @click="go('cert')">认证审核</div> -->
      </aside>
      <main class="main">
        <div class="main_wrapper">
          <div class="main-content">
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Platform} from '@/config/platform';
  import {Apis} from '@/config/Apis';

  /**
   * @name 主页面基本结构
   * @author yuanzeyu
   * @date 2019-04-15
   * @desc 标题栏，菜单，route
   */
  @Component
  export default class MainPage extends Vue {
    public Platform = Platform;
    public managerId: string = '';

    public get currentPage() {
      return this.$route.name;
    }

    public exit(): void {
      this.$router.push('/');
    }

    public go(routeName: string): void {
      this.$router.push(routeName);
    }

    public async getAccount() {
      const data = await this.$post(Apis.MANAGER_ACCOUNT);
      if (data) {
        this.managerId = data.account;
      }
    }

    public mounted() {
      this.getAccount();
    }
  }
</script>

<style scoped>
  .main-page {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 0 20px 0 30px;
    line-height: 70px;
    background: #fff;
    font-size: 0;
    font-weight: 500;
  }

  .header-logo {
    vertical-align: middle;
    line-height: 70px;
    width: 30px;
    height: 30px;
  }

  .header-title {
    margin-left: 10px;
    font-size: 16px;
    vertical-align: middle;
    color: var(--theme-color);
  }

  .header-btn_exit {
    float: right;
    font-size: 16px;
    cursor: pointer;
    color: var(--theme-color);
  }

  .header-user {
    float: right;
    font-size: 16px;
    margin-right: 20px;
  }

  .bottom_wrapper {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .menu {
    width: 210px;
    background: #fff;
  }

  .menu-item {
    line-height: 40px;
    text-align: center;
    color: var(--color-light);
    font-size: var(--base-font-size);
    font-weight: 500;
    cursor: pointer;
  }

  .menu-item:hover {
    background: #E8F3FF;
  }

  .menu-item_active {
    background: #E8F3FF;
    color: var(--theme-color);
  }

  .main {
    flex: 1;
    padding: 20px;
    overflow: hidden;
  }

  .main_wrapper {
    height: 100%;
    overflow: auto;
  }

  .main-content {
    min-width: 950px;
  }
</style>
