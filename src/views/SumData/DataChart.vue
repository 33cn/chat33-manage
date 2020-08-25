<template>
  <div class="data-chart">
    <div class="top_wrapper">
    <tab v-model="selectTab" :options="typeOptions" @select="doSearch"/>
    <date-range-wrap class="date" v-model="dateRange" @change="doSearch"/>
    <common-tip class="l-tip" :tipInfo="tipInfo"/>
    <div class="chart_box" ref="chartDom"></div>
    </div>
    <detail-collapse :show.sync="isShowDetail" :exportApi="Apis.SUM_EXPORT" :dateRange="dateRange">
      <data-table :dateRange="dateRange"/>
    </detail-collapse>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {getThisMonth, getRangeDate, formatDate, getDayEndStamp} from '../../utils/tool';
  import echarts from 'echarts/lib/echarts';
  import Tab from '@/components/Tab.vue';
  import DataTable from './DataTable.vue';
  import {ResSumChart, SumChartType} from '@/typings/interfaces';
  import {Apis} from '@/config/Apis';
  import DetailCollapse from '@/components/DetailCollapse.vue';
  import CommonTip from '@/components/CommonTip.vue';
  import DateRangeWrap from '@/components/DateRangeWrap.vue';
  import {handleChartResize} from '@/utils/app';

  /**
   * @name 新增用户等信息折线图展示
   * @author yuanzeyu
   * @date 2019-04-15
   */
  @Component({
    components: {
      Tab,
      DataTable,
      DetailCollapse,
      CommonTip,
      DateRangeWrap,
    },
  })
  export default class DataChart extends Vue {
    public selectTab: SumChartType = SumChartType.New;
    public dateRange: number[] = [];
    public chartData: number[] = []; // 仅支持单选
    public typeOptions = [
      {
        label: '新增用户',
        value: SumChartType.New,
      }, {
        label: '活跃用户',
        value: SumChartType.Active,
      }, {
        label: '启动次数',
        value: SumChartType.Open,
      }, {
        label: '累计用户',
        value: SumChartType.Total,
      }
    ];
    public isShowDetail: boolean = false;
    public tipInfo: any = {
      title: '展示了应用的汇总数据。',
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
          title: '累计用户',
          tip: '截止到现在，启动过应用的所有注册用户',
        },
      ],
    };
    public Apis = Apis;


    /**
     * 请求数据并显示折线图
     */
    public async getChartData() {
      const param = {
        types: [this.selectTab],
        startTime: this.dateRange[0],
        endTime: getDayEndStamp(this.dateRange[1]),
      };
      const data: ResSumChart | null = await this.$post(Apis.SUM_CHART, param);
      if (data) {
        this.chartData = data.dataMap[0].data;
        this.initChart();
      }
    }

    public doSearch() {
      this.chartData = [];
      this.getChartData();
    }

    /**
     * 设置默认最近30天
     */
    public setDefaultDate() {
      this.dateRange = getThisMonth();
    }

    public mounted() {
      this.setDefaultDate();
      this.getChartData();
    }

    public beforeDestroy() {
      let chart = (echarts as any).getInstanceByDom(this.$refs.chartDom);
      if (chart) {
        (echarts as any).dispose(chart);
      }
    }

    /**
     * 加载折线图
     */
    private initChart(): void {
      let chart = (echarts as any).getInstanceByDom(this.$refs.chartDom);
      if (!chart) {
        chart = (echarts as any).init(this.$refs.chartDom, 'light');
      }
      const dates = getRangeDate(this.dateRange).map((item) => {
        return formatDate(item);
      });
      const legend = (this.typeOptions.find((item) => item.value === this.selectTab) as any).label;
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [legend],
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
        series: [
          {
            name: legend,
            type: 'line',
            data: this.chartData,
            itemStyle: {
              normal: {
                color: '#32B2F7',
                lineStyle: {
                  color: '#32B2F7',
                },
              },
            },
          },
        ]
      };
      chart.setOption(options, true);
      handleChartResize(this.$refs.chartDom); // 内存溢出?
    }
  }
</script>

<style scoped>
  .data-chart {
    background: #fff;
  }

  .top_wrapper {
    padding: 15px 20px 20px 20px;
  }

  .date {
    float: right;
  }

  .chart_box {
    height: 280px;
    width: 100%;
  }

  .l-tip {
    margin-left: 11px;
    line-height: 30px;
  }
</style>
