import axios from 'axios';
import {Platform} from '@/config/platform';
import NotifyPop from '@/plugins/NotifyPop';

type OnFail = ((val: any) => void) | null;

async function post(url: string, params = {}, headers = {}, config = {}, onFail: OnFail = null) {
  try {
    const res = await axios.post(url, params, { // http://rap2api.taobao.org/app/mock/165475/post
      headers: {
        'FZM-APP-ID': Platform.appId,
        ...headers,
      },
      ...config,
    });
    if (res.data.result === 0) {
      return res.data.data || 'success'; // success用于站位，有些接口操作成功返回data为null
    } else {
      // 接口返回结果异常（业务异常）
      if (onFail) {
        onFail(res.data);
      } else {
        NotifyPop.fail(res.data.message);
      }
      return null;
    }
  } catch (e) {
    if (axios.isCancel(e)) { // 主动取消
      return null;
    }
    // 网络异常
    if (onFail) {
      onFail(e);
    } else {
      NotifyPop.fail(`${e.response.status} ${e.response.statusText}`);
    }
    return null;
  }
}



export {
  post,
};
export default {
  install(Vue: any, postName: string = '$post', getName: string = '$get') {
    Object.defineProperty(Vue.prototype, postName, {value: post});
  }
};
