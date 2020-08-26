<template>
  <div class="user_list">
    <div class="form_wrapper">
      <el-select class="g-select" v-model="select" placeholder="请选择" @change="handleSelect">
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
    <h2 class="title">用户列表</h2>
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick">
      <el-table-column
        min-width="100"
        label="注册时间">
        <template v-slot="{row}">
          {{row.createTime | formatDatetime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID">
      </el-table-column>
      <el-table-column
        min-width="100"
        prop="account"
        label="账号">
      </el-table-column>
      <el-table-column
        label="创建群聊数">
        <template v-slot="{row}">
          <span >{{row.roomCreatedCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="banTimes"
        label="封号次数">
      </el-table-column>
      <el-table-column
        min-width="90"
        label="状态">
        <template v-slot="{row}">
          <span :class="{'table-warn':row.remainTime>0}">{{row.remainTime | formatStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="{row}">
          <span class="table-btn" v-if="row.remainTime>0" @click="showCancelDialog(row)">解封</span>
          <span class="table-btn" v-else @click="showBanDialog(row)">封号</span>
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
    <my-dialog :show.sync="isShowBanDialog" title="封号">
      <div class="dialog_ban" v-if="dialogUser">
        <h3 class="dialog_ban-account">{{dialogUser.account}}</h3>
        <div class="dialog_ban-uid">UID {{dialogUser.uid}}</div>
        <ban-set :id="dialogUser.id" @submitted="closeDialog();doLoadList();" @cancel="closeDialog"/>
      </div>
    </my-dialog>
    <my-dialog :show.sync="isShowCancelBanDialog" title="解封账号">
      <div class="dialog_cancel" v-if="dialogUser">
        <h2 class="dialog_cancel-tip">确定对以下账号进行解封操作吗？</h2>
        <h3 class="dialog_cancel-account">{{dialogUser.account}}</h3>
        <div class="dialog_cancel-uid">UID {{dialogUser.uid}}</div>
        <cancel-ban :id="dialogUser.id"
                    :note="dialogUser.reason"
                    :banLabel="dialogUser.remainTime | formatStatus"
                    @submitted="closeDialog();doLoadList();"
                    @cancel="closeDialog"/>
      </div>
    </my-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ResUserList, UserItem, UserStatus} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import {formatCount, formatDate} from '@/utils/tool';
  import MyDialog from '@/components/Dialog.vue';
  import BanSet from '@/components/BanSet.vue';
  import CancelBan from '@/components/CancelBan.vue';
  import PagedTable from '@/mixins/PagedTable';
  import {mixins} from 'vue-class-component';

  interface RemainTime {
    remainTime: number;
  }

  /**
   * @name 用户列表
   * @author yuanzeyu
   * @date 2019-04-17
   * @desc
   */
  @Component({
    components: {
      MyDialog,
      BanSet,
      CancelBan,
    },
    filters: {
      formatStatus(val: number): string {
        if (val === 0) {
          return '正常';
        } else if (val < 7258089600000) {
          return `封号中(${formatCount(val)})`;
        }
        return '封号中(永远)';
      },
      formatDatetime(val: number): string {
        return formatDate(val, true);
      }
    }
  })
  export default class UserList extends mixins(PagedTable) {
    public select: UserStatus | -1 = -1;
    public query: string = '';
    public list: (UserItem & RemainTime)[] = [];
    public typeOptions = [
      {
        label: '全部用户',
        value: -1,
      },
      {
        label: '正常用户',
        value: UserStatus.Normal,
      },
      {
        label: '封号用户',
        value: UserStatus.BanUser,
      },
      // {
      //   label: '封群用户',
      //   value: UserStatus.BanGroup,
      // }
    ];
    public countTimer: any = '';
    public isShowBanDialog: boolean = false;
    public isShowCancelBanDialog: boolean = false;
    public dialogUser: UserItem | null = null;
    public loadOptions: any = {
      loadApi: Apis.USER_LIST,
      customSetList: (resList: any) => {
        this.setUserList(resList);
      }
    };

    public created() {
      const searchUser = (this.$route.params as any).account;
      if (searchUser) {
        this.query = searchUser;
      }
      this.reloadList();
    }

    public beforeDestroy() {
      this.clearTimer();
    }

    public showBanDialog(val: UserItem) {
      this.isShowBanDialog = true;
      this.dialogUser = val;
    }

    public showCancelDialog(val: UserItem) {
      this.isShowCancelBanDialog = true;
      this.dialogUser = val;
    }

    public closeDialog() {
      this.isShowBanDialog = false;
      this.isShowCancelBanDialog = false;
      this.dialogUser = null;
    }

    private setUserList(list: UserItem[]) {
      const now = Date.now();
      let needTimer: boolean = false;
      this.list = list.map((item) => {
        const FOREVER = 7258089600000;
        const startTime = typeof item.banStartTime !== 'number' ? now : item.banStartTime; // 后端可能不支持开始时间
        const endTime = item.banEndTime;
        const isCounting: boolean = startTime <= now && endTime >= now && endTime < FOREVER; // 正在期限封号
        const isWaitBan: boolean = startTime >= now && endTime >= now; // 未来封号(预留选择开始时间功能)
        const isNowBanForever: boolean = startTime <= now && endTime >= FOREVER; // 当前已经永久禁言
        let remainTime: number = 0;
        if (isCounting || isWaitBan) { // 存在期限封号（含未开始）
          needTimer = true;
        }
        if (isCounting) {
          remainTime = endTime - now;
        } else if (isNowBanForever) {
          remainTime = FOREVER;
        }
        return Object.assign({}, item, {
          remainTime
        });
      });
      if (needTimer) {
        this.clearTimer();
        this.countTimer = setInterval(() => {
          this.list.forEach((item) => {
            if (item.remainTime > 0 && item.remainTime < 7258089600000) {
              item.remainTime -= 1000;
            } else if (item.remainTime === 0 && item.banEndTime > now && item.banStartTime <= now) { // 开始封号
              if (item.banEndTime >= 7258089600000) {
                item.remainTime = 7258089600000;
              } else {
                item.remainTime = item.banEndTime - Date.now();
              }
            }
          });
        }, 1000);
      }
    }

    private clearTimer() {
      if (this.countTimer) {
        clearInterval(this.countTimer);
      }
    }

  }
</script>

<style scoped>
  .user_list {
    padding-bottom: 20px;
    background: #fff;
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

  .table-warn {
    color: #CF4646;
  }

  .table-btn {
    color: var(--theme-color);
    cursor: pointer;
  }

  .dialog_ban {
    padding: 0 40px 43px 40px;
    width: 420px;
  }

  .dialog_ban-account {
    margin: 39px 0 0 0;
    font-size: 24px;
    line-height: 33px;
    color: var(--theme-color);
    font-weight: bold;
    text-align: center;
  }

  .dialog_ban-uid {
    margin: 10px 0 30px;
    text-align: center;
    line-height: 20px;
  }

  .dialog_cancel {
    width: 500px;
    padding: 11px 0 38px 0;
    text-align: center;
  }

  .dialog_cancel-tip {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    color: var(--color-light);
    line-height: 17px;
  }

  .dialog_cancel-account {
    margin: 11px 0 0 0;
    font-size: 24px;
    line-height: 33px;
    color: var(--theme-color);
    font-weight: bold;
    text-align: center;
  }

  .dialog_cancel-uid {
    margin: 10px 0;
    text-align: center;
    line-height: 20px;
    font-weight: 500;
  }
</style>
