import Front from '@/components/fronted/Front'
import Home from '@/components/fronted/Home'
import Article from '@/components/fronted/Article'
import Project from '@/components/fronted/Project'
import Tags from '@/components/fronted/Tags'
import NotFound from '@/components/NotFound'
import ClassList from '@/components/backEnd/ClassList'
import ArticleList from '@/components/backEnd/ArticleList'
import ArticleCreate from '@/components/backEnd/ArticleCreate'
import articleEdit from '@/components/backEnd/articleEdit'
import Reg from '@/components/backEnd/Reg'
import Login from '@/components/backEnd/Login'
import Admin from '@/components/backEnd/Admin'

export default [

    {
      path:'/login',
      component:Login,
      meta: { auth: false }
    },
    {
      path: '/reg',
      component: Reg,
      meta: { auth: false }
    },
    // 前台路由
    {
      path: '/',
      component: Front,
      children: [
        {
          path: '',
          redirect: 'home',
          meta: { auth: false }
        },
        {
          path: 'home',
          component: Home,
          meta: { auth: false }
        },
        {
          path: 'article/:id',
          component: Article,
          meta: { auth: false }
        },
        {
          path: 'tags',
          component: Tags,
          meta: { auth: false } 
        },
        {
          path: 'project',
          component: Project,
          meta: { auth: false } 
        }
      ]
    },
    // 后台路由
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
          path: '',
          redirect: 'articleList'
        },
        {
          // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
          path: 'articleList',
          component: ArticleList,
          name: '文章管理'
        },
        {
          // 创建文章单独一个组件
          path: 'articleCreate',
          component: ArticleCreate,
          name: '创建文章'
        },
        {
          path: 'articleEdit/:articleId',
          component: articleEdit,
          name: '编辑文章'
        },
        {
          path: 'classList',
          component: ClassList,
          name: '分类管理'
        }
      ]

    },
    {
      path: '*',
      component: NotFound
    }
  
]