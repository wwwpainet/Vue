<template>
	<div class="container">
		<el-form :model="user" :rules="regRules" ref="user" class="reg_form" label-position="left" label-width="0px">
			<h3 class="title">系统注册</h3>
			<el-form-item prop="account">
				<el-input v-model="user.account" type="text" auto-complete="off" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input v-model="user.checkPass" type="password" auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item prop="checkRepeatPass">
				<el-input v-model="user.checkRepeatPass" type="password" auto-complete="off" placeholder="重复输入密码"></el-input>
			</el-form-item>
			<el-form-item style="width:100%">
				<el-button class="reg_button" type="primary" @click="handleSubmit" style="width:40%">注册</el-button>
				<el-button class="login_button" type="primary" @click="toLogin" style="width:40%">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    import {mapActions} from 'vuex'
	export default {
		data() {
			//自定义验证函数
			var checkRepeatPass = (rule,value,callback)=>{
				if(value=='') {
					return callback(new Error('请再次输入密码'))
				}else if(value!==this.user.checkPass) {
					return callback(new Error('两次输入的密码不一样'))
				}else{
					return callback()
				}
			}
			return {
				logining: false,
				user: {
					account: '',
					checkPass: '',
					checkRepeatPass:''
				},
				regRules: {
					account: [
                       { required:true,message:'账号不能为空',trigger: 'blur' }
					],
					checkPass: [
                       { required:true,message:'请输入密码',trigger: 'blur' }
					],
					checkRepeatPass: [
                       { validator:checkRepeatPass,trigger: 'blur' }
					]
				}
			}
		},
        methods: {
		    handleSubmit() {
			    //必须是二次验证
			    this.$refs.user.validate((valid)=>{
				    if(valid) {
						this.$store.dispatch('UserReg',this.user)
				    } else {
					    //前端验证未通过
					    console.log('error submit!!')
					    return false
				    }
			    })
		    },
		    toLogin() {
			    this.$router.push({path:'/login'})
		    } 
        }
	}
</script>

<style scope>
  .el-form-item{
    text-align: center
  }
</style>