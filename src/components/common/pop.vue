<template>
  <div class="pop" v-show="show">
    <div class="zzc"></div>
    <div class="main">
      <span class="i-close" @click="hidePop({popName})"></span>
      <div class="pop-header">
        <h6>{{title}}</h6>
      </div>
      <div class="pop-main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['popName', 'title'], // popName 弹出框
    data() {
      return {
        show: false
      }
    },
    mounted() {
      this.$bus.on('showPop', this.showPop)
      this.$bus.on('hidePop', this.hidePop)
    },
    methods: {
      showPop(option) {
        if (this.popName == option.popName) {
          this.show = true
        }
      },
      hidePop(option) {
        if (this.popName == option.popName) {
          this.show = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../static/css/svg.scss';
  .zzc {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .6);
  }
  .main {
    position: fixed;
    top: 35%;
    left: 50%;
    width: 80%;
    padding: .35rem;
    background: #fff;
    border-radius: .1rem;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .i-close {
    position: absolute;
    left: 50%;
    bottom: -.8rem;
    font-size: .56rem;
    transform: translate(-50%, 0);
    z-index: 1;
  }
</style>
