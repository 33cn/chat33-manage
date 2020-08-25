<template>
  <div>
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick">
      <el-table-column
        label="时间">
        <template v-slot="{row}">
          {{row.datetime | format-date}}
        </template>
      </el-table-column>
      <el-table-column
        prop="new"
        label="新增用户">
      </el-table-column>
      <el-table-column
        min-width="150"
        label="活跃用户(新用户占比)">
        <template v-slot="{row}">
          <span>{{row.active}}({{row.activeNewPercent | format-percent}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="open"
        label="启动次数">
      </el-table-column>
    </el-table>
    <el-pagination
      class="g-pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="doLoadList"
      :page-size="8"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import {
    VersionSingleTableItem
  } from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import PagedTable from '@/mixins/PagedTable';
  import {mixins} from 'vue-class-component';

  /**
   * @name 版本分布-单个版本数据表格
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component
  export default class VersionTable extends mixins(PagedTable) {
    @Prop() public dateRange!: number[];
    @Prop() public version!: string;

    public list: VersionSingleTableItem[] = [];
    public loadOptions: any = {
      loadApi: Apis.VERSION_SINGLE_TABLE,
      count: 8,
      otherParam: () => {
        return {
          version: this.version,
        };
      }
    };

    @Watch('dateRange')
    public onSearch() {
      this.reloadList();
    }

    @Watch('version')
    public onChangeVersion() {
      this.reloadList();
    }

    public created() {
      this.reloadList();
    }
  }
</script>

<style scoped>
</style>
