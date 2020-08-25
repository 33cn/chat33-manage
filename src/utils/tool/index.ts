/**
 * @name 工具方法
 * @author yuanzeyu
 * @date 2019-04-15
 */

/**
 * @desc 获取最近30天开始结束时间戳
 * @example [30天前stamp，今天stamp]
 */
export function getThisMonth(): number[] {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const todayStamp = new Date(year, month, day).getTime();
  const SEVEN_DAY = 29 * 24 * 60 * 60 * 1000;
  const agoStamp = new Date(todayStamp - SEVEN_DAY).getTime();
  return [agoStamp, todayStamp];
}

/**
 * @desc 根据时间范围获取所含日期序列
 * @example [stamp, stamp] => [stamp,stamp,stamp,stamp,stamp]
 */
export function getRangeDate(range: number[]): number[] {
  const DAY = 24 * 60 * 60 * 1000;
  const result: any[] = [];
  const endStamp: number = range[1];
  let flag: number = range[0];
  while (flag <= endStamp) {
    result.push(flag);
    flag += DAY;
  }
  return result;
}

export function formatDate(timestamp: number, isTime: boolean = false, showSecond: boolean = false) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let result = `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;
  if (isTime) {
    const hour = date.getHours();
    const min = date.getMinutes();
    result += ` ${hour > 9 ? '' : 0}${hour}:${min > 9 ? '' : 0}${min}`;
    if (showSecond) {
      const second = date.getSeconds();
      result += `:${second > 9 ? '' : 0}${second}`;
    }
  }
  return result;
}

/**
 * 获取倒计时00:00:00
 */
export function formatCount(timestamp: number): string {
  const HOUR = 60 * 60 * 1000;
  const MIN = 60 * 1000;
  const hourCount = Math.floor(timestamp / HOUR);
  const minCount = Math.floor(timestamp % HOUR / MIN);
  const secCount = Math.floor(timestamp % HOUR % MIN / 1000);
  return `${getLabel(hourCount)}:${getLabel(minCount)}:${getLabel(secCount)}`;
}

function getLabel(count: number): string {
  if (count > 9) {
    return `${count}`;
  } else if (count > 0) {
    return `0${count}`;
  }
  return '00';
}

/**
 * 获取日期开始时间戳对应的当天结束时间（第二天零点 - 1秒 @dld）
 * @param beginStamp
 */
export function getDayEndStamp(beginStamp: number): number {
  return beginStamp + 24 * 60 * 60 * 1000 - 1000;
}

/**
 * 将输入的字符串转为正数
 * @param num
 */
export function numberCheck(num: string): string {
  let str = num;
  const len1 = str.substr(0, 1);
  const len2 = str.substr(1, 1);
  // 如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 === '0' && len2 !== '.') {
    str = str.substr(1, 1);
  }
  // 第一位不能是.
  if (len1 === '.') {
    str = '';
  }
  // 限制只能输入一个小数点
  if (str.indexOf('.') !== -1) {
    const myStr = str.substr(str.indexOf('.') + 1);
    if (myStr.indexOf('.') !== -1) {
      str = str.substr(0, str.indexOf('.') + myStr.indexOf('.') + 1);
    }
  }
  // 正则替换，保留数字和小数点
  str = str.replace(/[^\d^\.]+/g, '');
  // 如果需要保留小数点后两位，则用下面公式
  // str = str.replace(/\.\d\d$/, '');
  if (str.length === 0) {
    str = '0';
  }
  return str;
}
