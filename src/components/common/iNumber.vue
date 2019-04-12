<template>
  <div class="box">
    <span class="i-minus" @click="minus"></span>
    <span class="num">{{num}}</span>
    <span class="i-add" @click="add"></span>
  </div>
</template>
<script>
export default {
  props: ['max', 'num'],
  data() {
    return {
      min: 1
    }
  },
  watch: {
    num(v) {
      this.$emit('changeNum', v)
    }
  },
  methods: {
    add() {
      this.num++
      this.num = this.num > this.max ? this.max : this.num
    },
    minus() {
      this.num--
      this.num = this.num < this.min ? this.min : this.num
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../static/css/svg.scss';

.box{
  width: 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .num{
    font-size: 0.6em;
    color: #999;
  }
}

</style>