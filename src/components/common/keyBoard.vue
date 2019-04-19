<template>
  <div  v-show="show">
    <div class="key-box">
      <h6 class="key-tit">
        <span>输入余额支付密码</span>
        <span class="i-x" @click="show=false"></span>
      </h6>
      <div class="pswNum-box">
        <span class="pswNum" v-for="(item,index) in 6" :key="index">
          <span class="dot" v-if="psw.length>=index+1"></span>
        </span>
      </div>
      <div class="keys">
        <div class="key" v-for="(item,index) in numList" :key="index" @click="inputNum(item)">
          {{item}}
        </div>
        <div class="del i-del"></div>
      </div>
    </div>
    <div class="zzc"></div>
  </div>
</template>

<script>
  export default {
    model:{
      prop: 'password',
      event: 'change'
    },
    data() {
      return {
        show: false,
        psw: '',
        numList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'Del']
      }
    },
    mounted(){
      this.$bus.on('showKeyBoard',()=>{
        this.shown()
      })
      this.$bus.on('hideKeyBoard',()=>{
        this.hidden()
      })
    },
    methods:{
      shown(){
        this.show = true
      },
      hidden(){
        this.show = false
      },
      inputNum(item){
        if( !isNaN(item) && this.psw.length<6 ){
          this.psw+=item
        }
        if( item=='Del' && this.psw.length>0 ){
          this.psw = this.psw.slice(0,-1)
        }
        this.$emit('change',this.psw)
      }
    }
  }

</script>

<style lang="scss" scoped>

@import '../../static/css/mixin.scss';
@import '../../static/css/common.scss';
@import '../../static/css/svg.scss';

.key-box{
  position: fixed;
  left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    background: #fff;
}
.key-tit{
  height: 1rem;
  display: flex;
  align-items:center;
  justify-content: space-between;
  text-align: center;
  font-size: .3rem;
  padding:0 .3rem;
  border-bottom:1px solid #e1e1e1;
  .i-x{
    font-size:.4rem;
  }
}
.keys{
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #f5f5f5;
  border:1px solid #e1e1e1;
}
.key{
  width:33.333%;
  font-size: 0.32rem;
  text-align: center;
  line-height: 1rem;
  background: #fff;
  border:1px solid #e1e1e1;
  margin-top: -1px;
  margin-left: -1px;
  margin-right: -1px;
  margin-bottom: -1px;
  color:#666;
  }
  .pswNum-box{
    display:flex;
    justify-content:center;
    padding:.3rem;
    text-align:center;
  }
  .pswNum{
    display:flex;
    justify-content:center;
    align-items:center;
    width:.8rem;
    height:.8rem;
    border:1px solid #e1e1e1;
    margin-left:-1px;
    text-align:center;
    line-height:.8rem;
  }
  .zzc{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 100;
  }
  .dot{
    display:inline-block;
    width:.2rem;
    height:.2rem;
    border-radius:50%;
    background:#666;
  }
</style>
