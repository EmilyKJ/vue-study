<template>
    <div class="newsInfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsInfoList.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsInfoList.add_time | dateFormat}}</span>
            <span>点击：{{ newsInfoList.click }}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsInfoList.content"></div>
        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    // 1. 导入评论子组件
    import comment from '../subcomponents/comment.vue'
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsInfoList: []  // 新闻资讯详情列表
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() { // 获取新闻资讯详情列表
                this.$http.get('api/getnew/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.newsInfoList = result.body.message[0]
                    }else {
                        Toast('获取新闻资讯详情列表失败')
                    }
                })
            }
        },
        components: {  // 用来注册子组件的节点
            "comment-box": comment
        },
    }
</script>

<style lang="scss" scoped>
    .newsInfo-container {
        padding: 0 5px;
        .title {
            font-size: 16px;
            color: red;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
            /deep/img {
                width: 100%;
            }
        }
    }
</style>
