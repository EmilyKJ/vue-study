<template>
  <div class="">
    <!-- 轮播图部分 -->
    <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>
    <!-- 改造九宫格为六宫格 -->
     <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a>
        </li>       
    </ul> 
  </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import swiper from '../subcomponents/Swiper.vue'

    export default {
        data() {
            return {
                lunbotuList: [] // 保存轮播图的数组
            }
        },
        created() {
            this.getLunbotu()
        },
        methods: {
            getLunbotu() {
                // 获取轮播图数据的方法
                this.$http.get("api/getlunbo").then(result => {
                    // console.log(result.body)
                    if(result.body.status === 0) {
                        // 成功了
                        this.lunbotuList = result.body.message
                    }else {
                        Toast('加载轮播图失败')
                    }
                })
            }
        },
        components: {
            swiper
        }
    }
</script>

<style scoped lang="scss">
    

    .mui-grid-view.mui-grid-9 {
        background: #fff;
        img {
            width: 60px;
            height: 60px;
        }
        li {
            border: 0;
        }
        .mui-media-body {
            font-size: 14px;
        }

    }
</style>
