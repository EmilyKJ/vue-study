<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
// 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
    data() {
        return {
            id: this.$route.params.id  // 获取商品详情的id
        }
    },
    components: {
        comment
    }
}
</script>

<style lang="scss" scoped>
    
</style>