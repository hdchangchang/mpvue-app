<template>
  <div class="login-box">
    <p class="login-p">
      <input type="text" v-model="phone" placeholder="输入手机号" />
    </p>
    <p class="login-p">
      <input type="text" v-model="yzm" placeholder="输入验证码" />
      <span class="yzm-box">
        <span class="yzm-btn" v-if="yzmStep==1" @click="getYzm">获取验证码</span>
        <span class="yzm-cd" v-else>60s</span>
      </span>
    </p>
    <button class="btn" @click="login">登录</button>
  </div>
</template>
<script>
  import { AskforYzm, Askforlogin } from '@/services/index.js'
  export default {
    props: ['show'],
    data() {
      return {
        phone: '',
        yzm: '',
        yzmStep: 1 // 获取验证码阶段
      }
    },
    methods: {
      getYzm() {
        if (!this.phone) {
          return false
        }
        this.yzmStep = 2
  
        new AskforYzm({
          method: 'POST',
          body: { phone: this.phone }
        }).send()
      },
      login() {
        new Askforlogin({
          method: 'POST',
          body: {
            phone: this.phone,
            smsCode: this.yzm,
            sessionKey: mpvue.getStorageSync('sessionKey')
          }
        }).send().then((res) => {
          console.log(res)
          const userInfo = res
  
          mpvue.setStorageSync('userInfo', userInfo)
          mpvue.setStorageSync('token', res.token)
          mpvue.setStorageSync('customerId', res.customerId)

          this.$bus.emit('hidePop', { popName: 'popLogin' })
        }, (err) => {
          console.log(err)
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .login-p {
    position: relative;
    margin-top: -1px;
    font-size: .3rem;
    input {
      height: 0.9rem;
      line-height: .9rem;
      padding: 0 .2rem;
      border: 1px solid #e1e1e1;
    }
  }
  .yzm-box{
    position: absolute;
    right: 0;
    top: 0;
    width: 2rem;
    height: 0.9rem;
    line-height: .9rem;
    text-align: center;
    border-left:1px solid #e1e1e1;
    
    font-size: 0.22rem;
    color: #ff6900;
    z-index: 10;
    span{
      width: 100%;
      height: 100%;
    }
  }
  .btn{
    height:.9rem;
    line-height: .9rem;
    font-size: 0.36rem;
    margin-top: 0.4rem;
    background:#ff6900;
    color:#fff;
  }

</style>
