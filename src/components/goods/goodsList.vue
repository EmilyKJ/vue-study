<template>
    <div class="goods-list">
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
            goDetail(id) {
                this.$router.push("/home/goodsinfo/" + id)
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