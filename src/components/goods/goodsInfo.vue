<template>
    <div class="goodsinfo-container">
        <!-- 加入购物车的小球 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 商品详情页面轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isFull="false"></swiper>
                </div>
            </div>
		</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsInfo.marget_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getCount= "getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车的时候，拿到 数量框 中的 选择的数量
                            1. 讲过分析发现：按钮属于 goodsinfo 页面，数字 属于 numberbox 组件
                            2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取到 选中的商品数量值
                            3. 解决： 因为涉及到了 子组件向父组件传值了（事件调用机制）
                            4. 事件调用机制的本质：子向父传  父向子传递方法，子调用这个方法，同时把 数据当做参数 传递给这个方法
                         -->
                    </p>
                </div>
            </div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/Swiper.vue'
    import numbox from '../subcomponents/GoodsInfo-numbox.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,  // 将路由参数对象中的 id 挂载到data，方便后期调用
                lunbotu: [],  // 轮播图数据
                goodsInfo: [],  // 商品信息
                ballFlag: false, // 控制小球的显示和隐藏
                selectedCount: 1   // 保存用户选中的商品数量，默认，认为用户买1个
            }
        },
        created() {
            this.getLunBo()
            this.getGoodsInfo()
        },
        methods: {
            getLunBo() {  // 获取商品详情页面的轮播图数据
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if(result.body.status === 0) {
                        // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中，只认识 item.img 不认识 item.src
                        result.body.message.forEach(item => {
                            item.img = item.src
                        })
                        this.lunbotu = result.body.message
                    }
                })
            },
            getGoodsInfo() { // 获取商品的信息
                this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                    if(result.body.status === 0) {
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: 'godesc', params: { id }})
            },
            goComment(id) {
                 this.$router.push({name: 'gocomment', params: { id }})
            },
            addShopCar() { //添加到购物车
                this.ballFlag = !this.ballFlag
                // { id: 商品的id, count: 要购买的数量，price: 商品的单价， selected: false}
                // 拼接出一个，要保存到 store 中 car 数组里的对象
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsInfo.sell_price,
                    selected: true
                }
                // 调用 store 中的 mutations 来将商品添加到购物车中
                this.$store.commit("addToCar", goodsinfo)
                
            },
            // 小球动画的钩子函数动画逻辑
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)"
            },
            enter(el, done) {
                el.offsetWidth;   // 强制让页面重绘
                // 要想让小球在手机端能够随时到徽标的位置，那么徽标的位置是动态变化的，不能写死
                /*分析： 要动态获取到 徽标的位置，可以先获取出小球在页面中位置，再获取 徽标在页面中的位置，用 徽标 在页面上的 top值、left值 与 小球的 top left值 相减，就能得到 徽标在页面中动态的位置
                */
               //其中 getBoundingClientRect() 方法 用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性
                // 获取 小球 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                // 获取 徽标 在页面中的位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect()
                // 再把 徽标 的位置 减去小球在页面总的位置，得到 徽标 在页面中的动态位置
                const xDist = badgePosition.left - ballPosition.left
                const yDist = badgePosition.top - ballPosition.top
                // 这里用到了 ES6 中的新语法 ${} 这里的 引号 需要用到 `` 而不是英文状态下的 ''  ""
                el.style.transform = `translate(${xDist}px, ${yDist}px)`
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
                done()  // 必须加的，调用afterEnter()
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count) {
                this.selectedCount = count
                console.log('父组件拿到子组件传递过来的值：' + this.selectedCount)
            }

        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;   // 解决外边距塌陷的问题
        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer {
            display: block;
            button {
                margin: 10px 0;
            }
        }
        .ball {
            width: 15px;
            height: 15px;
            background-color: red;
            z-index: 99;
            border-radius: 50%;
            position: absolute;
            top: 390px;
            left: 148px;
        }
    }
</style>