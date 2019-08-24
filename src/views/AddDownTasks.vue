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
        <!--下行getTenantBusTypeDown -->
        <FormItem label="源头表" prop="tenantSelectData">
          <Cascader
            v-model="tenantSelectData"
            :data="tenantData"
            transfer
            clearable
            filterable
            @on-change="handleChange"
          ></Cascader>
        </FormItem>
        <!--下行的源头库schoolBusinessDatasource -->
        <FormItem label="目标库" prop="schoolCompareDatesourceId">
          <Select v-model="addForm.schoolCompareDatesourceId">
            <Option
              v-for="(option, index) in compareData"
              :value="option.id"
              :key="index"
            >{{ option.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="目标表" prop="sourceTable">
          <Input v-model.trim="addForm.sourceTable" disabled placeholder="选择源头表后自动带入相应的目标表名"></Input>
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
              style="width:230px"
              transfer
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
        <template v-else="policyType === '1'">
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
// getTenantBusTypeDown--源头库
import { getTenantBusTypeDown, addOrUpdateSchoolEtlTask } from "@api/service";
import { hourData, weekData } from "@data/columns";
import { mapState } from "vuex";
import { BASE64 } from "@utils/global";
export default {
  name: "AddDownTasks",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEdit: false,
      policyType: "1", // (1按小时定时执行2按天定时执行3按周定时执行)
      tenantData: [], //源头库
      tenantSelectData: [],
      initHourData: [],
      initWeekData: [],
      addForm: {
        name: "",
        tenantSelectData: "", //校验源头库
        tableName: "", //源头库
        tableWid: "",
        schoolCompareDatesourceId: "",
        schoolCompareDatesource: "", //目标库
        sourceTable: "", //目标表
        schoolPolicyType: "", //上行执行策略(1按小时定时执行2按天定时执行3按周定时执行)
        schoolPolicyHour: "", //上行执行时间
        schoolPolicyDay: "",
        schoolPolicyWeek: "",
        schoolPolicyWeekDay: ""
      },
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
      return {
        name: {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur"
        },
        tenantSelectData: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        compareTable: {
          required: true,
          message: "请输入中间库里的中间表名",
          trigger: "change"
        },
        schoolCompareDatesourceId: {
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
    //编辑时调用处理展示
    async editeForm(form) {
      await this.getDictData();
      this.dealFormData(form);
      this.isEdit = true;
    },
    addFormModal(form) {
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
      this.tenantSelectData = [];
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
            syncDirection: "2", //默认传值
            schoolPolicyWeek:
              vm.addForm.schoolPolicyWeek.length > 0
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
     * 源头库
     */
    async getTenantBusTypeDown() {
      const vm = this;
      const [err, data] = await getTenantBusTypeDown();
      if (err) {
        const msg = err || "获取源头表数据错误";
        vm.$Message.error(msg);
        return;
      }
      if (!data) return;
      let arr = data.rows;
      //处理数据
      vm.tenantData = vm.dealStringToArray(arr);
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

    changePolicyType(val) {
      this.policyType = val;
    },
    async getDictData() {
      this.initHourData = hourData;
      this.initWeekData = weekData;
      await this.getTenantBusTypeDown(); //源头库
      this.show = true;
    },
    handleChange(value, selectedData) {
      this.addForm.sourceTable = ""; //清空
      let obj = selectedData.find(it => it.name) || "";
      if (!obj) {
        return;
      }
      const form = {
        tableName: obj.name, //数据库保存的name
        sourceTable: obj.name, //源头表
        tableWid: value ? value[1] : "", //数据库保存的id
        tenantSelectData: value.join(",")
      };
      this.addForm = Object.assign(this.addForm, form); //更改下拉select切换的值
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
    }
  },
  mounted() {
    //this.getDictData();
  }
};
</script>

<style lang="stylus" scoped></style>