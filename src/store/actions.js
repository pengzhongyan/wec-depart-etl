import { GET_SHCOOL_COMPAREDS, GET_Task_Pocily } from "./types";
import { getEetlSchoolCompareDS, getTaskPocily } from "@api/service";

const actions = {
    //getEetlSchoolCompareDS --下行的目标库与上行的中间库相同
    async [GET_SHCOOL_COMPAREDS]({ commit }, params) {
        const [err, data] = await getEetlSchoolCompareDS(params);
        if (err) {
            const msg = err || "获取目标库或者中间库数据异常";
            this.$Message.error(msg);
        }
        if (!data) return;
        commit(GET_SHCOOL_COMPAREDS, data.rows);
    },

    async [GET_Task_Pocily]({ commit }, params) {
        const [err, data] = await getTaskPocily(params);
        if (err) {
            const msg = err || "获取执行策略数据异常";
            this.$Message.error(msg);
        }
        if (!data) return;
        commit(GET_Task_Pocily, data.rows);
    }
};

export default actions;
