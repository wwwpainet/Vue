<template>
    <article>
      <header>
        <div>
          <router-link class="article_title" :to="{path:`/article/${articleItem.id}`}">{{articleItem.title}}</router-link>
        </div>
        <div>
          <p class="article_creatAt">{{articleItem.createTime}}</p>
        </div>
      </header>
      <section class="article_main">{{articleItem.brief}}</section>
      <footer>
        <router-link class="article_readMore" :to="{path:`/article/${articleItem.id}`}">阅读全文>></router-link>
      </footer>
    </article>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['articleItem']
}
</script>

<style scoped>
    .article_title {
        display: block;
        font-size: 2.6rem;
        font-weight: 400;
        color: #404040;
        padding: .8rem 0;
    }
    .article_creatAt {
        font-family: "Comic Sans MS", curslve, sans-serif;
        font-size: 1.6rem;
        color: #7f8c8d;
        margin: 0;
    }
    .article_main {
        font-size: 1.6rem;
        color: #34495e;
        line-height: 1.6em;
        /*padding:0.6rem 0;*/
    }
    footer {
        text-align: right;
    }
    .article_readMore {
        font-size: 2rem;
        color: #919191;
        font-weight: 600;
    }
    .article_title:hover {
        opacity: 0.5;
    }
    .article_readMore:hover {
        opacity: 0.6;
    }
    @media screen and (max-width:786px) {
        .article_title {
            font-size: 1.8rem;
            line-height: 1.5em;
        }
        .article_creatAt {
            font-size: 1.4rem;
        }
    }
    @media screen and (max-width:480px) {
        .article_main {
            font-size: 1.4rem;
        }
        .article_readMore {
            font-size: 1.8rem;
        }
    }
</style>