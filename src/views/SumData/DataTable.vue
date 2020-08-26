<template>
  <div class="data_table">
    <el-table
      :data="list"
      v-loading="loading"
      class="g-table g-table_thick">
      <el-table-column
        prop="datetime"
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
        prop="active"
        label="活跃用户">
      </el-table-column>
      <el-table-column
        prop="open"
        label="启动次数">
      </el-table-column>
      <el-table-column
        prop="total"
        label="累计用户">
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
  import {SumDetailItem} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import PagedTable from '@/mixins/PagedTable';
  import {mixins} from 'vue-class-component';

  /**
   * @name 数据表格
   * @author yuanzeyu
   * @date 2019-04-15
   * @desc 折线图下方
   */
  @Component
  export default class DataTable extends mixins(PagedTable) {
    @Prop() public dateRange!: number[];
    public list: SumDetailItem[] = [];
    public loadOptions: any = {
      loadApi: Apis.SUM_DETAILS,
      count: 8,
    };

    @Watch('dateRange')
    public onSearch() {
      this.reloadList();
    }

    public created() {
      this.reloadList();
    }
  }
</script>

<style scoped>
  .data_table {
    padding-bottom: 20px;
  }


</style>
