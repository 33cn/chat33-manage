<template>
  <div id="version_data" class="version_data">
    <div class="top_wrapper">
      <h2 class="title">版本TOP5</h2>
      <div class="form_wrapper">
        <!-- 更新表单 ui -->
        <tab class="form-type" v-model="selectType" :options="typeOptions" @select="getChartData"/>
        <common-tip class="l-tip" :tipInfo="tipInfo"/>
        <div class="form-right_wrapper">
          <el-select class="g-select form-version" v-model="version" placeholder="请选择" @change="getChartData">
            <el-option
              v-for="item in versionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <date-range-wrap v-model="dateRange" @change="getChartData"/>
        </div>
      </div>
      <div ref="versionChatDom" class="chart_box"></div>
    </div>
    <detail-collapse v-if="version==='all'"
                     :show.sync="isShow"
                     :sortParam="sortParam"
                     :exportApi="Apis.VERSION_EXPORT_ALL"
                     :dateRange="dateRange">
      <all-table :sortParam.sync="sortParam" :dateRange="dateRange"/>
    </detail-collapse>
    <detail-collapse v-else :show.sync="isShow" :exportApi="Apis.VERSION_EXPORT_VERSION" :dateRange="dateRange"
                     :version="version">
      <version-table :dateRange="dateRange" :version="version"/>
      <version-platform :dateRange="dateRange" :version="version"/>
    </detail-collapse>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import echarts from 'echarts/lib/echarts';
  import AllTable from '@/views/VersionData/AllTable.vue';
  import VersionTable from '@/views/VersionData/VersionTable.vue';
  import Tab from '@/components/Tab.vue';
  import {Apis} from '@/config/Apis';
  import {ResVersionChartData, ResVersionList, SortType, VersionDataType} from '@/typings/interfaces';
  import {formatDate, getDayEndStamp, getRangeDate, getThisMonth} from '@/utils/tool';
  import {Series} from '@/typings/local';
  import DetailCollapse from '@/components/DetailCollapse.vue';
  import VersionPlatform from '@/views/VersionData/VersionPlatform.vue';
  import CommonTip from '@/components/CommonTip.vue';
  import DateRangeWrap from '@/components/DateRangeWrap.vue';
  import {handleChartResize} from '@/utils/app';


  /**
   * @name 版本分布页
   * @author yuanzeyu
   * @date 2019-04-16
   */
  @Component({
    components: {
      Tab,
      AllTable,
      VersionTable,
      DetailCollapse,
      VersionPlatform,
      CommonTip,
      DateRangeWrap,
    },
  })
  export default class VersionData extends Vue {
    public selectType: VersionDataType = VersionDataType.New;
    public typeOptions = [
      {
        label: '新增用户',
        value: VersionDataType.New,
      },
      {
        label: '活跃用户',
        value: VersionDataType.Active,
      },
      {
        label: '启动次数',
        value: VersionDataType.Open,
      }
    ];
    public versions: string[] = [];
    public dateRange: number[] = [];
    public version: string = 'all';
    public versionOptions = [
      {
        label: '全部版本',
        value: 'all'
      }
    ];
    public isShow: boolean = false;
    public pickerOptions = {
      disabledDate(time: any) {
        return time.getTime() > Date.now();
      },
    };
    public tipInfo: any = {
      title: '趋势图展示累计用户排名Top5版本的变化趋势',
      tips: [
        {
          title: '新增用户',
          tip: '新注册的用户',
        },
        {
          title: '活跃用户',
          tip: '启动过应用的用户（去重），每日启动过两次的用户即视为活跃用户，包括新用户与老用户',
        },
        {
          title: '启动次数',
          tip: '打开应用且为登录状态视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动。',
        },
        {
          title: '版本累计用户（%）',
          tip: '截止到现在，该版本的累计用户（占累计用户全体的比例）；若该版本的用户升级到其他版本，则累计用户会减少',
        },
        {
          title: '升级用户',
          tip: '从其他版本升级到该版本的用户（以设备为判断标准）'
        }
      ],
      bottom: '如果当日用户先启动老版本然后升级到新版本，分版本查看数据时，此用户在新老版本都会被算为活跃用户（按总体查看数据时不受影响）'
    };
    public Apis = Apis;
    public sortParam: any = {
      sortTarget: '',
      sortRule: SortType.Asc,
    }; // todo 新增加导出关联排序 移出外部请求

    public async getVersionList() {
      const data: ResVersionList | null = await this.$post(Apis.VERSION_LIST);
      if (data) {
        const options = data.list.map((item) => {
          return {
            label: item,
            value: item
          };
        });
        this.versions = data.list;
        this.versionOptions = this.versionOptions.concat(options);
      }
    }

    public async getChartData() {
      const params = {
        types: [this.selectType],
        versions: this.version === 'all' ? this.versions : [this.version],
        startTime: this.dateRange[0],
        endTime: getDayEndStamp(this.dateRange[1]),
      };
      const data: ResVersionChartData | null = await this.$post(Apis.VERSION_CHART_DATA, params);
      if (data) {
        this.initChart(data);
      }
    }

    public initChart(data: ResVersionChartData): void {
      if (!this.$refs.versionChatDom) {
        return;
      }
      let chart = (echarts as any).getInstanceByDom(this.$refs.versionChatDom);
      if (!chart) {
        chart = (echarts as any).init(this.$refs.versionChatDom, 'light');
      }
      const dates = getRangeDate(this.dateRange).map((item) => formatDate(item));
      const series = this.getSeries(data);
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: series.map((item) => item.name),
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates,
        },
        yAxis: {
          type: 'value',
        },
        series
      };
      chart.setOption(options, true);
      handleChartResize(this.$refs.versionChatDom);
    }

    public getSeries(data: ResVersionChartData): Series[] {
      const result: Series[] = [];
      data.typeMap.forEach((item) => {
        const type = this.typeOptions.find((option) => option.value === item.type); // 新增用户
        if (!type) {
          throw new Error('接口type错误');
        }
        const typeLabel = type.label;
        item.versionMap.forEach((version) => {
          const legend: string = `${version.version}版本 ${typeLabel}`;
          result.push({
            name: legend,
            type: 'line',
            data: version.data,
          });
        });
      });
      return result;
    }

    /**
     * 设置默认最近30天
     */
    public setDefaultDate() {
      this.dateRange = getThisMonth();
    }

    public beforeDestroy() {
      let chart = (echarts as any).getInstanceByDom(this.$refs.versionChatDom);
      if (chart) {
        (echarts as any).dispose(chart);
      }
    }

    public async created() {
      this.setDefaultDate();
      this.isShow = true;
      await this.getVersionList();
      await this.getChartData();
    }
  }
</script>

<style scoped>
  .version_data {
    background: #fff;
  }

  .top_wrapper {
    padding: 0 20px 20px 20px;
  }

  .title {
    line-height: 60px;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  .form_wrapper {
    margin: 15px 0;
    height: 30px;
    line-height: 30px;
    font-size: 0;
  }

  .form-right_wrapper {
    float: right;
    height: 30px;
  }

  .form-version {
    margin-right: 10px;
  }

  .chart_box {
    height: 280px;
  }

  .l-tip {
    margin-left: 10px;
  }
</style>
