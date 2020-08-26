<template>
  <div class="data_list">
    <header class="header">
      <div class="header-tab" :class="{'header-tab_active':isSingle}" @click="select('single')">单次邀请奖励名单
      </div>
      <div class="header-tab" :class="{'header-tab_active':!isSingle}" @click="select('multi')">叠加邀请奖励名单
      </div>
      <el-input class="g-input header-input"
                v-model="query"
                placeholder="搜索uid、账号"
                @keyup.enter.native="$event.target.blur()"
                @blur="handleSearch"/>
    </header>
    <el-table
      :data="inviteList"
      v-loading="loading"
      class="g-table g-table_thick">
      <el-table-column
        label="奖励时间">
        <template v-slot="{row}">
          {{row.updated_at}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户UID">
        <template v-slot="{row}">
          <span class="table-btn" @click="goCheckUser(row.mobile)">{{row.uid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户账号">
        <template v-slot="{row}">
          <span class="table-btn" @click="goCheckUser(row.mobile)">{{row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="奖励金额">
        <template v-slot="{row}">
          <span>{{Number(row.amount)}} {{row.currency}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="banTimes"
        label="奖励类型">
        <template v-if="isSingle" v-slot="{row}">
          <span>{{row.from===row.uid?'被邀请人':'邀请人'}}</span>
        </template>
        <template v-else v-slot="{row}">
          邀请{{row.num}}人
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="loadCurrentPage"
      :page-size="16"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {formatDate} from '@/utils/tool';
  import {Apis} from '@/config/Apis';
  import {InviteItem, ResInviteList} from '@/typings/interfaces';

  /**
   * 统计表格
   * @author yuanzeyu
   * @date 2019-06-27
   * @desc
   */
  @Component({
    filters: {
      formatDatetime(val: number): string {
        return formatDate(val, true, true);
      },
    },
  })
  export default class DataList extends Vue {
    public query: string = '';
    public activeTab: 'single' | 'multi' = 'single';
    public page: number = 1;
    public total: number = 20;
    public inviteList: InviteItem[] = [];
    public loading: boolean = false;

    public get isSingle(): boolean {
      return this.activeTab === 'single';
    }

    public created() {
      this.refreshList();
    }

    public select(val: 'single' | 'multi') {
      this.activeTab = val;
      this.refreshList();
    }

    /**
     * 执行搜索
     */
    public handleSearch() {
      this.refreshList();
    }

    public refreshList() {
      this.page = 1;
      this.total = 0;
      this.loadCurrentPage();
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
     * 加载当前页表格
     */
    private async loadCurrentPage() {
      this.loading = true;
      await this.fetchList();
      this.loading = false;
    }

    /**
     * 请求表格数据
     */
    private async fetchList() {
      const isSingle: boolean = this.activeTab === 'single';
      const res: ResInviteList | null = await this.$post(Apis.INVITE_LIST, {
        search: this.query,
        page: this.page,
        size: 16,
        rewardType: isSingle ? 1 : 2,
      });
      if (res) {
        this.inviteList = res.list;
        this.total = Number(res.count);
      }
    }

  }
</script>

<style scoped>
  .data_list {
    padding-bottom: 35px;
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

  .table-btn {
    color: var(--theme-color);
    cursor: pointer;
  }
</style>
