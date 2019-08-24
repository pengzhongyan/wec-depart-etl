<template>
  <div class="tab-label">
    <Tooltip placement="bottom" transfer theme="light" :maxWidth="260" class="label-tip">
      <span class="label">{{label}}</span>
      <span slot="content">{{content}}</span>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: "TabLabel",
  props: {
    label: String,
    content: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.tab-label {
  .label-tip {
    transform: translateY(10px)
  }
  .label {
    position: relative
    top: -10px
  }
}
</style>