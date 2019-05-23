<template>
 <div class="container">
   <el-form :rules="loginRules" :model="user" ref="user" v-loading="loadingflag" element-loading-text="页面跳转中" class="login_form" labei-position="left" label-width="0">
     <h3 class="title">欢迎登录后台管理系统</h3>
     <el-form-item prop="account">
       <el-input v-model="user.account" type="text" auto-complete="off" placeholder="账号"></el-input>
     </el-form-item>
     <el-form-item prop="checkPass">
       <el-input v-model="user.checkPass" type="password" auto-complete="off" placeholder="密码"></el-input>
     </el-form-item>
     <el-form-item style="width:100%">
       <el-button type="primary" class="login_button" style="width:40%" @click="handleSubmit">登录</el-button>
       <el-button type="primary" class="login_button" style="width:40%" @click="toReg">注册</el-button>
     </el-form-item>
   </el-form>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       user: {
         account: '',
         checkPass: ''
       },
       loginRules: {
         account: [
           { required:true,message:'账号不能为空',trigger:'blur' }
         ],
         checkPass: [
           { required:true,message:'请输入密码',trigger:'blur' }
         ]
       },
       loadingflag: false
     }
   },
   methods: {
     handleSubmit() {
       this.$refs.user.validate((valid)=>{
         if(valid) {
           this.$store.dispatch('UserLogin',this.user)
         } else {
           console.log('error submit!!')
           return false
         }
       })
     },
     toReg() {
       this.$router.push({path:'/reg'})
     }
   },
   components: {
   }
 }
</script>

<style scoped>
  .el-form-item{
    text-align: center;
  }
</style>
