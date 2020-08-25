<template>
  <div class="cert_table">
    <header class="header">
      <div class="header-tab" :class="{'header-tab_active':isPersonTab}" @click="select(true)">个人认证
      </div>
      <div class="header-tab" :class="{'header-tab_active':!isPersonTab}" @click="select(false)">群聊认证
      </div>
      <div class="form_wrapper">
        <el-select class="g-select" v-model="status" placeholder="请选择" @change="handleSelect">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="form-search g-input"
                  v-model="query"
                  placeholder="搜索用户UID、账号、昵称"
                  @keyup.enter.native="$event.target.blur()"
                  @blur="handleSearch"/>
      </div>
    </header>
    <el-table :data="personalCertList"
              class="g-table"
              v-loading="loading">
      <el-table-column label="昵称">
        <template v-slot="{row}">
          <div class="table-label">{{row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="UID">
        <template v-slot="{row}">
          <div class="table-btn" @click="goCheckUser(row.account)">{{row.uid}}</div>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template v-slot="{row}">
          <div class="table-btn" @click="goCheckUser(row.account)">{{row.account}}</div>
        </template>
      </el-table-column>
      <el-table-column label="认证说明">
        <template v-slot="{row}">
          <div class="table-label">{{row.description}}</div>
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template v-slot="{row}">{{row.avatar}}</template>
      </el-table-column>
      <el-table-column label="支付金额">
        <template v-slot="{row}">
          <div class="table-label">{{row.amount}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="{row}">
          <div class="table-label">{{statusOptions.find((item) => item.value === row.state).label}}</div>
        </template>
      </el-table-column>
      <el-table-column label="资金入账">
        <template v-slot="{row}">
          <div class="table-label">
            <span v-if="row.coinState===0">入账中</span>
            <span v-else-if="row.coinState===1">入账成功</span>
            <span v-else-if="row.coinState===2" class="table-label_fail">入账失败</span>
            <span v-else-if="row.coinState===3">退回中</span>
            <span v-else-if="row.coinState===4">退回成功</span>
            <span v-else-if="row.coinState===5" class="table-label_fail">退回失败</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <span v-if="row.coinState===5" class="table-btn">重新退回</span>
          <template v-else-if="row.state===0">
            <span class="table-btn" :class="{'js-table-btn_disable':row.coinState!==0}">通过</span>
            <span class="table-btn table-btn_reject">驳回</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="fetchList"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {certificatialItem} from '@/typings/interfaces';

  import {Apis} from '@/config/Apis';

  @Component({})
  export default class TabChangeTables extends Vue {
    public isPersonTab: boolean = true;
    public personalCertList: certificatialItem[] = [
      {
        id: 'string',
        uid: '233233',
        account: 'account', // 群号或用户账号
        name: 'string; //名称',
        avatar: 'string; // 头像',
        currency: 'TSC',
        amount: '200',
        state: 0,
        description: 'string; //说明',
        coinState: 2,
        time: '2019-2-2',
      },
      {
        id: 'string',
        uid: '233233',
        account: 'account', // 群号或用户账号
        name: 'string; //名称',
        avatar: 'string; // 头像',
        currency: 'TSC',
        amount: '200',
        state: 0,
        description: 'string; //说明',
        coinState: 5,
        time: '2019-2-2',
      },
    ];

    public status: string = '';
    public statusOptions = [
      {
        label: '全部状态',
        value: -1,
      },
      {
        label: '待审核',
        value: 1,
      },
      {
        label: '已认证',
        value: 2,
      },
      {
        label: '未通过',
        value: 3,
      },
    ];
    public query: string = '';
    public page: number = 1;
    public pageSize: number = 16;
    public total: number = 20;
    public loading: boolean = false;


    public mounted() {
      this.fetchList();
    }

    public async load() {
      this.loading = true;
      await this.fetchList();
      this.loading = false;
    }

    public select(isPersonTab: boolean) {
      this.isPersonTab = isPersonTab;
      this.refreshList();
    }

    /**
     * 状态下拉选中
     */
    public handleSelect() {
      this.refreshList();
    }

    /**
     * 输入框搜索
     */
    public handleSearch() {
      this.refreshList();
    }

    public async fetchList() {
      let data = null;
      if(this.isPersonTab){
        data = await this.$post(Apis.PERSONAL_VERT_LIST, {
          "search": this.query,
          "page": this.page,
          "size": this.pageSize,
          "state": this.status || undefined
        });
      }
      else{
        data = await this.$post(Apis.CHAT_GROUP_VERT_LIST, {
          "search": this.query,
          "page": this.page,
          "size": this.pageSize,
          "state": this.status || undefined
        });
      }

      if (data) {
        this.personalCertList = data.list;
      }
    }

    /**
     * 跳转到查询用户页面
     */
    public goCheckUser(account: string) {
      this.$router.push({
        name: 'user',
        params: {
          account,
        },
      });
    }

    /**
     * 刷新列表
     */
    private refreshList() {
      this.page = 1;
      this.total = 0;
      this.fetchList();
    }
  }
</script>

<style scoped>
  .cert_table {
    margin-top: 20px;
    padding-bottom: 35px;
    background: #fff;
  }

  .header {
    line-height: 60px;
    height: 60px;
    padding-right: 20px;
  }

  .header-tab {
    display: inline-block;
    width: 170px;
    color: var(--color-light);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
  }

  .header-tab_active {
    background: var(--theme-color);
    color: #fff;
  }

  .header-input {
    float: right;
  }

  .form_wrapper {
    float: right;
  }

  .form-search {
    margin-left: 20px;
  }

  .table-label {
    display: inline-block;
    max-width: 140px;
    line-height: 20px;
    text-align: left;
  }

  .table-btn {
    color: var(--theme-color);
    cursor: pointer;
  }

  .js-table-btn_disable {
    color: #B2BCC6;
    cursor: not-allowed;
  }

  .table-label_fail {
    color: #CF4646;
  }

  .table-btn_reject {
    margin-left: 20px;
  }
</style>

