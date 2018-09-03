<template>
  <div class="app-login">
    <img src="~@/assets/images/logo.png" alt="" class="app-logo">
    <canvas class="brand-info" id="paper-canvans" style="width:100%;height:100%;"></canvas>
    <div class="login-contanier">
      <i-form ref="loginForm" :model="formData" :rules="formRule" @keyup.enter="onLogin()">
        <i-form-item prop="username">
          <i-input type="text" v-model="formData.username" size="default" placeholder="Username" style="width: 260px;">
            <i-icon type="ios-person-outline" slot="prepend" size="20"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input type="password" v-model="formData.password" size="default" placeholder="Password" style="width: 260px;">
            <i-icon type="ios-lock-outline" slot="prepend" size="20"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="onLogin()" :loading="isLoging" size="default" icon="md-arrow-forward" style="width: 260px;">登录{{ isLoging ? '中...' : '' }}</i-button>
        </i-form-item>
      </i-form>
    </div>
  </div>
</template>

<script>

import PaperJS from '@/assets/js/paper';
import Service from '@/service';
import Vue from 'vue';

export default {
  data(){
    return {
      isLoging: false,
      formData: {
        username: '',
        password: '',
        // captcha: ''
      },
      formRule: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '请输入正确的密码（最少6个字符）', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      PaperJS.init('paper-canvans');
    });
  },
  methods: {
    onLogin(){
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.isLoging = true;
          Service.common.login(this.formData).then(({ data })=>{
            console.log(data);
            this.isLoging = false;
            if(data && data.code === 1000){
              this.$Message.success('Success!');
              this.$cookie.set('token', data.data.token, { expires: data.data.expires });
              this.$router.push('/');
            }else{
              this.$Message.error(data.message);
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.app-login {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('~@/assets/images/login_bg.jpg') no-repeat center center;
  background-size: cover;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
  }
  .app-logo {
    display: block;
    width: 60px;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 2;
  }
  canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .login-contanier {
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
}
</style>
<style>
.login-contanier .ivu-input-wrapper .ivu-input {
  background-color: transparent !important;
  border-radius: 0 !important;
}
</style>



