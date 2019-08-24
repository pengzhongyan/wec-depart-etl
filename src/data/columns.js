export const weekData = [
    {
        id: "1",
        name: "周一"
    },
    {
        id: "2",
        name: "周二"
    },
    {
        id: "3",
        name: "周三"
    },
    {
        id: "4",
        name: "周四"
    },
    {
        id: "5",
        name: "周五"
    },
    {
        id: "6",
        name: "周六"
    },
    {
        id: "7",
        name: "周日"
    }
];

export const policyTypeData = [
    {
        id: "1",
        name: "按小时执行"
    },
    {
        id: "2",
        name: "每天定时执行"
    },
    {
        id: "3",
        name: "按周执行"
    }
];

export const hourData = [
    {
        id: "1",
        name: "1小时"
    },
    {
        id: "2",
        name: "2小时"
    },
    {
        id: "4",
        name: "4小时"
    },
    {
        id: "6",
        name: "6小时"
    },
    {
        id: "8",
        name: "8小时"
    }
];

export const sourceColumns = [
    {
        title: "数据源名称",
        key: "name"
    },
    {
        title: "数据源类型",
        slot: "category",
        key: "category"
    },
    {
        title: "数据库类型",
        slot: "dbType",
        key: "dbType"
    },
    {
        title: "数据库地址",
        key: "hostName"
    },
    {
        title: "数据库名称",
        key: "serverName"
    },
    {
        title: "用户名",
        key: "userName"
    }
];

export const downColumns = [
    {
        title: "任务名称",
        key: "name"
    },
    {
        title: "源头表",
        key: "tableNameDesc"
    },
    {
        title: "目标表",
        key: "sourceTable"
    },
    {
        title: "任务状态",
        key: "taskStatusName" // 1 2 3执行中
    }
];

export const upColumns = [
    {
        title: "任务名称",
        key: "name"
    },
    {
        title: "目标表",
        key: "tableNameDesc"
    },
    {
        title: "中间表",
        key: "compareTable"
    },
    {
        title: "源头表",
        key: "sourceTable"
    },
    {
        title: "任务状态",
        key: "taskStatusName"
    }
];
