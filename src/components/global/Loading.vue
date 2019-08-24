<template>
  <div class="app-loading app-loading-show" v-show="show">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div class="content">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set() {}
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/variable'

.app-loading {
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: rgba(55, 55, 55, 0.4)
}
.app-loading-show {
  z-index: 999999
  animation: fade-in
  animation-duration: 0.5s
  animation: fade-in 0.5s
  opacity: 1
}
.spinner {
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 100%
}
.spinner>div {
  width: 30px
  height: 30px
  background-color: $primary-color
  border-radius: 100%
  display: inline-block
  animation: bouncedelay 1.4s infinite ease-in-out
  animation-fill-mode: both
}
.content {
  position: absolute
  top: 54%
  left: 50%
  transform: translate(-46%, -50%)
  color: $primary-color
  font-weight: 500
}
@keyframes bouncedelay {
  /* 在执行到某一帧的时候调用指定的动作 */
  0% {
    transform: scale(0)
    -webkit-transform: scale(0)
  }
  100% {
    transform: scale(1)
    -webkit-transform: scale(1)
    opacity: 0
  }
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s
  animation-delay: -0.32s
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s
  animation-delay: -0.16s
}
</style>

