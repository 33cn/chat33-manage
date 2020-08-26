<template>
  <div class="all_table">
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick"
      @sort-change="handleChangeSort">
      <el-table-column
        label="版本">
        <template v-slot="{row}">
          <span class="g-table-btn">{{row.version}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="170"
        prop="total"
        sortable="custom"
        label="截至今日版本累计用户(%)">
        <template v-slot="{row}">
          <span>{{row.total}}({{row.totalPercent | format-percent}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="new"
        sortable="custom"
        label="新增用户">
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="active"
        sortable="custom"
        label="活跃用户(新用户占比)">
        <template v-slot="{row}">
          <span>{{row.active}}({{row.activeNewPercent | format-percent}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="open"
        sortable="custom"
        label="启动次数">
      </el-table-column>
      <el-table-column
        prop="update"
        sortable="custom"
        label="升级用户">
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
  import {Apis} from '@/config/Apis';
  import {SortType, VersionAllTableItem} from '@/typings/interfaces';
  import PagedTable from '@/mixins/PagedTable';
  import {mixins} from 'vue-class-component';

  /**
   * @name 版本分布-全部版本数据表格
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component
  export default class AllTable extends mixins(PagedTable) {
    @Prop() public dateRange!: number[];
    @Prop() public sortParam!: any; // sync

    public list: VersionAllTableItem[] = [];
    public loadOptions: any = {
      loadApi: Apis.VERSION_ALL_TABLE,
      count: 8,
      otherParam: () => {
        return {
          sortTarget: this.sortParam.sortTarget,
          sortRule: this.sortParam.sortRule,
        };
      },
    };

    public handleChangeSort = ({prop, order}: any) => {
      this.updateParam(prop, order);
      this.$nextTick(() => {
        this.reloadList();
      });
    };

    @Watch('dateRange')
    public onSearch() {
      this.reloadList();
    }

    public created() {
      this.reloadList();
    }

    private updateParam(prop: any, order: any) {
      this.$emit('update:sortParam', {
        sortTarget: prop || '',
        sortRule: order === 'descending' ? SortType.Des : SortType.Asc,
      });
    }
  }
</script>

<style scoped>
  .all_table {
    padding-bottom: 20px;
  }
</style>
