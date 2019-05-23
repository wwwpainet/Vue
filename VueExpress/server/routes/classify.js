const express = require('express')
const router = express.Router()
const api = require('../api/')
const formatDate = require('../middleware/formatDate')

router.post('/create',function(req,res,next) {
	let classify = {
		classType:req.body.classType,
		createTime:formatDate()
	}

	api.createClass(classify)
	     .then(()=>{
	     	res.send({
	     		code:200,
	     		message:'创建成功'
	     	})
	     }).catch(err=>{
	     	res.send({
	     		code:-200,
	     		message:'创建失败'
	     	})
	     })
})

//获取所有分类
router.get('/lists',function(req,res,next){
	api.findAllClass()
	.then((lists)=>{
		res.send({
			code:200,
			lists
		})
	})
	.catch(err=>{
		res.send({
			code:-200,
			message:err.toString()
		})
	})
})

//编辑分类
router.post('/edit',function(req,res,next) {
	api.updateClass(req.body)
	.then((result)=>{
		res.send({
			code:200,
			message:'编辑成功'
		})
	})
	.catch(err=>{
		res.send({
			code:-200,
			message:'编辑失败'
		})
	})
})

//删除分类
router.post('/remove',function(req,res,next) {
	api.removeClass(req.body.classId)
	.then((result)=>{
		res.send({
			code:200,
			message:'删除成功'
		})
	})
	.catch(err=>{
		res.send({
			code:-200,
			message:'删除失败'
		})
	})
}),

// 无权限获取分类给前台使用
router.get('/noAuth',function(req,res,next) {
	api.findAllClass()
	.then((lists)=>{
		res.send({
			code:200,
			lists
		})
	})
	.catch(err=>{
		res.send({
			code:-200,
			message:err.toString()
		})
	})
})

module.exports = router