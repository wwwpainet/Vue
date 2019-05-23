<template>
<div>
  <el-row>
    <el-row style="padding:10px 15px; background:#fff;">
      <el-col>
        <el-button size="small" type="primary" @click="addClass" style="float:right">添加分类</el-button>
      </el-col>
    </el-row>
  </el-row>
  
  <el-row>
    <el-col>
      <el-table style="width:100%" align="center" :data="lists" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column type='index' width="60"></el-table-column>
        <el-table-column prop="createTime" min-width="180" label="创建时间"></el-table-column>
        <el-table-column prop="classType" min-width="180" label="分类名称"></el-table-column>
        <el-table-column min-width="200" label="操作">
          <template slot-scope='scope'>
            <el-button size="small" type="primary" @click="editClass(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>


  <el-row>
    <el-col>
      <el-dialog :title="formTitle" :visible.sync="formVisible">
        <el-form :model="classifyInf" label-width="120px" ref="classifyInf" :rules="formRule">
          <el-form-item label="分类名称" prop="classType">
            <el-input v-model="classifyInf.classType" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="formVisible = false">取消</el-button>
          <el-button type="primary" @click="editSubmit" :loading="editLoading">{{btnText}}</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {sub} from '../../assets/js/commen'
export default {
  data () {
    return {
       lists: [],
       listLoading: false,
       formTitle: '',
       formVisible: false,
       classifyInf: {
        classId: 0,
        classType: ''
       },
       formRule: {
        classType: [{
           required: true,
           message: '请输入分类名称',
           trigger: 'blur'
        }]
       },
       editLoading: false,
       btnText: '提交'
    }
  },
  methods: {
    getLists() {
      this.listLoading = true
      this.$api.getClassify()
         .then((result)=>{
          setTimeout(()=>{
            this.listLoading = false
            this.lists = result.data.lists
          },500)
         })
    },
    remove(classId) {
      this.$confirm('确认要删除吗?','提醒',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      })
      .then(()=>{
        this.listLoading = true
        this.$api.removeClassifyList({
          classId
        })
        .then(({
          data: {
            code,
            message
          }
        }) => {
          this.listLoading = false
          // 这里需要优化
          if(code == 200) {
            this.$notify({
              title: '成功',
              message,
              type: 'success'
            })
          } else if(code == 401) {
            this.$notify({
              title: '失败',
              message,
              type: 'error'
            })
            setTimeout(() => {
              this.$router.replace({
                path: '/login'
              })
            }, this.$con.BACKLOADTIME)
            return false //阻止继续执行
            // 需要优化
          }
          this.getLists()
        }).catch(err => {
                // 这里可以跳转到错误页面
        })
      }).catch((err) => {})
    },
    addClass() {
      this.formVisible = true;
      this.formTitle = '新增';
      this.classifyInf.classType = '';
    },
    editClass(row) {
      this.formVisible = true;
      this.formTitle = '编辑'
      this.classifyInf.classType = row.classType
      this.classifyInf.classId = row.id
    },
    editSubmit() {
      this.$refs.classifyInf.validate(valid=>{
        if(valid) {
          this.btnText = '提交中'
          this.editLoading = true
          //新增分类
          if(this.formTitle == '新增') {
            // 这里又是一个异步提交
            this.$api.addClassify({
              classType: this.classifyInf.classType
            })
            .then((res)=>{
              sub(this, res)
            })
          }else{
            //编辑
            this.$api.editClassfy({
              classId:this.classifyInf.classId,
              classType:this.classifyInf.classType
            })
            .then((res)=>{
              sub(this, res)
            })
          }
        }
      })
    }
  },
  mounted() {
    this.getLists()
  }
}
</script>

<style scoped>

</style>
