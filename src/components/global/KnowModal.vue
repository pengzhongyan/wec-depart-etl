<template>
  <div>
    <Modal v-model="show" :width="width" :class-name="modalClass" v-bind="$attrs" v-on="$listeners">
      <div slot="header" class="iv-header">
        <slot name="header">
          <Icon type="md-close-circle mr-15" size="30" color="#ed4014"></Icon>
          <label>{{ title }}</label>
        </slot>
      </div>
      <div :style="contentStyle">
        <slot></slot>
      </div>
      <div class="iv-footer" slot="footer">
        <Button :type="okType" @click="onOk">{{okText}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * 垂直居中modal
 */
export default {
  name: "KnowModal",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "所需数据（数据字典）"
    },
    value: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 416
    },
    okText: {
      type: String,
      default: "确定"
    },
    okType: {
      type: String,
      default: "primary"
    }
  },
  methods: {
    onOk() {
      this.$emit("on-ok");
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    modalClass() {
      return "vertical-center-modal simple";
    },
    contentStyle() {
      return { minHeight: "auto", marginLeft: "45px" };
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.vertical-center-modal {
  display: flex
  align-items: center
  justify-content: center
  .ivu-modal {
    top: 0
  }
  .ivu-modal-header {
    line-height: 1.2
  }
}
>>>.vertical-center-modal.simple {
  .ivu-modal-header {
    border-bottom: none
  }
  .ivu-modal-footer {
    border-top: none
  }
}
.iv-header {
  display: flex
  align-items: center
  label {
    font-size: 16px
    color: #464C5B
    font-weight: 600
  }
}
.iv-footer {
  height: 35px
  display: flex
  align-items: center
  justify-content: flex-end
}
</style>
