<template>
  <div class="synchro-tasks" :animated="false">
    <Tabs v-model="currentTab" @on-click="changeTabs">
      <TabPane :label="renderUpLabel"></TabPane>
      <TabPane :label="renderDownLabel"></TabPane>
    </Tabs>

    <!--新增 -->
    <div class="mb-5">
      <Button type="primary" @click.native="showAddModal({},false)">新增任务</Button>
      <Button class="ml-10" v-show="currentTab === 0" @click="downTask">下载同步工具</Button>
    </div>
    <!--table -->
    <div class="mt-10">
      <Table :loading="loading" stripe border :columns="columns" :data="tableData"></Table>
      <Row>
        <Page
          class="mt-15"
          :total="totalSize"
          :current="queryParams.pageNumber"
          show-elevator
          @on-change="pageNumChange"
          @on-page-size-change="pageSizeChange"
        />
      </Row>
    </div>

    <!--删除 -->
    <BaseModal
      title="确认删除"
      v-model="deleModal"
      width="350px"
      @on-ok="deleteData"
      @on-cancel="deleModal = false"
      ok-type="error"
      ok-text="删除"
      type="warning"
      simple
    >{{ deleteModalText }}</BaseModal>
    <!--无法删除 -->
    <KnowModal
      v-model="showKnowModal"
      title="无法删除"
      ok-text="我知道了"
      @on-ok="closeModal"
      simple
    >{{knowContent}}</KnowModal>

    <!--methods中renders,渲染button按钮通过renders定制不同的展示效果 -->
    <!--使用方法:通过components注入组件 -->
    <!-- <TabLabelRender content="333" label="999" :render="renderFun"></TabLabelRender> -->
    <!--上行新增 -->
    <AddUpTasks v-model="addModal" ref="upTasks" @on-update="search"></AddUpTasks>
    <!--上行查看 -->
    <ViewUpTasks v-model="viewModal" :rowData="rowData"></ViewUpTasks>
    <!--下行新增 -->
    <AddDownTasks v-model="addDownModal" ref="downTasks" @on-update="search"></AddDownTasks>
    <!--下行查看 -->
    <ViewDownTasks v-model="viewDownModal" :rowData="rowData"></ViewDownTasks>
    <!--加载 -->
    <Loading :value="onLoading" :title="titleMsg"></Loading>
  </div>
</template>
<script>
import {
  downloadTask,
  pollFileStatus,
  queryEtlTasksBySchoolId,
  queryEtlTasksByWid,
  deleteEtlTaskSchool,
  startTask,
  stopTask
} from "@api/service";
import { downColumns, upColumns } from "@data/columns";
import TabLabel from "@components/TabLabel.vue";
import TabLabelRender from "@components/TabLabelRender";
import AddUpTasks from "@views/AddUpTasks";
import AddDownTasks from "@views/AddDownTasks";
import ViewUpTasks from "@views/ViewUpTasks";
import ViewDownTasks from "@views/ViewDownTasks";
import { policyTypeData, weekData } from "@data/columns.js";
import { objFilter } from "@utils/tools.js";
import { mapState, mapActions } from "vuex";
import { GET_SHCOOL_COMPAREDS, GET_Task_Pocily } from "@store/types";

export default {
  name: "SynchroTasks",
  components: {
    TabLabelRender,
    AddUpTasks,
    AddDownTasks,
    ViewUpTasks,
    ViewDownTasks
  },
  data() {
    return {
      currentTab: 0, //1代表上行2代表下行
      loading: false,
      onLoading: false,
      addModal: false, //上行新增
      addDownModal: false, //下行新增
      deleModal: false,
      viewModal: false, //上行查看
      viewDownModal: false, //下行查看
      showKnowModal: false,
      rowData: {},
      isEdit: false,
      tableData: [],
      totalSize: 0,
      queryParams: {
        type: "1",
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapState(["compareData"]),
    deleteModalText() {
      return "确定删除该数据吗？";
    },
    titleMsg() {
      return "操作中，请稍等哦~~";
    },
    knowContent() {
      return "任务在一天内有执行记录，暂时无法删除";
    },
    //属性渲染方法
    renderUpLabel() {
      return () => (
        <TabLabel
          content="将云平台、云应用依赖校内基础数据同步到云平台基础数据中心"
          label="上行数据同步"
        ></TabLabel>
      );
    },
    renderDownLabel() {
      return () => (
        <TabLabel
          content="将云应用产生的业务数据同步到校内中间库"
          label="下行数据同步"
        ></TabLabel>
      );
    },
    columns() {
      let columns = this.currentTab === 0 ? upColumns : downColumns;
      return columns.concat([
        {
          title: "操作",
          key: "active",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            if (row.taskStatus === 3) {
              //已停止
              return (
                <div>
                  <span class="split" onClick={() => this.operTasks(row, true)}>
                    启用
                  </span>
                  <span
                    class="split"
                    onClick={() => this.showAddModal(row, true)}
                  >
                    修改
                  </span>
                  <span class="split" onClick={() => this.showDeleModal(row)}>
                    删除
                  </span>
                </div>
              );
            } else {
              //启动
              return (
                <div>
                  <span
                    class="split"
                    onClick={() => this.operTasks(row, false)}
                  >
                    停用
                  </span>
                  <span class="split" onClick={() => this.showViewModal(row)}>
                    查看
                  </span>
                </div>
              );
            }
          }
        }
      ]);
    }
  },
  methods: {
    ...mapActions({
      getEetlSchoolCompareDS: GET_SHCOOL_COMPAREDS,
      getTaskPocily: GET_Task_Pocily
    }),
    changeTabs(val) {
      this.currentTab = val;
      let type = val === 0 ? "1" : "2";
      this.queryParams.type = type;
      this.queryParams.pageNumber = 1;
      this.queryList(this.queryParams);
    },
    async downloadTask(params) {
      let vm = this;
      downloadTask(params)
        .then(res => {
          setTimeout(() => {
            vm.fetchDownloadingStatus(params);
          }, 10000);
        })
        .catch(err => {
          vm.onLoading = false;
          const msg = err || "下载同步任务错误";
          vm.$Message.error(msg);
          return;
        });
    },

    async fetchDownloadingStatus(params) {
      const [err, data] = await pollFileStatus(params);
      if (data.status == "1") {
        this.onLoading = false;
        location.href =
          "/wec-depart-etl/etlTask/getGeneratedTaskFile?schoolId=" +
          params.schoolId;
      }
    },

    async queryList(params) {
      let vm = this;
      vm.loading = true;
      const [err, data] = await queryEtlTasksBySchoolId(params);
      vm.loading = false;
      if (err) {
        const msg = err || "获取同步任务数据错误";
        vm.$Message.error(msg);
        return;
      }
      if (!data) return;
      vm.totalSize = data.totalSize;
      vm.tableData = data.rows;
    },
    search() {
      this.queryList(this.queryParams);
    },

    showDeleModal(row) {
      this.rowData = row;
      this.deleModal = true;
    },

    showViewModal(row) {
      this.dealEtlTasksByWid(row);
    },

    async dealEtlTasksByWid(row) {
      const data = await this.queryEtlTasksByWid({ wid: row.wid });
      const { schoolPolicyWeek, schoolPolicyType } = data;
      let weeks = schoolPolicyWeek ? schoolPolicyWeek.split(",") : [];
      let policyType = objFilter(policyTypeData, schoolPolicyType);
      let policyWeek = weeks
        .map(item => {
          return objFilter(weekData, item);
        })
        .join(",");
      this.rowData = {
        ...data,
        schoolPolicyWeek: policyWeek,
        schoolPolicyTypeName: policyType
      };
    },

    async queryEtlTasksByWid(params) {
      const vm = this;
      const [err, data] = await queryEtlTasksByWid(params);
      if (err) {
        let msg = err || "查看数据失败";
        vm.$Message.error(msg);
        return;
      }
      this.currentTab === 0
        ? (this.viewModal = true)
        : (this.viewDownModal = true);
      if (!data) return;
      return data;
    },

    /**
     * 下载
     */
    downTask() {
      let params = { schoolId: "1018364517851768" };
      this.onLoading = true;
      this.downloadTask(params);
    },
    showAddModal(row, isEdit) {
      if (!isEdit) {
        this.currentTab === 0
          ? this.$refs.upTasks.addFormModal(row)
          : this.$refs.downTasks.addFormModal(row);
      } else {
        this.currentTab === 0
          ? this.$refs.upTasks.editeForm(row)
          : this.$refs.downTasks.editeForm(row);
      }
    },
    /**
     * 通过functional中的props属性传参,回调render方法
     */
    renderFun(label, content) {
      return <div>{label + "+++++++" + content}</div>;
    },
    pageNumChange(num) {
      this.queryParams.pageNumber = num;
      this.queryList(this.queryParams);
    },
    pageSizeChange(num) {
      this.queryParams.pageSize = num;
      this.queryList(this.queryParams);
    },

    operTasks(row, isStart) {
      const vm = this;
      vm.onLoading = true; //在家提示
      let params = {
        taskWid: row.wid,
        type: vm.queryParams.type
      };
      isStart ? this.startTask(params) : this.stopTask(params);
    },

    async startTask(params) {
      const vm = this;
      const [err, data] = await startTask(params);
      this.onLoading = false;
      if (err) {
        let msg = err || "操作失败";
        vm.$Message.error(msg);
        return;
      }
      vm.$Message.success("操作成功");
      vm.queryList(vm.queryParams);
    },

    async stopTask(params) {
      const vm = this;
      const [err, data] = await stopTask(params);
      this.onLoading = false;
      if (err) {
        let msg = err || "操作失败";
        vm.$Message.error(msg);
        return;
      }
      vm.$Message.success("操作成功");
      vm.queryList(vm.queryParams);
    },

    async deleteData() {
      let vm = this;
      let params = {
        wids: [vm.rowData.wid]
      };
      const [err, data] = await deleteEtlTaskSchool(params);
      vm.deleModal = false; //刷新
      if (err === "-1") {
        vm.showKnowModal = true;
        return;
      } else if (err) {
        let msg = err || "操作失败";
        vm.$Message.error(msg);
        return;
      }
      vm.$Message.success("操作成功");
      vm.queryList(vm.queryParams);
    },

    closeModal() {
      this.showKnowModal = false;
    }
  },
  mounted() {
    this.queryList(this.queryParams);
    this.getEetlSchoolCompareDS(); //下行目标库 or 上行中间库
    this.getTaskPocily(); //执行策略
  }
};
</script>
<style lang="stylus">
.tip-info {
  top: 95px
  left: 200px
}
</style>

<style lang="stylus" scoped>
@import '~@styles/mixins'

.synchro-tasks {
  >>>.split {
    cursor: pointer
    color: $primary-color
  }
}
</style>

