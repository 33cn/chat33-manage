/**
 * @name 接口数据格式声明
 * @author yuanzeyu
 * @date 2019-04-15
 */

/**
 * 接口返回基本格式
 */
export interface DataBase {
  result: number;
  message: string;
  data: any;
}

export enum Bool {
  No,
  Yes,
}

/**
 * 分页返回基本格式
 */
export interface ResPageBase {
  total: number;
  list: any[];
}

export interface SumCounts {
  new: number;
  active: number;
  open: number;
  total: number;
}

/**
 * @desc 汇总数据-近期数据
 * @api LATEST_COUNT
 */
export interface ResLatestCount {
  today: SumCounts;
  yesterday: SumCounts;
}

export enum SumChartType {
  New,
  Active,
  Open,
  Total,
}

export interface ChartDataItem {
  type: SumChartType;
  data: number[];
}

/**
 * @desc 汇总数据-表格数据
 * @api SUM_CHART
 */
export interface ResSumChart {
  dataMap: ChartDataItem[];
}


export interface SumDetailItem {
  datetime: number;
  new: number;
  active: number;
  open: number;
  total: number;
}

/**
 * @desc 汇总数据-明细数据
 * @api SUM_DETAILS
 */
export interface ResSumDetails extends ResPageBase {
  list: SumDetailItem[];
}

export interface PlatformItem {
  platform: string;
  todayNew: number;
  yesterdayNew: number;
  todayActive: number;
  yesterdayActive: number;
  todayOpen: number;
  yesterdayOpen: number;
  todayTotal: number;
}

/**
 * @desc 汇总数据-查询平台列表
 * api: /manage/platform
 */
export interface ResPlatformData {
  list: PlatformItem[];
}

export enum SortType {
  Asc,
  Des,
}

/**
 * @desc 版本分布-查询全部版本枚举
 * @api: VERSION_LIST
 */
export interface ResVersionList {
  list: string[];
}

export enum VersionDataType {
  New,
  Active,
  Open,
}

export interface VersionDataItem {
  version: string;
  data: number[];
}

export interface VersionTypeItem {
  type: VersionDataType;
  versionMap: VersionDataItem[];
}

/**
 * @desc 版本分布-折线图数据
 * @api VERSION_CHART_DATA
 */
export interface ResVersionChartData {
  typeMap: VersionTypeItem[];
}

export interface VersionAllTableItem { // 全部版本时的数据项
  datetime: string;
  new: number;
  active: number;
  activeNewPercent: number;
  open: number;
  update: number;
}

/**
 * @desc 全部版本时的明细数据
 * @api VERSION_ALL_TABLE
 */
export interface ResVersionAllTable extends ResPageBase {
  list: VersionAllTableItem[];
}

export interface VersionSingleTableItem { // 全部版本时的数据项
  version: string;
  total: number;
  totalPercent: number;
  new: number;
  active: number;
  activeNewPercent: number;
  open: number;
}

/**
 * @desc 单个版本时的明细数据
 * @api VERSION_SINGLE_TABLE
 */
export interface ResVersionSingleTable extends ResPageBase {
  list: VersionSingleTableItem[];
}

export interface VersionPlatformItem {
  platformId: string;
  platformName: string;
  new: number;
  active: number;
  activeNewPercent: number;
  open: number;
}

/**
 * @desc 单个版本时的明细数据
 * @api VERSION_PLATFORM
 */
export interface ResVersionPlatform {
  platformMap: VersionPlatformItem[];
}

/**
 * @desc 用户管理用户统计
 * @api USER_COUNT
 */
export interface ResUserCount {
  totalUser: number;
  totalRoom: number;
  banUser: number;
  banRoom: number;
}

export interface UserItem {
  id: string;
  uid: string;
  createTime: number;
  account: string;
  roomCreatedCount: number;
  // roomBanedCount: number;
  banTimes: number;
  banStartTime: number;
  banEndTime: number;
  reason: string;
}

export enum UserStatus {
  Normal,
  BanUser,
  // BanGroup,
}

/**
 * @desc 查询用户列表
 * @api USER_LIST
 */
export interface ResUserList extends ResPageBase {
  list: UserItem[];
}

/**
 * @desc 封号/封群接口参数
 * @api USER_BAN GROUP_BAN
 */
export interface ParamTargetBan {
  id: string;
  reason: string;
  startTime: number;
  endTime: number;
}

/**
 * @desc 群数量统计
 * @api GROUP_COUNT
 */
export interface ResGroupCount {
  total: number;
  ban: number;
}

/**
 * @desc 群人数/数量限制设置
 * @api GROUP_SET
 */
export interface ParamGroupSet {
  memberLimit: number;
  roomCreateLimit: number;
}

export interface GroupItem {
  id: string;
  name: string;
  markId: string;
  owner: GroupOwner;
  memberCount: number;
  banTimes: number;
  banEndTime: number;
  banStartTime: number;
  reason: string;
  recommend: Bool;
}

export enum GroupStatus {
  Normal,
  Ban,
  Recommend,
}

/**
 * @desc 群列表
 * @api GROUP_LIST
 */
export interface ResGroupList extends ResPageBase {
  list: GroupItem[];
}

export interface GroupOwner {
  id: string;
  account: string;
  uid: string;
}

export enum LogType {
  BanUser,
  BanGroup,
  CancelBanUser,
  CancelBanGroup,
}

export interface UserLogInfo {
  id: string;
  uid: string;
  account: string;
}

export interface GroupLogInfo {
  id: string;
  markId: string;
  roomName: string;
}

export interface LogItem {
  datetime: number;
  type: LogType;
  targetInfo: UserLogInfo | GroupLogInfo;
  managerId?: string;
}

/**
 * @desc 管理记录
 * @api MANAGE_LOG
 */
export interface ResManageLog extends ResPageBase {
  list: LogItem[];
}

/**
 * 查询广告列表结果
 */
export interface ResAdList {
  list: AdItem[] | null;
}

/**
 * 添加广告参数
 */
export interface ParamAddAd {
  name: string;
  url: string;
  duration: number;
  link: string;
  isActive: Bool;
}

/**
 * 广告项
 */
export interface AdItem {
  id: string;
  name: string;
  duration: number;
  url: string;
  link: string;
  isActive: Bool;
}

export interface ResUploadFile {
  url: string;
}

/**
 * 编辑广告名称参数
 */
export interface ParamEditAdName {
  id: string;
  name: string;
}

export interface ParamDeleteAd {
  id: string;
}

export interface ParamActiveAd {
  id: string;
  isActive: Bool;
}


/**
 * 资金管理-查询设置
 */
export interface ResFundsGetSet {
  base: BaseSet;
  advance: AdvanceSet;
}

interface BaseSet {
  open: string; // 1/2
  isRewardForNoInviter: boolean;
  level: string;
  currency: string; // 奖励币种
  rewardForUser: string; // 被邀请者奖励
  rewardForInviter: string[]; // 邀请人奖励（只需第一个）
}

interface AdvanceSet {
  open: string;
  currency: string;
  reachNum: string; // 邀请人数
  rewardForNum: string; // 邀请人数奖励
}

/**
 * 资金管理-提交设置
 */
export interface ParamFundsSet {
  baseCurrency: string;
  baseOpen: number;
  rewardForUser: number;
  rewardForInviter: number[];
  advanceCurrency: string;
  advanceOpen: number;
  reachNum: number;
  rewardForNum: number;
}

/**
 * 资金管理-币种管理
 */
export interface ResFundCoin {
  coins: string[];
}

/**
 * 资金管理-数字统计
 */
export interface ResFundsCount {
  statistics: CountItem[];
}

/**
 * 资金管理-统计数字项
 */
export interface CountItem {
  total: string;
  currency: string;
}

/**
 * 资金管理-数字统计
 */
export interface ResFundsGroupCount {
  statistics: CountGroupItem[];
}

/**
 * 资金管理-统计数字项
 */
export interface CountGroupItem {
  amount: string;
  currency: string;
}

/**
 * 资金管理-邀请奖励名单
 */
export interface ResInviteList {
  list: InviteItem[];
  count: string;
}

/**
 * 邀请奖励名单项
 */
export interface InviteItem { // 按照接口实现声明（文档大量错误）
  typeName: string;
  uid: number;
  from: number; // 邀请人uid
  mobile: string;
  currency: string; // 币种
  amount: string; // 奖励数量
  level: number;
  updated_at: string;
  num: string; // 邀请的是多少人
}

export interface ResGetGroupCharge {
  config: GroupChargeItem[];
}

export interface GroupChargeItem {
  currency: string;
  amount: string;
}

export interface certificatialItem {
  id: string;
  uid: string;
  account: string; // 群号或用户账号
  name: string; //名称
  avatar: string; // 头像
  currency: string; // 币种
  amount: string; //金额
  state: number; //审核状态
  description: string; //说明
  coinState: number; //入帐状态
  time: string; //更新时间
}