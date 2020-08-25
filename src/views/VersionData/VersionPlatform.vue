<template>
  <div class="version_platform">
    <h2 class="title">平台列表</h2>
    <el-table
      :data="list"
      class="g-table">
      <el-table-column
        label="平台">
        <template v-slot="{row}">
          <span class="table-platform">{{row.platformName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="new"
        label="新增用户">
      </el-table-column>
      <el-table-column
        label="活跃用户(新用户占比)">
        <template v-slot="{row}">
          {{row.active}}({{row.activeNewPercent | format-percent}})
        </template>
      </el-table-column>
      <el-table-column
        prop="open"
        label="启动次数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {ResVersionPlatform, VersionPlatformItem} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import {getDayEndStamp} from '@/utils/tool';

  /**
   * @name 版本分布-来源平台
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component
  export default class VersionPlatform extends Vue {
    @Prop() public version!: string;
    @Prop() public dateRange!: number[];
    public list: VersionPlatformItem[] = [];

    public async getList() {
      const data: ResVersionPlatform | null = await this.$post(Apis.VERSION_PLATFORM, {
        version: this.version,
        startTime: this.dateRange[0],
        endTime: getDayEndStamp(this.dateRange[1]), // todo 外部computed
      });
      if (data) {
        this.list = data.platformMap;
      }
    }

    @Watch('version')
    public onVersion() {
      this.getList();
    }

    @Watch('dateRange')
    public onDateRange() {
      this.getList();
    }

    public created() {
      this.getList();
    }
  }
</script>

<style scoped>
  .version_platform {
    padding: 20px 0;
  }

  .table-platform {
    color: var(--theme-color);
  }

  .title {
    line-height: 60px;
    padding-left: 20px;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
</style>
