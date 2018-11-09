<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1>{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->
        <!-- 在网页中，router 有两种跳转方式
            方式一：使用 a 标签 的相识进行跳转
            方式二： 使用 window.location.href 的形式，叫做 编程式导航
         -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1>{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageIndex: 1,
                goodslist: []  // 商品列表数组
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                this.$http.get("api/getgoods?pageindex=" + this.pageIndex).then(result => {
                    if(result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message)
                    }
                })
            },
            getMore() {
                this.pageIndex++
                this.getGoodsList()
            },
            goDetail(id) {   // 使用 js 代码的形式进行路由导航  router 的实例方法
                /*
                注意： 一定要区分 this.route 和 this.router 这两个对象
                其中： this.$route 是路由 【参数对象】，所有路由中的参数，params, query 都属于它
                其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 js 代码，实现路由的 前进 后退 跳转到新的 URL 地址
                */
                 //1.直接传递一个路径            
                // this.$router.push("/home/goodsinfo/" + id)
                // 2. 传递一个对象
                // this.$router.push({ path: "/home/goodsinfo/" + id})
                // 3. 传递命名的路由(需要在定义的路由规则对象中添加name属性)
                this.$router.push({ name: "goodsinfo", params: { id }})
            }
        }

    }

</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;  // 自动换行
        justify-content: space-between; // 设置里面的内容左右各一个
        padding: 7px;
        .goods-item {
            width: 49%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            min-height: 293px;
            h1 {
                font-size: 14px;
            }
            img {
                width: 100%;
            }
            .info {
                background-color: #eee;
                p {
                    padding: 5px;
                    margin: 0;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: 700;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>