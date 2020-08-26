<template>
  <div class="group_list">
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
                placeholder="搜索群号、群名"
                @keyup.enter.native="$event.target.blur()"
                @blur="handleSearch"/>
    </div>
    <h2 class="title">群聊列表</h2>
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick">
      <el-table-column
        min-width="190"
        label="群聊名称">
        <template v-slot="{row}">
          <div class="table-name" :title="row.name">{{row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="markId"
        label="群号">
      </el-table-column>
      <el-table-column
        min-width="96"
        prop="account"
        label="群主">
        <template v-slot="{row}">
          <span class="g-table-btn" @click="jumpUser(row.owner.account)">{{row.owner.account}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="memberCount"
        label="群人数">
      </el-table-column>
      <el-table-column
        prop="banTimes"
        label="封群次数">
      </el-table-column>
      <el-table-column
        min-width="105"
        label="状态">
        <template v-slot="{row}">
          <span v-if="row.recommend===Bool.Yes">推荐中</span>
          <span v-else :class="{'table-warn':row.remainTime>0}">{{row.remainTime | formatStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="{row}">
          <span class="table-btn" v-if="row.remainTime>0" @click="showCancelDialog(row)">解封</span>
          <span class="table-btn" v-else @click="showBanDialog(row)">封群</span>
          <span v-if="row.remainTime>0" class="table-btn table-btn_disable l-margin_rec">推荐</span>
          <span v-else-if="row.recommend===Bool.Yes" class="table-btn l-margin_rec"
                @click="submitRecommend(row.id,false)">不推</span>
          <span v-else class="table-btn l-margin_rec" @click="submitRecommend(row.id,true)">推荐</span>
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
    <my-dialog :show.sync="isShowBanDialog" title="封群">
      <div class="dialog_ban" v-if="dialogGroup">
        <h2 class="dialog_ban-name">{{dialogGroup.name}}({{dialogGroup.memberCount}})</h2>
        <div class="dialog_ban-account">账号 {{dialogGroup.owner.account}}</div>
        <div class="dialog_ban-uid">UID {{dialogGroup.owner.uid}}</div>
        <ban-set :id="dialogGroup.id" @submitted="closeDialog();doLoadList();" @cancel="closeDialog" :isGroup="true"/>
      </div>
    </my-dialog>
    <my-dialog :show.sync="isShowCancelBanDialog" title="解封群聊">
      <div class="dialog_cancel" v-if="dialogGroup">
        <h2 class="dialog_cancel-tip">确定对以下群聊进行解封操作吗？</h2>
        <h3 class="dialog_cancel-name">{{dialogGroup.name}}({{dialogGroup.memberCount}})</h3>
        <div class="dialog_cancel-account">账号 {{dialogGroup.owner.account}}</div>
        <div class="dialog_cancel-uid">UID {{dialogGroup.owner.uid}}</div>
        <cancel-ban :id="dialogGroup.id"
                    :note="dialogGroup.reason"
                    :banLabel="dialogGroup.remainTime | formatStatus"
                    @submitted="closeDialog();doLoadList();"
                    @cancel="closeDialog"
                    :isGroup="true">
        </cancel-ban>
      </div>
    </my-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MyDialog from '@/components/Dialog.vue';
  import BanSet from '@/components/BanSet.vue';
  import CancelBan from '@/components/CancelBan.vue';
  import {Bool, GroupItem, GroupStatus} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import {formatCount} from '@/utils/tool';
  import {mixins} from 'vue-class-component';
  import PagedTable from '@/mixins/PagedTable';

  interface RemainTime {
    remainTime: number;
  }

  /**
   * 群聊列表
   * @author yuanzeyu
   * @date 2019-04-18
   */
  @Component({
    components: {
      MyDialog,
      BanSet,
      CancelBan,
    },
    filters: {
      formatStatus(val: number) {
        if (val === 0) {
          return '正常';
        } else if (val < 7258089600000) {
          return `封群中(${formatCount(val)})`;
        }
        return '封群中(永远)';
      }
    }
  })
  export default class GroupList extends mixins(PagedTable) {
    public select: GroupStatus | -1 = -1;
    public query: string = '';
    public list: (GroupItem & RemainTime)[] = [];
    public typeOptions = [
      {
        label: '全部群聊',
        value: -1,
      },
      {
        label: '正常群聊',
        value: GroupStatus.Normal,
      },
      {
        label: '封群中',
        value: GroupStatus.Ban,
      },
      {
        label: '推荐中',
        value: GroupStatus.Recommend,
      },
    ];
    public countTimer: any = '';
    public isShowBanDialog: boolean = false;
    public isShowCancelBanDialog: boolean = false;
    public dialogGroup: GroupItem | null = null;
    public loadOptions: any = {
      loadApi: Apis.GROUP_LIST,
      customSetList: (resList: any) => {
        this.setGroupList(resList);
      }
    };
    public Bool = Bool;

    public created() {
      const markId = (this.$route.params as any).markId;
      if (markId) {
        this.query = markId;
      }
      this.doLoadList();
    }

    public beforeDestroy() {
      this.clearTimer();
    }

    public showBanDialog(val: GroupItem) {
      this.isShowBanDialog = true;
      this.dialogGroup = val;
    }

    public showCancelDialog(val: GroupItem) {
      this.isShowCancelBanDialog = true;
      this.dialogGroup = val;
    }

    public closeDialog() {
      this.isShowBanDialog = false;
      this.isShowCancelBanDialog = false;
      this.dialogGroup = null;
    }

    public jumpUser(account: string) {
      this.$router.push({
        name: 'user',
        params: {
          account,
        },
      });
    }

    public async submitRecommend(id: string, isActive: boolean) {
      const res = await this.$post(Apis.RECOMMEND_SET, {
        id,
        recommend: isActive ? Bool.Yes : Bool.No,
      });
      if (res) {
        this.$chatNotify.success('操作成功');
        this.doLoadList();
      }
    }

    private setGroupList(list: GroupItem[]) { // todo 提出
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
  .group_list {
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

  .table-btn_disable {
    color: #B2BCC6;
  }

  .dialog_ban {
    padding: 0 40px 43px 40px;
    width: 420px;
    text-align: center;
  }

  .dialog_ban-name {
    margin: 10px 0 0 0;
    font-size: 16px;
    line-height: 22px;
    color: var(--theme-color);
    font-weight: bold;
  }

  .dialog_ban-account {
    margin-top: 17px;
    line-height: 20px;
    font-weight: 500;
  }

  .dialog_ban-uid {
    margin: 13px 0 30px;
    line-height: 20px;
    font-weight: 500;
  }

  .dialog_cancel {
    width: 500px;
    padding: 11px 0 30px 0;
    text-align: center;
  }

  .dialog_cancel-tip {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    color: var(--color-light);
    line-height: 17px;
  }

  .dialog_cancel-name {
    margin: 11px 0 0 0;
    font-size: 16px;
    line-height: 22px;
    color: var(--theme-color);
    font-weight: bold;
  }

  .dialog_cancel-account {
    margin-top: 10px;
    font-weight: 500;
    line-height: 20px;
  }

  .dialog_cancel-uid {
    margin: 10px 0;
    line-height: 20px;
    font-weight: 500;
  }

  .table-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .l-margin_rec {
    margin-left: 20px;
  }
</style>
