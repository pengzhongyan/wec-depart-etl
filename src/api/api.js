/* eslint-disable */
/**
 * 本文件由工具自动生成，请勿随意改动！！！
 * @name Devops ETL API
 * @description 文档中下拉选项  是--1  否--0
 * @tutorial public/wec-depart-etl.yaml
 */
const DEV_MODE = process.env.NODE_ENV === "development";

const API_BASE = DEV_MODE ? "/wec-depart-etl" : "";

const _basePath = url => {
    return `${API_BASE}${url}`;
};

export default {
    etltaskschool_queryetltasksbyschoolid: _basePath("/etlTaskSchool/queryEtlTasksBySchoolId"), // 获取同步任务(校端)
    etltaskschool_queryetltasksbywid: _basePath("/etlTaskSchool/queryEtlTasksByWid"), // 获取同步任务信息根据wid(校端)
    etltaskschool_addorupdateschooletltask: _basePath("/etlTaskSchool/addOrUpdateSchoolEtlTask"), // 增加或修改同步任务
    etltaskschool_deleteetltaskschool: _basePath("/etlTaskSchool/deleteEtlTaskSchool"), // 删除同步任务
    etltaskschool_starttask: _basePath("/etlTaskSchool/startTask"), // 启动任务
    etltaskschool_stoptask: _basePath("/etlTaskSchool/stopTask"), // 启动任务
    etltask_queryetltasks: _basePath("/etlTask/queryEtlTasks"), // 获取同步任务
    etltask_addorupdateetltask: _basePath("/etlTask/addOrUpdateEtlTask"), // 增加或修改同步任务
    etltask_deleteetltask: _basePath("/etlTask/deleteEtlTask"), // 删除同步任务
    etltask_downloadtask: _basePath("/etlTask/downloadTask"), // 下载同步任务
    etltask_pollfilestatus: _basePath("/etlTask/pollFileStatus"), // 拉取文件状态
    etltask_getgeneratedtaskfile: _basePath("/etlTask/getGeneratedTaskFile"), // 下载已生成的同步任务
    etltask_pushtask: _basePath("/etlTask/pushTask"), // 推送同步任务
    etltask_gettranssql: _basePath("/etlTask/getTransSql"), // 获取SQL
    etldatasource_queryetldatasources: _basePath("/etlDatasource/queryEtlDataSources"), // 获取数据源
    etldatasource_queryetldatasourcesbyschoolid: _basePath(
        "/etlDatasource/queryEtlDataSourcesBySchoolId"
    ), // 获取数据源
    etldatasource_addorupdateetldatasource: _basePath("/etlDatasource/addOrUpdateEtlDataSource"), // 增加或修改数据源
    etldatasource_checketldatasource: _basePath("/etlDatasource/checkEtlDataSource"), // 测试数据源连接
    etldatasource_deleteetldatasource: _basePath("/etlDatasource/deleteEtlDataSource"), // 删除数据源
    select_dbtype: _basePath("/select/dbType"), // 获取数据库类型
    select_pktype: _basePath("/select/pkType"), // 获取主键类别
    select_etltablename: _basePath("/select/etlTableName"), // 获取元数据表名字
    select_etlschoolcompareds: _basePath("/select/etlSchoolCompareDS"), // 获取私有云标准库
    select_etlschoolbusinessds: _basePath("/select/etlSchoolBusinessDS"), // 获取私有云业务库
    select_etlcloudcompareds: _basePath("/select/etlCloudCompareDS"), // 获取公有云标准库
    select_etlcloudbusinessds: _basePath("/select/etlCloudBusinessDS"), // 获取公有云业务库
    select_etldatasourcetype: _basePath("/select/etlDataSourceType"), // 获取数据源类型
    select_getetldDatasourcetypeextend: _basePath("/select/getEtlDataSourceTypeExtend"), // 获取数据源类型扩展---新增
    select_etltablebydatasource: _basePath("/select/etlTableByDataSource"), // 通过数据源获取元数据表
    select_etlcheckjdbcconnction: _basePath("/select/etlCheckJdbcConnction"), // 测试连接
    etldatasource_queryextendetldatasources: _basePath("/etlDatasource/queryExtendEtlDataSources"), // 获取数据源(改造)
    etlfieldextend_updateetltablefieldsort: _basePath("/etlFieldExtend/updateEtlTableFieldSort"), // 上移下移
    select_tenantbustype: _basePath("/select/tenantBusType"), // 获取租户分类属性
    select_dbtypebydatasource: _basePath("/select/dbTypeByDataSource"), // 通过数据源获取数据库类型
    select_gettaskpocily: _basePath("/select/getTaskPocily"), // 获取策略(改造)
    select_getTenantbustypeon: _basePath("/select/getTenantBusTypeOn"), // 获取目标表(上行改造)
    select_getTenantbustypedown: _basePath("/select/getTenantBusTypeDown") // 获取目标表(下行改造)
};
