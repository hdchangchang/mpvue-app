<template>
  <div class="box">
    <span class="i-minus" @click="minus"></span>
    <input class="num" :value="num"/>
    <span class="i-add" @click="add"></span>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'num',
    event: 'change' // 默认是input
  },
  props: {
    max: Number,
    min: {
      type: Number,
      default: 1
    },
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showNum: this.num
    }
  },
  methods: {
    add() {
      this.showNum++
      this.showNum = this.showNum > this.max ? this.max : this.showNum
      this.$emit('change', this.showNum)
      this.$emit('changeHandle') // 点击时候做的其它处理
    },
    minus() {
      this.showNum--
      this.showNum = this.showNum < this.min ? this.min : this.showNum
      this.$emit('change', this.showNum)
      this.$emit('changeHandle')
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
    border:0;
    text-align: center;
    width:.5rem;
  }
}

</style>