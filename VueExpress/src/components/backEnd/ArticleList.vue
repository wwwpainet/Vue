<template>
  <el-row>
	<el-row style="padding:10px 15px">
		<el-col>
			<el-button size="small" type="primary" style="float:right" @click="createArticle">创建文章</el-button>
		</el-col>
	</el-row>

	<el-row>
		<el-col>
			<el-table style="width:100%" :data="articleLists" v-loading="listLoading" element-loading-text="拼命加载中" align="center" >
				<el-table-column type="index" width="60"></el-table-column>
				<el-table-column prop="createTime" min-width="200" label="创建时间"></el-table-column>
				<el-table-column prop="classType" min-width="150" label="所属分类"></el-table-column>
				<el-table-column prop="title" min-width="180" label="文章标题"></el-table-column>
				<el-table-column min-width="180" label="操作">
					<template slot-scope='scope'>
						<el-button size="small" @click="read(scope.row.id)">查看</el-button>
						<el-button size="small" type="primary" @click="editArticle(scope.row.id)">编辑</el-button>
						<el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>

	<el-row>
		<el-col class="page">
			<el-pagination background :total="total" @current-change="handle" layout="prev, pager, next" :page-size="limit" style="float:right"></el-pagination>
		</el-col>
	</el-row>
  </el-row>
</template>

<script>
	export default {
		data() {
			return {
				articleLists: [],
				page:1,  //当前页
				total:0,  //默认数据总数
				limit:10, //默认每页数据量
				listLoading: false
			}
		},
		methods: {
			handle(val) {
				this.page = val
				this.getLists()
			},
			getLists() {
				this.listLoading = true
				this.$api.getArticleList({page:this.page})
				   .then(({data:{articleLists,total}})=>{
				   	 setTimeout(()=>{
				   	 	this.listLoading = false
				   	 	this.articleLists = articleLists
				   	 	this.total = total
				   	 },500)
				   })
			},
			read(articleId) {
				this.$router.push({path:`/article/${articleId}`})
			},
			remove(articleId) {
				this.$confirm('确认要删除吗','提醒',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'waring'
				})
				.then(()=>{
					this.listLoading = true
					this.$api.removeOneArticle({articleId})
					    .then(()=>{
					    	this.listLoading = false
					    	this.$notify({
					    		title:'成功',
					    		message:'删除成功',
					    		type:'success'
					    	})
					    	this.getLists()
					    })
				}).catch((err)=>{
					console.log(err)
				})
			},
			editArticle(articleId) {
				this.$router.push({path:`/admin/articleEdit/${articleId}`})
			},
			createArticle() {
				this.$router.push({path:'/admin/articleCreate'})
			}
		},
		mounted() {
			this.getLists()
		}
	}
</script>

<style scope>
  .page{
    padding:10px;
    background:#fff;
  }	
</style>