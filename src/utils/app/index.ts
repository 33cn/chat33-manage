/**
 * 业务通用代码
 * @author yuanzeyu
 * @date 2019-04-29
 * @desc
 */
import echarts from 'echarts/lib/echarts';

/**
 * 窗口调整后调整折线图大小 todo 优化
 */
export function handleChartResize(dom: any) {
  let timer: any = 0;
  window.onresize = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => {
      if (!dom) {
        return;
      }
      const chart = (echarts as any).getInstanceByDom(dom);
      if (chart) {
        (chart as any).resize();
      }
    }, 500);
  };
}
