<template>
  <div class="data-source">
    <h2 class="title-top mb-20">数据源管理</h2>
    <!--新增 -->
    <Button type="primary" @click.native="showAddModal({},false)">新增数据源</Button>
    <!--table -->
    <div class="mt-15">
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
    <!--新增组件 -->
    <AddDataSource
      v-model="addModal"
      ref="addsource"
      :sourceTypeData="sourceTypeData"
      :dbTypeData="dbTypeData"
      @on-update="search"
    ></AddDataSource>
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
      :title="`无法${title}`"
      ok-text="我知道了"
      @on-ok="closeModal"
      simple
    >{{knowContent}}</KnowModal>
  </div>
</template>
<script>
import { queryExtendEtlDataSources, deleteEtlDataSource } from "@api/service";
import { sourceColumns } from "@data/columns";
import AddDataSource from "@views/AddDataSource";
import { dealMxins } from "@mixins/index.js";
export default {
  name: "DataSource",
  components: {
    AddDataSource
  },
  mixins: [dealMxins],
  data() {
    return {
      loading: false,
      deleModal: false,
      showKnowModal: false,
      totalSize: 0,
      tableData: [],
      isEdit: false,
      isDele: false,
      addModal: false,
      rowData: {},
      queryParams: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    title() {
      return this.isDele ? "删除" : "修改";
    },
    deleteModalText() {
      return "确定删除该数据吗？";
    },
    knowContent() {
      return this.isDele
        ? "被同步任务使用的数据源不能删除"
        : "被同步任务使用且同步任务是启动状态不能修改";
    },
    columns() {
      let vm = this;
      return [
        {
          title: "数据源名称",
          key: "name"
        },
        {
          title: "数据源类型",
          key: "category",
          render: (h, params) => {
            let row = params.row;
            const label = vm.dataSourMixins(vm.sourceTypeData, row.category);
            return <span>{label}</span>;
          }
        },
        {
          title: "数据库类型",
          key: "dbTypeName"
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
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return (
              <div>
                <span
                  class="split"
                  onClick={() => this.showAddModal(params.row, true)}
                >
                  修改
                </span>
                <span
                  class="split"
                  onClick={() => this.showDeleModal(params.row)}
                >
                  删除
                </span>
              </div>
            );
          }
        }
      ];
    }
  },
  methods: {
    async queryList(params) {
      let vm = this;
      vm.loading = true;
      const [err, data] = await queryExtendEtlDataSources(params);
      vm.loading = false;
      if (err) {
        const msg = err || "获取数据源数据错误";
        vm.$Message.error(msg);
        return;
      }
      if (!data) return;
      vm.totalSize = data.totalSize;
      vm.tableData = data.rows;
    },
    pageNumChange(num) {
      this.queryParams.pageNumber = num;
      this.queryList(this.queryParams);
    },
    pageSizeChange(num) {
      this.queryParams.pageSize = num;
      this.queryList(this.queryParams);
    },
    showAddModal(row, isEdit) {
      this.addModal = true;
      this.isEdit = isEdit;
      isEdit
        ? this.$refs.addsource.editeForm(row)
        : this.$refs.addsource.addFormModal(row);
    },
    search() {
      this.queryList(this.queryParams);
    },
    showDeleModal(row) {
      this.deleModal = true;
      this.rowData = row;
    },
    async deleteData() {
      let vm = this;
      vm.isDele = false;
      let params = {
        wids: [vm.rowData.wid]
      };
      const [err, data] = await deleteEtlDataSource(params);
      vm.deleModal = false; //刷新
      if (err === "-1") {
        vm.isDele = true;
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
    this.search();
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/mixins'

.data-source {
  >>>.split {
    cursor: pointer
    color: $primary-color
  }
}
</style>

