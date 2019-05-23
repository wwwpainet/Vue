const query = require('../db/')

module.exports = {
   // 创建用户 管理员
   createUser:function ({username,password}){
      return query(`INSERT INTO user(username,password) VALUES('${username}','${password}')`);
   },
   //获取用户
   getUserByName:function(username) {
      return query(`SELECT * FROM user WHERE username = '${username}'`)
   },

   //  创建分类 管理员
   createClass:function ({classType,createTime}){
    return query(`INSERT INTO classify(classType,createTime) VALUES('${classType}','${createTime}')`); 
   },
   // 查询所有分类
   findAllClass:function() {
   	return query(`SELECT * FROM classify`)
   },
   // 编辑分类
   updateClass:function({classId,classType}) {
   	return query(`UPDATE classify SET classType = '${classType}' WHERE id = ${classId}`)
   },
   // 删除分类
   removeClass:function(classId) {
   	return query(`DELETE FROM classify WHERE id = '${classId}'`)
   },
   // 创建文章
   createArticle:function({classType,title,content,contentToMark,createTime,brief}) {
      return query(`INSERT INTO article(classType,title,content,contentToMark,createTime,brief) VALUES('${classType}','${title}','${content}','${contentToMark}','${createTime}','${brief}')`)
   },

   getArticlesList:function(page) {
      if(page) {
         let skip = (page-1)*10;
         return Promise.all([
             query(`SELECT id,classType,title,createTime,brief FROM article ORDER BY id DESC LIMIT ${skip},10`),
             query(`SELECT count(id) FROM article`)
            ])
      }else{
         return query(`SELECT * FROM article ORDER BY id DESC`)
      }
      return query(`SELECT * FROM article`)
   },

   // 获取一篇文章
   getOneArticle(articleId) {
      return query(`SELECT id,classType,title,content,createTime,brief FROM article WHERE id = ${articleId}`)
   },

   // 编辑一片文章
   updateArticle:function({id,classType,title,content,contentToMark,createTime,brief}) {
      return query(`UPDATE article SET 
      classType = '${classType}',
      title = '${title}',
      content = '${content}',
      contentToMark = '${contentToMark}',
      brief = '${brief}'
      WHERE id = ${id}
      `)
   },

   // 删除一片文章
   removeOneArticle(articleId) {
      return query(`DELETE FROM article WHERE id = ${articleId}`)
   },

   //
   lookOneArticle(articleId) {
       return query(`SELECT id,classType,title,content,contentToMark,createTime,brief FROM article WHERE id = ${articleId}`)
   },
   getArticlesByClassify(classType) {
       return query(`SELECT id,classType,title,content,createTime,brief FROM article WHERE classType = '${classType}' ORDER BY id DESC`)
   }
}