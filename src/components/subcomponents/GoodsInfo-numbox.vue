<template>
    <!-- 问题： 不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 
        可以使用 watch 属性来监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值
        -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
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
                // console.log(this.$refs.numbox.value)
                this.$emit('getCount', parseInt(this.$refs.numbox.value))
            }
        },
        props: ["max"],  //  父向子传  用props 属性 来定义一下父组件中绑定的属性
        watch: { // 监视某个属性
            'max': function(newval, oldvalue) {
                mui('.mui-numbox').numbox().setOption('max',newval)
            }
        }

    }

</script>

<style lang="scss" scoped>
    
</style>