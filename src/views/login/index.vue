<template>
  <div class="login">
    <div class="logo">
    </div>
    <el-form ref="loginForm" status-icon :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">斯尔奇人才管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

<!--    <div class="el-login-footer">-->
<!--      <span>Copyright © 2018-2021 watering All Rights Reserved.</span>-->
<!--    </div>-->
  </div>
</template>

<script>
import { login } from '@/api/user'
import Cookies from 'js-cookie'
export default {
  name: "login",
  data(){
    return {
      loginForm: {
        username: 'xhjy_wisecoach',
        password: '827165648',
        rememberMe: false,
      },
      loading: false,
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
      }
    }
  },
  methods: {
    handleLogin(){
      this.$refs.loginForm.validate((valid) => {
        if(valid){
          this.loading = true
          login(this.loginForm).then(res=>{
            this.loading = false
            const code = res.data.code
            if (code === 204) {
              this.$router.push(this.$route.query.redirect || '/')
            } else if (code === 203){
              this.loginForm.password = ''
              this.$message.error("账号或密码错误")
            }
          })
        }
      })
    }
  },
  computed: {

  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url("../../assets/images/login-back.png");
  background-size: 100% 100%;

  .login-form {
    position: absolute;
    right: 150px;
    top: 200px;
    width: 400px;
    padding: 25px 25px 5px 25px;
    background-color: rgba(255,255,255,.55);
    border-radius: 6px;
    margin: auto;
  }
}

.logo {
  position: absolute;
  font-size: 40px;
  left: 20px;
  top: 20px;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
