<template>
  <div class="login">
    <el-form ref="loginForm" status-icon :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">斯尔琪人才管理系统</h3>
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
        username: 'xhjy_zhuzhen',
        password: 'zhuzhen',
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


.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
</style>
