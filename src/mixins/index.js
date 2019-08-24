import { dbType, getEtlDataSourceTypeExtend } from "@api/service";
export const dealMxins = {
    data() {
        return {
            dbTypeData: [],
            sourceTypeData: []
        };
    },
    methods: {
        async dbTypeList() {
            let vm = this;
            vm.dbTypeData = [];
            const [err, data] = await dbType();
            if (err) {
                const msg = err || "获取数据库类型错误";
                vm.$Message.error(msg);
                return;
            }
            if (!data) return;
            data.rows.map(item => {
                vm.dbTypeData.push({
                    label: item.name,
                    value: item.id
                });
            });
        },
        async querySourceType() {
            let vm = this;
            const [err, data] = await getEtlDataSourceTypeExtend();
            if (err) {
                const msg = err || "获取数据源类型错误";
                vm.$Message.error(msg);
                return;
            }
            if (!data) return;
            vm.sourceTypeData = data.rows;
        },
        filterMixins(filterData, item) {
            for (let i = 0; i < filterData.length; i++) {
                let obj = filterData[i];
                if (obj.value === item) {
                    return obj.label;
                }
            }
        },
        dataSourMixins(data, item) {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                if (obj.id === item) {
                    return obj.name;
                }
            }
        }
    },
    mounted() {
        this.dbTypeList();
        this.querySourceType();
    }
};
