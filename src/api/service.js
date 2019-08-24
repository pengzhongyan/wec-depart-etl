/* eslint-disable */
/**
 * 本文件由工具自动生成，请勿随意改动！！！
 * @name Devops ETL API
 * @description 文档中下拉选项  是--1  否--0
 * @tutorial public/wec-depart-etl.yaml
 */
import api from "@api/api";
import http from "@utils/ajax";
import { awaitWrap } from "@utils";

/**
 * 获取同步任务(校端)
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 * @param { String } params['type'] 1代表上行2代表下行
 * @param { Integer } params['pageNumber'] 分页页码
 * @param { Integer } params['pageSize'] 分页大小
 */
export const queryEtlTasksBySchoolId = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_queryetltasksbyschoolid, params));
};

/**
 * 获取同步任务信息根据wid(校端)
 * @param { Object } params 请求参数
 * @param { String } params['wid']
 */
export const queryEtlTasksByWid = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_queryetltasksbywid, params));
};

/**
 * 增加或修改同步任务
 * @param { Object } params 请求参数
 * @param { String } params['wid']
 * @param { String } params['name'] 任务名称
 * @param { String } params['tableWid'] 元数据表wid
 * @param { String } params['tableName'] 元数据表名称
 * @param { String } params['grjyTime'] 个人交易时间
 * @param { String } params['compareTable'] 对比表名称
 * @param { String } params['syncDirection'] 同步任务方向
 * @param { String } params['schoolId'] 学校id
 * @param { String } params['schoolName'] 学校名称
 * @param { String } params['schoolCompareDatesource'] 私有云标准库
 * @param { String } params['schoolBusinessDatasource'] 私有云业务库
 * @param { String } params['cloudCompareDatasource'] 公有云标准库
 * @param { String } params['cloudBusinessDatasource'] 公有云业务库
 * @param { String } params['schoolCompareDatesourceId'] 私有云标准库id
 * @param { String } params['schoolBusinessDatasourceId'] 私有云业务库id
 * @param { String } params['cloudCompareDatasourceId'] 公有云标准库id
 * @param { String } params['cloudBusinessDatasourceId'] 公有云业务库id
 * @param { String } params['schoolSql'] 转换SQL
 * @param { Integer } params['schoolScheduleRepeat'] 私有云重复调度
 * @param { String } params['schoolScheduleType'] 私有云调度类型
 * @param { String } params['schoolScheduleDayInMonth'] 私有云调度日期
 * @param { String } params['schoolScheduleWeek'] 私有云调度星期
 * @param { String } params['schoolScheduleHour'] 私有云调度小时
 * @param { String } params['schoolScheduleMinute'] 私有云调度分钟
 * @param { String } params['schoolScheduleSecond'] 私有云调度秒
 * @param { Integer } params['cloudScheduleRepeat'] 公有云重复调度
 * @param { String } params['cloudScheduleType'] 公有云调度类型
 * @param { String } params['cloudScheduleDayInMonth'] 公有云调度日期
 * @param { String } params['cloudScheduleWeek'] 公有云调度星期
 * @param { String } params['cloudScheduleHour'] 公有云调度小时
 * @param { String } params['cloudScheduleMinute'] 公有云调度分钟
 * @param { String } params['cloudScheduleSecond'] 公有云调度秒
 * @param { String } params['school_policy_type'] 私有云执行策略(1按小时定时执行2按天定时执行3按周定时执行)
 * @param { String } params['school_policy_huor'] 私有云按小时执行
 * @param { String } params['school_policy_day'] 私有云按天执行
 * @param { String } params['school_policy_week'] 私有云按周定时执行(周数据集合)
 * @param { String } params['school_policy_week_day'] 私有云按周定时执行(时间数据)
 * @param { String } params['cloud_policy_type'] 公有云执行策略(1按小时定时执行2按天定时执行3按周定时执行)
 * @param { String } params['cloud_policy_huor'] 公有云按小时执行
 * @param { String } params['cloud_policy_day'] 公有云按天执行
 * @param { String } params['cloud_policy_week'] 公有云按周定时执行(周数据集合)
 * @param { String } params['cloud_policy_week_day'] 公有云按周定时执行(时间数据)
 * @param { String } params['source_table'] 源头表
 */
export const addOrUpdateSchoolEtlTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_addorupdateschooletltask, params));
};

/**
 * 删除同步任务
 * @param { Object } params 请求参数
 * @param { Array } params['wids']
 */
export const deleteEtlTaskSchool = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_deleteetltaskschool, params));
};

/**
 * 启动任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 * @param { String } params['type'] 1代表上行2代表下行
 * @param { String } params['taskWid'] 任务wid
 */
export const startTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_starttask, params));
};

/**
 * 启动任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 * @param { String } params['type'] 1代表上行2代表下行
 * @param { String } params['taskWid'] 任务wid
 */
export const stopTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltaskschool_stoptask, params));
};

/**
 * 获取同步任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 * @param { String } params['name'] 任务名称
 * @param { String } params['syncDirection'] 同步任务方向
 * @param { Integer } params['pageNumber'] 分页页码
 * @param { Integer } params['pageSize'] 分页大小
 */
export const queryEtlTasks = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_queryetltasks, params));
};

/**
 * 增加或修改同步任务
 * @param { Object } params 请求参数
 * @param { String } params['wid']
 * @param { String } params['name'] 任务名称
 * @param { String } params['tableWid'] 元数据表wid
 * @param { String } params['tableName'] 元数据表名称
 * @param { String } params['grjyTime'] 个人交易时间
 * @param { String } params['compareTable'] 对比表名称
 * @param { String } params['syncDirection'] 同步任务方向
 * @param { String } params['schoolId'] 学校id
 * @param { String } params['schoolName'] 学校名称
 * @param { String } params['schoolCompareDatesource'] 私有云标准库
 * @param { String } params['schoolBusinessDatasource'] 私有云业务库
 * @param { String } params['cloudCompareDatasource'] 公有云标准库
 * @param { String } params['cloudBusinessDatasource'] 公有云业务库
 * @param { String } params['schoolCompareDatesourceId'] 私有云标准库id
 * @param { String } params['schoolBusinessDatasourceId'] 私有云业务库id
 * @param { String } params['cloudCompareDatasourceId'] 公有云标准库id
 * @param { String } params['cloudBusinessDatasourceId'] 公有云业务库id
 * @param { String } params['schoolSql'] 转换SQL
 * @param { Integer } params['schoolScheduleRepeat'] 私有云重复调度
 * @param { String } params['schoolScheduleType'] 私有云调度类型
 * @param { String } params['schoolScheduleDayInMonth'] 私有云调度日期
 * @param { String } params['schoolScheduleWeek'] 私有云调度星期
 * @param { String } params['schoolScheduleHour'] 私有云调度小时
 * @param { String } params['schoolScheduleMinute'] 私有云调度分钟
 * @param { String } params['schoolScheduleSecond'] 私有云调度秒
 * @param { Integer } params['cloudScheduleRepeat'] 公有云重复调度
 * @param { String } params['cloudScheduleType'] 公有云调度类型
 * @param { String } params['cloudScheduleDayInMonth'] 公有云调度日期
 * @param { String } params['cloudScheduleWeek'] 公有云调度星期
 * @param { String } params['cloudScheduleHour'] 公有云调度小时
 * @param { String } params['cloudScheduleMinute'] 公有云调度分钟
 * @param { String } params['cloudScheduleSecond'] 公有云调度秒
 */
export const addOrUpdateEtlTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_addorupdateetltask, params));
};

/**
 * 删除同步任务
 * @param { Object } params 请求参数
 * @param { Array } params['wids']
 */
export const deleteEtlTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_deleteetltask, params));
};

/**
 * 下载同步任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId']
 */
export const downloadTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_downloadtask, params));
};

/**
 * 拉取文件状态
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 */
export const pollFileStatus = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_pollfilestatus, params));
};

/**
 * 下载已生成的同步任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 */
export const getGeneratedTaskFile = async params => {
    // send request
    return awaitWrap(http.get(api.etltask_getgeneratedtaskfile, params));
};

/**
 * 推送同步任务
 * @param { Object } params 请求参数
 * @param { String } params['schoolId']
 */
export const pushTask = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_pushtask, params));
};

/**
 * 获取SQL
 * @param { Object } params 请求参数
 * @param { String } params['schoolId'] 租户id
 * @param { String } params['tableName'] 表名
 * @param { String } params['tableWid'] 表id
 */
export const getTransSql = async params => {
    // send request
    return awaitWrap(http.post(api.etltask_gettranssql, params));
};

/**
 * 获取数据源
 * @param { Object } params 请求参数
 * @param { String } params['dataSourceName'] 数据源名称
 * @param { String } params['hostName'] 主机名称
 * @param { String } params['serverName'] 数据库名称
 * @param { String } params['category'] 数据源类型
 * @param { String } params['dbType'] 数据库类型
 * @param { Integer } params['isMultTenant'] 是否支持多租户
 * @param { String } params['schoolName'] 租户
 * @param { Integer } params['pageNumber'] 分页页码
 * @param { Integer } params['pageSize'] 分页大小
 */
export const queryEtlDataSources = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_queryetldatasources, params));
};

/**
 * 获取数据源
 * @param { Object } params 请求参数
 * @param { Integer } params['schoolId'] 租户id
 * @param { Integer } params['pageNumber'] 分页页码
 * @param { Integer } params['pageSize'] 分页大小
 */
export const queryEtlDataSourcesBySchoolId = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_queryetldatasourcesbyschoolid, params));
};

/**
 * 获取策略(改造)
 */
export const getTaskPocily = async params => {
    // send request
    return awaitWrap(http.post(api.select_gettaskpocily, params));
};

/**
 * 增加或修改数据源
 * @param { Object } params 请求参数
 * @param { String } params['wid']
 * @param { String } params['name'] 数据源名称
 * @param { String } params['category'] 数据源类型
 * @param { Integer } params['isMultTenant'] 是否支持多租户
 * @param { String } params['schoolId'] 学校id
 * @param { String } params['schoolName'] 学校名称
 * @param { String } params['dbType'] 数据库类型
 * @param { String } params['hostName'] 主机名称
 * @param { String } params['serverName'] 数据库名称
 * @param { String } params['schemaName'] 数据库schema
 * @param { String } params['userName'] 用户名
 * @param { String } params['password'] 密码
 * @param { String } params['port'] 端口
 */
export const addOrUpdateEtlDataSource = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_addorupdateetldatasource, params));
};

/**
 * 测试数据源连接
 * @param { Object } params 请求参数
 * @param { String } params['wid']
 * @param { String } params['name'] 数据源名称
 * @param { String } params['category'] 数据源类型
 * @param { Integer } params['isMultTenant'] 是否支持多租户
 * @param { String } params['schoolId'] 学校id
 * @param { String } params['schoolName'] 学校名称
 * @param { String } params['dbType'] 数据库类型
 * @param { String } params['hostName'] 主机名称
 * @param { String } params['serverName'] 数据库名称
 * @param { String } params['schemaName'] 数据库schema
 * @param { String } params['userName'] 用户名
 * @param { String } params['password'] 密码
 * @param { String } params['port'] 端口
 */
export const checkEtlDataSource = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_checketldatasource, params));
};

/**
 * 删除数据源
 * @param { Object } params 请求参数
 * @param { Array } params['wids']
 */
export const deleteEtlDataSource = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_deleteetldatasource, params));
};

/**
 * 获取数据库类型
 * @param { Array } params 请求参数
 */
export const getDbType = async params => {
    // send request
    return awaitWrap(http.post(api.select_dbtype, params));
};

/**
 * 获取主键类别
 * @param { Array } params 请求参数
 */
export const getPkType = async params => {
    // send request
    return awaitWrap(http.post(api.select_pktype, params));
};

/**
 * 获取元数据表名字
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['schoolId'] 租户Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlTableName = async params => {
    // send request
    return awaitWrap(http.post(api.select_etltablename, params));
};

/**
 * 获取私有云标准库
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['schoolId'] 租户Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEetlSchoolCompareDS = async params => {
    // send request
    return awaitWrap(http.post(api.select_etlschoolcompareds, params));
};

/**
 * 获取私有云业务库
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['schoolId'] 租户Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlSchoolBusinessDS = async params => {
    // send request
    return awaitWrap(http.post(api.select_etlschoolbusinessds, params));
};

/**
 * 获取公有云标准库
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['schoolId'] 租户Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlCloudCompareDS = async params => {
    // send request
    return awaitWrap(http.post(api.select_etlcloudcompareds, params));
};

/**
 * 获取公有云业务库
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['schoolId'] 租户Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlCloudBusinessDS = async params => {
    // send request
    return awaitWrap(http.post(api.select_etlcloudbusinessds, params));
};

/**
 * 获取数据源类型
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlDataSourceType = async params => {
    // send request
    return awaitWrap(http.post(api.select_etldatasourcetype, params));
};

/**
 * 获取数据源类型扩展--新增
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlDataSourceTypeExtend = async params => {
    // send request
    return awaitWrap(http.post(api.select_getetldDatasourcetypeextend, params));
};

/**
 * 通过数据源获取元数据表
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['dataSourceId'] 数据源Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const getEtlTableByDataSource = async params => {
    // send request
    return awaitWrap(http.post(api.select_etltablebydatasource, params));
};

/**
 * 测试连接
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['dataSourceId'] 数据源Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const etlCheckJdbcConnction = async params => {
    // send request
    return awaitWrap(http.post(api.select_etlcheckjdbcconnction, params));
};

/**
 * 获取数据源(改造)
 * @param { Object } params 请求参数
 * @param { Long } params['schoolId ']
 * @param { Integer } params['pageNumber'] 分页页码
 * @param { Integer } params['pageSize'] 分页大小
 */
export const queryExtendEtlDataSources = async params => {
    // send request
    return awaitWrap(http.post(api.etldatasource_queryextendetldatasources, params));
};

/**
 * 上移下移
 * @param { Object } params 请求参数
 * @param { Integer } params['oneWid']
 * @param { Integer } params['oneSort']
 * @param { Integer } params['twoWid']
 * @param { Integer } params['twoSort']
 */
export const updateEtlTableFieldSort = async params => {
    // send request
    return awaitWrap(http.post(api.etlfieldextend_updateetltablefieldsort, params));
};

/**
 * 获取租户分类属性
 * @param { Array } params 请求参数
 */
export const tenantBusType = async params => {
    // send request
    return awaitWrap(http.post(api.select_tenantbustype, params));
};

/**
 * 获取数据库类型(改造)
 * @param { Array } params 请求参数
 */
export const dbType = async params => {
    // send request
    return awaitWrap(http.post(api.select_dbtype, params));
};

/**
 * 获取目标表(上行改造)
 * @param { Array } params 请求参数
 */
export const getTenantBusTypeOn = async params => {
    // send request
    return awaitWrap(http.post(api.select_getTenantbustypeon, params));
};

/**
 * 获取源头表(下行改造)
 * @param { Array } params 请求参数
 */
export const getTenantBusTypeDown = async params => {
    // send request
    return awaitWrap(http.post(api.select_getTenantbustypedown, params));
};

/**
 * 通过数据源获取数据库类型
 * @param { Object } params 请求参数
 * @param { String } params['content'] 查询内容
 * @param { String } params['dataSourceId'] 数据源Id
 * @param { Integer } params['pageNumber']
 * @param { Integer } params['pageSize']
 */
export const dbTypeByDataSource = async params => {
    // send request
    return awaitWrap(http.post(api.select_dbtypebydatasource, params));
};
