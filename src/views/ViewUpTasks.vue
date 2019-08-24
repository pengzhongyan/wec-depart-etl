<template>
  <div class="view-tasks">
    <BaseModal v-model="show" title="查看同步任务" width="550">
      <Form ref="addForm" :model="addForm" :label-width="100" label-position="left">
        <FormItem label="任务名称：" prop="name">{{addForm.name}}</FormItem>
        <FormItem label="目标表：" prop="tableNameDesc">{{addForm.tableNameDesc}}</FormItem>
        <FormItem label="中间库：" prop="schoolCompareDatesource">{{addForm.schoolCompareDatesource}}</FormItem>
        <FormItem label="中间表：" prop="compareTable">{{addForm.compareTable}}</FormItem>
        <FormItem label="源头库：" prop="schoolCompareDatesource">{{addForm.schoolCompareDatesource}}</FormItem>
        <FormItem label="源头表：" prop="sourceTable">{{addForm.sourceTable}}</FormItem>
        <FormItem label="源头表转换sql：" prop="schoolSql">{{addForm.schoolSql}}</FormItem>
        <FormItem label="执行策略：" prop="schoolPolicyType">{{addForm.schoolPolicyTypeName}}</FormItem>
        <FormItem label="执行时间：" prop="schoolPolicyType">
          <template v-if="addForm.schoolPolicyType === '1'">{{addForm.schoolPolicyHour}}小时</template>
          <template v-else-if="addForm.schoolPolicyType === '2'">{{addForm.schoolPolicyDay}}</template>
          <template
            v-else="addForm.schoolPolicyType === '3'"
          >{{addForm.schoolPolicyWeek}} {{addForm.schoolPolicyWeekDay}}</template>
        </FormItem>
      </Form>
      <div class="iv-footer" slot="footer">
        <slot></slot>
      </div>
    </BaseModal>
  </div>
</template>

<script>
export default {
  name: "ViewUpTasks",
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    addForm() {
      return this.rowData;
    }
  }
};
</script>

<style lang="stylus" scoped></style>