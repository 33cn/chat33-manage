import Vue from 'vue';


interface ObjectParam {
  text: string;
  isUnique?: boolean; // 用于网络异常，同时仅显示一个
  onClose?: () => void;
  time?: number; // 持续时间
}

interface Notify {
  success: (param: string | ObjectParam) => void;
  fail: (param: string | ObjectParam) => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $post: (url: string, params?: any, headers?: any, config?: any, onWrong?: any) => Promise<any>;
    $chatNotify: Notify;
  }
}
