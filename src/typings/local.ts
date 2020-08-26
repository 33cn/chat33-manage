/**
 * @name 项目内部通用类型声明
 * @author yuanzeyu
 * @date 2019-04-16
 */

export interface Series {
  name: string;
  type: 'line';
  data: number[];
}

export interface OptionItem {
  label: string;
  id: string;
  value: any;
}
