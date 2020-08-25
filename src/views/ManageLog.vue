<template>
  <div class="manage_log">
    <div class="form_wrapper">
      <el-select class="g-select form-type" v-model="select" placeholder="请选择" @change="handleSelect">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="form-search g-input"
                v-model="query"
                placeholder="搜索uid、账号"
                @keyup.enter.native="$event.target.blur()"
                @blur="handleSearch"/>
    </div>
    <h2 class="title">操作记录</h2>
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick"
      @row-click="jump">
      <el-table-column
        label="操作时间">
        <template v-slot="{row}">
          {{row.datetime | formatTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作对象uid/群号">
        <template v-slot="{row}">
          <span class="g-table-btn">
            {{row.targetInfo.uid || row.targetInfo.markId}}
            <div class="table-icon_wrapper"><i class="iconfont iconjiantou table-icon"></i></div>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作对象账号/群名">
        <template v-slot="{row}">
          <span class="g-table-btn">
            {{row.targetInfo.account || row.targetInfo.roomName}}
            <div class="table-icon_wrapper"><i class="iconfont iconjiantou table-icon"></i></div>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作内容">
        <template v-slot="{row}">
          {{typeOptions.find((item) => item.value === row.type).label}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="doLoadList"
      :page-size="16"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {GroupLogInfo, LogItem, LogType, ResManageLog, UserLogInfo} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import {formatDate} from '@/utils/tool';
  import {mixins} from 'vue-class-component';
  import PagedTable from '@/mixins/PagedTable';

  /**
   * @name 操作记录页
   * @author yuanzeyu
   * @date 2019-04-18
   */
  @Component({
    filters: {
      formatTime(val: number): string {
        return formatDate(val, true);
      },
    },
  })
  export default class ManageLog extends mixins(PagedTable) {
    public list: LogItem[] = [];
    public select: LogType | -1 = -1;
    public query: string = '';
    public typeOptions = [
      {
        label: '全部操作',
        value: -1,
      },
      {
        label: '封号',
        value: LogType.BanUser,
      },
      {
        label: '封群',
        value: LogType.BanGroup,
      },
      {
        label: '解封账号',
        value: LogType.CancelBanUser,
      },
      {
        label: '解封群聊',
        value: LogType.CancelBanGroup,
      },
    ];
    public loadOptions: any = {
      loadApi: Apis.MANAGE_LOG,
      otherParam: () => {
        return {
          managerId: '',
        };
      },
    };

    public jump(row: LogItem) {
      const target = row.targetInfo;
      if ((target as GroupLogInfo).markId) {
        this.$router.push({
          name: 'group',
          params: {
            markId: (target as GroupLogInfo).markId,
          },
        });
      } else {
        this.$router.push({
          name: 'user',
          params: {
            account: (target as UserLogInfo).account,
          },
        });
      }
    }

    public created() {
      this.reloadList();
    }
  }
</script>

<style scoped>
  .manage_log {
    background: #fff;
    padding-bottom: 20px;
  }

  .form_wrapper {
    float: right;
    margin-top: 15px;
  }

  .title {
    margin: 0;
    padding-left: 20px;
    font-size: 16px;
    line-height: 60px;
    font-weight: 500;
  }

  .form-search {
    margin: 0 20px;
  }

  .table-icon_wrapper {
    display: inline-block;
    transform: scale(0.7, 0.7);
  }

  .table-icon {
    font-size: 12px;
  }
</style>
