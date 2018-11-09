<template>
   
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
        <!-- 分析： 子组件什么时候把 数据 传递给父组件         -->
</template>

<script>
    import mui from '../../assets/mui/js/mui.min.js'
    export default {
        mounted() {
            mui(".mui-numbox").numbox()
        },
        methods: {
            countChange() {
                // 数量改变了 每当数据改变，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
                this.$store.commit("updateGoodsInfo", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })

            }
        },
        props: ["initCount", "goodsid"]
    }

</script>

<style lang="scss" scoped>
    
</style>