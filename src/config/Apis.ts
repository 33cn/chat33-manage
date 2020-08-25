/**
 * @name 后端接口配置
 * @author yuanzeyu
 * @date 2019-04-16
 */

export enum Apis {
  MANAGER_ACCOUNT = '/manage/manage/account',
  LATEST_COUNT = '/manage/manage/latestData',
  DOWNLOAD_EXCEL = '/manage/manage/downloadExcel',
  SUM_CHART = '/manage/manage/sumChart',
  SUM_DETAILS = '/manage/manage/sumDetails',
  MANAGER_LOGIN = '/manage/manage/login',
  SUM_PLATFORM_DATA = '/manage/manage/platform',
  SUM_EXPORT = '/manage/manage/sum/export',
  VERSION_LIST = '/manage/manage/version/versions',
  VERSION_CHART_DATA = '/manage/manage/version/chart',
  VERSION_ALL_TABLE = '/manage/manage/version/detailAll',
  VERSION_SINGLE_TABLE = '/manage/manage/version/detailVersion',
  VERSION_PLATFORM = '/manage/manage/version/platform',
  VERSION_EXPORT_ALL = '/manage/manage/version/exportAll',
  VERSION_EXPORT_VERSION = '/manage/manage/version/export',
  USER_COUNT = '/manage/manage/user/count',
  USER_LIST = '/manage/manage/user/list',
  USER_BAN = '/manage/manage/user/ban',
  GROUP_BAN = '/manage/manage/room/ban',
  USER_CANCEL_BAN = '/manage/manage/user/cancelBan',
  GROUP_CANCEL_BAN = '/manage/manage/room/cancelBan',
  GROUP_COUNT = '/manage/manage/room/count',
  GROUP_SET = '/manage/manage/room/setLimit',
  GROUP_LIST = '/manage/manage/room/list',
  GET_GROUP_SET = '/manage/manage/room/getLimit',
  MANAGE_LOG = '/manage/manage/log',
  AD_LIST = '/manage/manage/startPage/getAll',
  ADD_AD = '/manage/manage/startPage/create',
  UPLOAD_FILE = '/manage/manage/startPage/upload',
  EDIT_AD_NAME = '/manage/manage/startPage/setName',
  DELETE_AD = '/manage/manage/startPage/delete',
  ACTIVE_AD = '/manage/manage/startPage/active',
  FUNDS_COIN = '/manage/manage/reward/coin-support', // 支持的币种
  FUNDS_COUNT = '/manage/manage/reward/statistics', // 资金统计数字
  FUNDS_GROUP_COUNT = '/manage/manage/red-packet/fee-statistics', // 群红包手续费统计
  FUNDS_GET_SET = '/manage/manage/reward/get-config', // 获取奖励配置
  FUNDS_SET = '/manage/manage/reward/set-config', // 设置奖励配置
  INVITE_LIST = '/manage/manage/reward/list', // 单/叠加邀请列表
  GET_GROUP_CHARGE = '/manage/manage/red-packet/fee-config', // 获取群红包手续费设置
  SET_GROUP_CHARGE = '/manage/manage/red-packet/set-fee', // 设置群红包手续费设置
  RECOMMEND_SET = '/manage/manage/room/setRecommend',

  AUTH_FEE_STATISTICS = '/manage/manage/verification/fee-statistics', // 获取累计手续费
  PERSONAL_VERT_LIST = '/manage/manage/verification/personal-list', // 个人认证申请列表
  CHAT_GROUP_VERT_LIST = '/manage/manage/verification/group-list', // 群聊认证申请列表
  GET_AUTH_FEE_LIMIT = '/manage/manage/verification/fee-config', // 获取需要认证的条件
  SET_AUTH_FEE_LIMIT = '/manage/manage/verification/set-fee', // 设置需要认证的条件
}
