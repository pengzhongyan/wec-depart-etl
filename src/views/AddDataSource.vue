<template>
  <div class="add-source">
    <BaseModal
      v-model="show"
      :title="`${title}数据源`"
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
        <FormItem label="数据源名称" prop="name">
          <Input v-model.trim="addForm.name" placeholder="请输入数据源名称"></Input>
        </FormItem>
        <FormItem label="数据源类别" prop="category">
          <Select v-model="addForm.category">
            <Option
              v-for="(option, index) in sourceTypeData"
              :value="option.id"
              :key="index"
            >{{ option.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库类型" prop="dbType">
          <Select v-model="addForm.dbType" @on-change="changeDbType">
            <Option
              v-for="(option, index) in dbTypeData"
              :value="option.value"
              :key="index"
            >{{ option.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库Schema" prop="schemaName" v-show="showSchema">
          <Input v-model.trim="addForm.schemaName" placeholder="请输入数据库Schema"></Input>
        </FormItem>
        <FormItem label="数据库地址" prop="hostName">
          <Input v-model.trim="addForm.hostName" placeholder="请输入数据库地址"></Input>
        </FormItem>
        <FormItem label="数据库名称" prop="serverName">
          <Input v-model.trim="addForm.serverName" placeholder="请输入数据库名称"></Input>
        </FormItem>
        <FormItem label="数据库端口号" prop="port">
          <Input v-model.trim="addForm.port" placeholder="请输入数据库端口号"></Input>
        </FormItem>
        <FormItem label="用户名" prop="userName">
          <Input v-model.trim="addForm.userName" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model.trim="addForm.password" placeholder="请输入密码"></Input>
        </FormItem>
      </Form>
    </BaseModal>
  </div>
</template>
<script>
import { addOrUpdateEtlDataSource } from "@api/service";
export default {
  name: "AddDataSource",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    dbTypeData: {
      type: Array,
      default: () => []
    },
    sourceTypeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showSchema: false,
      isEdit: false,
      addForm: {
        wid: "",
        name: "",
        category: "",
        dbType: "",
        schemaName: "",
        hostName: "",
        serverName: "",
        port: "",
        userName: "",
        password: "",
        isMultTenant: 0,
        schoolId: "",
        schoolName: ""
      }
    };
  },
  computed: {
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
      return {
        name: [
          {
            required: true,
            message: "请输入数据源名称",
            trigger: "blur"
          }
        ],
        category: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        dbType: {
          required: true,
          message: "请选择",
          trigger: "change"
        },
        schemaName: [
          {
            required: this.showSchema ? true : false,
            message: "请输入数据库Schema",
            trigger: "blur"
          }
        ],
        hostName: [
          {
            required: true,
            message: "请输入数据库地址",
            trigger: "blur"
          },
          {
            pattern: /^[0-9.]+$/,
            message: "仅允许输入数字",
            trigger: "blur"
          }
        ],
        serverName: [
          {
            required: true,
            message: "请输入数据库名称",
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            message: "请输入数据库端口号",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+$/,
            message: "仅允许输入数字",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      };
    }
  },
  methods: {
    editeForm(form) {
      this.addForm = Object.assign(this.addForm, form); //拷贝数据
      this.changeDbType(this.addForm.dbType);
      this.isEdit = true;
    },

    addFormModal(form) {
      this.resetForm();
      this.addForm = Object.assign(this.addForm, form, {
        wid: ""
      }); //拷贝数据
    },

    resetForm() {
      this.$refs.addForm.resetFields();
      this.isEdit = false;
    },

    changeDbType(val) {
      if (val === "3") {
        this.showSchema = true;
      } else {
        this.showSchema = false;
      }
    },

    saveData() {
      const vm = this;
      vm.$refs.addForm.validate(valid => {
        if (valid) {
          vm.saveSourcedData(vm.addForm);
        }
      });
    },
    //新增 or 修改
    async saveSourcedData(params) {
      const [err, data] = await addOrUpdateEtlDataSource(params);
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
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/mixins'
</style>