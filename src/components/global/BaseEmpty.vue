<template>
  <div class="base-empty">
    <div class="content" :style="styles">
      <img :src="img" />
      <p class="title">{{ title }}</p>
      <!--填充内容 -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseEmpty",
  props: {
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      img: require("@assets/img/empty.png")
    };
  },
  computed: {
    styles() {
      return { minHeight: `${this.height}px` };
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/variable.styl'

.base-empty {
  min-height: 350px
  .content {
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    .title {
      color: $base-color
      font-size: 16px
      text-align: center
      margin: 20px 0
    }
  }
}
</style>