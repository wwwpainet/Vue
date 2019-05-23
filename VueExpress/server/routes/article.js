const express = require('express')
const router = express.Router()
const api = require('../api/')
const formatDate = require('../middleware/formatDate')
// 创建一片文章
router.post('/create',function(req,res,next) {
	let article = req.body;
	article.createTime = formatDate();

	api.createArticle(article)
	      .then((res)=>{
	      	res.send({
	      		code:200,
	      		message:'发布成功'
	      	})
	      }).catch(err=>{
	      	res.send({
	      		code:-200,
	      		message:'发布失败'
	      	})
	      })

})
// 获取文章列表(带分页获取)
router.post('/lists',function(req,res,next) {
	api.getArticlesList(req.body.page)
	.then((result)=>{
		let articleLists = result[0],
		    total = result[1][0]['count(id)']
		res.send({
			code:200,
			articleLists,
			total
		})
	})
	.catch(err=>{
		res.send({
			code:-200,
			message:err.toString()
		})
	})
})

// 根据articleId获取其中一篇文章
router.post('/onePage',function(req,res,next) {
	api.getOneArticle(req.body.articleId)
	.then((result)=>{
		if(result) {
			// console.log(result)
			res.send({
				code:200,
				oneArticle:result[0]
			})
		}else{
			throw new Error('没有找到该文章')
		}
	}).catch(err=>{
		res.send({
			code:-200,
			message:err.toString()
		})
	})
})

// 编辑文章
router.post('/edit',function(req,res,next) {
	api.updateArticle(req.body)
	.then(()=>{
		res.send({
			code:200,
			message:'编辑成功'
		})
	}).catch(err=>{
		res.send({
			code:-200,
			message:'编辑失败'
		})
	})
})

// 删除一片文章
router.post('/remove',function(req,res,next) {
	api.removeOneArticle(req.body.articleId)
	    .then((result)=>{
	    	res.send({
	    		code:200,
	    		message:'删除成功'
	    	})
	    }).catch(err=>{
	    	res.send({
	    		code:-200,
	    	    message:'删除失败'
	    	})
	    })
})

// 前台
// 获取所有文章(每次返回10个)前台使用
router.post('/articleLists',function(req,res,next) {
	let page = req.body.page
	api.getArticlesList(page)
	    .then((result)=>{
				let articleLists = result[0],
						total = result[1][0]['count(articleId)'],
						totalPage = Math.ceil(total/10),
						hasNext = totalPage>page?1:0,
						hasPrev = page>1;
				res.send({
					code:200,
					articleLists,
					hasNext,
					hasPrev
				})
			})
			.catch(err=>{
				res.send({
					code:-200,
					message:err.toString()
				})
			})
})


// 根据articleId查看其中一篇文章（没有权限）
router.post('/noAuth',function(req,res,next) {
	api.lookOneArticle(req.body.articleId)
	    .then((result)=>{
				if(result) {
					res.send({
						code:200,
						oneArticle:result[0]
					})
				} else {
					throw new Error('没有找到该文章')
				}
			})
			.catch(err=>{
				res.send({
					code:-200,
					message:err.toString()
				})
			})
}),
// 根据classify获取文章列表(前台使用没有权限)
router.post('/noAuthArtilcelists',function(req,res,next) {
	api.getArticlesByClassify(req.body.classify)
	    .then((articleLists)=>{
				res.send({
					code:200,
					articleLists
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