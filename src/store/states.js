const states = {
    defaultPath: "/datasource",
    compareData: [], //上行中间库与下行目标库
    taskPocilyData: [], //策略
    menus: [
        {
            key: "01",
            title: "数据集成",
            path: "/",
            customIcon: "icon-shujuzhongxin_renyuanxinxi",
            children: [
                {
                    key: "0101",
                    title: "数据源管理",
                    path: "/datasource"
                },
                {
                    key: "0102",
                    title: "同步数据管理",
                    path: "/synchrotasks"
                }
            ]
        }
    ]
};

export default states;
