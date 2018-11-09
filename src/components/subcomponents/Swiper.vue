<template>
    <div>
        <!-- 封装轮播图 -->
        <mt-swipe :auto="4000">
            <!-- 将来谁用到轮播图组件 就给它传递  lunbotuList
                此时 lunbotuList 应该是 父组件向子组件传值来设置
             -->
            <mt-swipe-item v-for="(item, index) in lunbotuList" :key="index">
                <img :src="item.img" alt="" :class="{'full': isFull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

        <!-- 分析：商品评论中的轮播图
            1. 首页中的图片，它的宽和高，都是 使用了 100% 的宽度
            2. 在商品详情页中，轮播图的 图片 ，如果也使用 宽购 为 100% 的话，页面不好看
            3. 商品详情页面中的轮播图，期望 高度是100%，但是 宽度 为 自适应
            4. 经分析,得到问题的原因： 首页中的轮播图 和 详情页中的轮播图，分歧点事 宽度到底是100% 还是 自适应
            5. 既然两个轮播图，其他方面都是没有冲突的，只是 宽度有分歧。那么，我们可以定义一个属性，让 使用轮播图的 调用者 ，手动指定 是否为 100% 的宽度
         -->

</template>

<script>
    export default {
        props: ["lunbotuList", "isFull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;
        }
        img {
            // width: 100%;
            height: 100%;
        }
        .full {
            width: 100%;
        }
    }
</style>
