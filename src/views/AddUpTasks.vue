<template>
  <div class="add-synchro">
    <BaseModal
      v-model="show"
      :title="`${title}同步任务`"
      width="550"
      @on-ok="saveData"
      @on-cancel="cancel"
    >
      <Form
        ref="addForm"
        :model="addForm"
        :rules="validateRule"
        :label-width="120"
        label-position="right"
      >
        <FormItem label="任务名称" prop="name">
          <Input v-model.trim="addForm.name" placeholder="请输入任务名称"></Input>
        </FormItem>
        <!--上行getTenantBusTypeOn -->
        <FormItem label="目标表" prop="tenantSelectData">
          <Cascader
            v-model="tenantSelectData"
            :data="tenantData"
            transfer
            clearable
            filterable
            @on-change="handleChange"
          ></Cascader>
        </FormItem>
        <!--上行的中间库schoolCompareDatesource  -->
        <FormItem label="中间库" prop="schoolCompareDatesourceId">
          <Select v-model="addForm.schoolCompareDatesourceId">
            <Option
              v-for="(option, index) in compareData"
              :value="option.id"
              :key="index"
            >{{ option.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="中间表" prop="compareTable">
          <Input v-model.trim="addForm.compareTable" placeholder="请输入中间库里的中间表名"></Input>
        </FormItem>
        <!--上行的源头库schoolBusinessDatasource -->
        <FormItem label="源头库" prop="schoolBusinessDatasourceId">
          <Select v-model="addForm.schoolBusinessDatasourceId">
            <Option
              v-for="(option, index) in sourceData"
              :value="option.id"
              :key="index"
            >{{ option.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="源头表" prop="sourceTable">
          <Input v-model.trim="addForm.sourceTable" disabled placeholder="请输入数据库名称"></Input>
        </FormItem>
        <FormItem label="源头表转换sql" prop="schoolSql">
          <Input
            v-model.trim="addForm.schoolSql"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 10}"
            placeholder="源头表不满足数据标准格式，需通过sql进行转换，及设置差异对比字段(转换sql中order by后面设置的字段)"
          ></Input>
        </FormItem>
        <!--上行私有云策略 -->
        <FormItem label="执行策略" prop="schoolPolicyType">
          <Select v-model="addForm.schoolPolicyType" @on-change="changePolicyType" transfer>
            <Option
              v-for="(option, index) in taskPocilyData"
              :value="option.id"
              :key="index"
            >{{ option.name }}</Option>
          </Select>
        </FormItem>
        <template v-if="policyType === '2'">
          <FormItem label="执行时间" prop="schoolPolicyDay">
            <TimePicker
              type="time"
              :value="addForm.schoolPolicyDay"
              @on-change="ev => (addForm.schoolPolicyDay = ev)"
              transfer
              placement="bottom"
              placeholder="请选择每天的执行时间"
              style="width:380px"
            ></TimePicker>
          </FormItem>
        </template>
        <template v-else-if="policyType === '3'">
          <FormItem label="执行时间" prop="schoolPolicyWeek">
            <Select
              v-model="addForm.schoolPolicyWeek"
              multiple
              class="mr-20"
              transfer
              style="width:230px"
            >
              <Option v-for="item in initWeekData" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
            <TimePicker
              type="time"
              :value="addForm.schoolPolicyWeekDay"
              @on-change="ev => (addForm.schoolPolicyWeekDay = ev)"
              transfer
              placement="bottom"
              placeholder="请选择时间"
              style="width:120px"
            ></TimePicker>
          </FormItem>
        </template>
        <template v-else>
          <FormItem label="执行时间" prop="schoolPolicyHour">
            <Select v-model="addForm.schoolPolicyHour" transfer>
              <Option
                v-for="(option, index) in initHourData"
                :value="option.id"
                :key="index"
              >{{ option.name }}</Option>
            </Select>
          </FormItem>
        </template>
      </Form>
    </BaseModal>
  </div>
</template>

<script>
//getEtlSchoolBusinessDS---源头库
import {
  getEtlSchoolBusinessDS,
  addOrUpdateSchoolEtlTask,
  getTenantBusTypeOn,
  getTransSql
} from "@api/service";
import { hourData, weekData } from "@data/columns";
import { BASE64 } from "@utils/global";
import { mapState } from "vuex";
import { constants } from "crypto";
export default {
  name: "AddUpTasks",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isEdit: false,
      addForm: {
        name: "",
        tableName: "", //目标表
        tableWid: "",
        tenantSelectData: "", //目标表校验通过
        schoolCompareDatesourceId: "",
        schoolCompareDatesource: "", //中间库
        compareTable: "", //中间表
        schoolBusinessDatasourceId: "",
        schoolBusinessDatasource: "", //源头库
        sourceTable: "", //源头表
        schoolSql: "",
        schoolPolicyType: "", //上行执行策略(1按小时定时执行2按天定时执行3按周定时执行)
        schoolPolicyHour: "", //上行执行时间
        schoolPolicyDay: "",
        schoolPolicyWeek: "",
        schoolPolicyWeekDay: ""
      },
      policyType: "1", // (1按小时定时执行2按天定时执行3按周定时执行)
      sourceData: [], //源头库
      tenantData: [], //目标表
      tenantSelectData: [],
      initHourData: [],
      initWeekData: [],
      queryParams: {
        pageSize: 10,
        pageNumber: 1,
        content: "",
        schoolId: ""
      }
    };
  },
  computed: {
    ...mapState(["compareData", "taskPocilyData"]),
    title() {
      return this.isEdit ? "修改" : "新增";
    },

    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    validateRule() {
      const ruleWeek = (rule, value, callback) => {
        if (!this.addForm.schoolPolicyWeekDay) {
          callback("请选择");
          return;
        }
        callback();
      };
      const ruleTenant = (rule, value, callback) => {
        console.log(this.tenantSelectData.length);
        if (this.tenantSelectData.length === 0) {
          callback("请选择");
          return;
        }
        callback();
      };
      return {
        name: {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur"
        },
        tenantSelectData: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          },
          {
            validator: ruleTenant
          }
        ],
        schoolCompareDatesourceId: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        compareTable: {
          required: true,
          message: "请输入中间库里的中间表名",
          trigger: "change"
        },
        schoolBusinessDatasourceId: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        sourceTable: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        schoolPolicyType: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        schoolPolicyHour: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        schoolPolicyDay: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        schoolPolicyWeek: [
          {
            required: true,
            type: "array",
            message: "请选择",
            trigger: "change"
          },
          {
            validator: ruleWeek
          }
        ]
      };
    }
  },
  methods: {
    async editeForm(form) {
      await this.getDictData();
      this.dealFormData(form);
      this.isEdit = true;
    },
    async addFormModal(form) {
      this.addForm = Object.assign(this.addForm, form, {
        wid: ""
      }); //拷贝数据
      this.getDictData();
    },

    resetForm() {
      this.$refs.addForm.resetFields();
      this.addForm.schoolPolicyWeekDay = ""; //新增单独处理
      this.tenantSelectData = []; //新增单独处理
      this.policyType = "1";
      this.isEdit = false;
    },
    dealFormData(obj) {
      const { schoolPolicyWeek, tableWid } = obj;
      this.policyType = obj.schoolPolicyType;
      const arr = this.tenantData.map(item => {
        let selectedData = [];
        let obj = item.children || [];
        let child = obj.find(child => child.value === tableWid) || {};
        if (child.value) {
          selectedData.push(item.value, child.value);
          return selectedData;
        }
      });
      this.tenantSelectData = arr.filter(item => item)[0];
      //拷贝数据
      const form = {
        ...obj,
        schoolPolicyWeek: obj.schoolPolicyWeek.split(","),
        tenantSelectData: this.tenantSelectData.join(",")
      };
      this.addForm = form;
    },
    saveData() {
      const vm = this;
      vm.$refs.addForm.validate(valid => {
        if (valid) {
          let params = {
            ...vm.addForm,
            syncDirection: "1", //默认传值
            schoolPolicyWeek: vm.addForm.schoolPolicyWeek
              ? vm.addForm.schoolPolicyWeek.join(",")
              : "",
            schoolSql: vm.addForm.schoolSql
              ? vm.schoolSqlBase64(vm.schoolSqlBase64(vm.addForm.schoolSql))
              : ""
          };
          vm.saveSourcedData(params);
        }
      });
    },
    schoolSqlBase64(params) {
      return BASE64.encode(params);
    },

    async upTasksTransSql(params) {
      const [err, data] = await getTransSql(params);
      if (err) {
        let msg = err || "操作失败";
        this.$Message.error(msg);
        return;
      }
      if (!data) return;
      return data;
    },

    //新增 or 修改
    async saveSourcedData(params) {
      const [err, data] = await addOrUpdateSchoolEtlTask(params);
      if (err) {
        let msg = err || "操作失败";
        this.$Message.error(msg);
        return;
      }
      this.$Message.success("操作成功");
      this.cancel();
      this.$emit("on-update");
    },
    cancel() {
      this.show = false;
      this.resetForm();
    },
    /**
     * 目标表
     */
    async getTenantBusTypeOn() {
      const vm = this;
      const [err, data] = await getTenantBusTypeOn();
      if (err) {
        const msg = err || "获取目标表数据错误";
        vm.$Message.error(msg);
        return;
      }
      if (!data) return;
      let arr = data.rows;
      //处理数据
      vm.tenantData = vm.dealStringToArray(arr);
      return true;
    },
    dealStringToArray(data) {
      let arr = [];
      const vm = this;
      data.map(item => {
        arr.push({
          value: item.id,
          label: item.name,
          children: vm.dealChildArray(item.rows)
        });
      });
      return arr;
    },
    dealChildArray(rows) {
      let arr = [];
      rows
        .filter(it => it.chinaName)
        .map(row => {
          arr.push({
            value: row.id,
            label: row.chinaName,
            name: row.name
          });
        });
      return arr;
    },
    /**
     * 源头库
     */
    async getEtlSchoolBusinessDS() {
      const vm = this;
      const [err, data] = await getEtlSchoolBusinessDS(vm.queryParams);
      if (err) {
        let msg = err || "获取源头库数据错误";
        vm.$Message.error(msg);
        return;
      }
      if (!data) return;
      vm.sourceData = data.rows;
      return true;
    },

    changePolicyType(val) {
      this.policyType = val;
    },
    async getDictData() {
      this.initHourData = hourData;
      this.initWeekData = weekData;
      await Promise.all([
        this.getEtlSchoolBusinessDS(),
        this.getTenantBusTypeOn()
      ])
        .then(res => {
          if (res[0] && res[1]) {
            this.show = true;
          }
        })
        .catch(err => {
          let msg = err || "获取源头库数据错误";
          this.$Message.error(msg);
          return;
        });
    },
    async handleChange(value, selectedData) {
      this.addForm.sourceTable = ""; //清空
      this.addForm.schoolSql = ""; //清空
      let obj = selectedData.find(it => it.name) || "";
      if (!obj) return;
      //转换schoolSql
      const params = { tableName: obj.name, tableWid: value ? value[1] : "" };
      const data = await this.upTasksTransSql(params);
      const form = {
        tableName: obj.name, //数据库保存name
        sourceTable: obj.name, //源头表
        tableWid: value ? value[1] : "", //数据库保存的id
        tenantSelectData: value.join(","),
        schoolSql: data
      };
      this.addForm = Object.assign(this.addForm, form);
    }
  },
  watch: {
    "addForm.schoolCompareDatesourceId"(val) {
      if (val) {
        let name = this.compareData.find(it => it.id === val).name;
        this.addForm.schoolCompareDatesource = name;
      } else {
        this.addForm.schoolCompareDatesource = "";
      }
    },
    "addForm.schoolBusinessDatasourceId"(val) {
      if (val) {
        let name = this.sourceData.find(it => it.id === val).name;
        this.addForm.schoolBusinessDatasource = name;
      } else {
        this.addForm.schoolBusinessDatasource = "";
      }
    }
  },
  mounted() {
    // this.getDictData();
  }
};
</script>

<style lang="stylus" scoped></style>