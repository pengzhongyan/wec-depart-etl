import { GET_SHCOOL_COMPAREDS, GET_Task_Pocily } from "./types";
const mutations = {
    [GET_SHCOOL_COMPAREDS](state, data) {
        state.compareData = data;
    },
    [GET_Task_Pocily](state, data) {
        state.taskPocilyData = data;
    }
};

export default mutations;
