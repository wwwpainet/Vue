import Vue from 'vue'
import api from '../api'
import router from '../router'

export default {
	//后台登录
	UserLogin({commit},data) {
		api.localLogin(data)
		    .then(({data})=>{
				if(data.code==200) {
					console.log(data.token)
					//找到用户
					commit('USER_SIGNIN',data.token)
					//替换路由
					router.replace({path:'/admin/articleList'})
				} else {
					// 没找到用户或者密码不对
					Vue.prototype.$message({
						message: data.message,
						type: 'error',
						showClose: true
					})
				}
			})
			.catch(error=>{
				// 一般服务器连接不上这里就会报网络错误
				Vue.prototype.$message({
					message: error.toString(),
					type: 'error',
					showClose: true
				})
			})
	},
	//后台注册
	UserReg({commit},data) {
		api.localReg(data)
		    .then(({data})=>{
		    	// console.log(data)
		    	if(data.code==200) {
		    		commit('USER_REG',data.token)
		    		router.replace({path:'/admin'})
		    	}else{
					Vue.prototype.$message({
						message:data.message,
						type:'error',
						showClose:true
					})
		    	}
		    }).catch((error)=>{
				Vue.prototype.$message({
					message:error.toString(),
					type:'error',
					showClose:true
				})
			})
	},
	// 注销
	UserLogout({commit}){
		commit('USER_SIGNOUT');
		router.push({path:'/login'});
	},
	showProgress({commit},number) {
		commit('SHOW_PROGRESS',number)
	},
	changeHeadLine({commit},headline) {
		commit('HEAD_LINE',headline)
	}
}