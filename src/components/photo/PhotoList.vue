<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="(item, index) in cates" :key="index" @click="getPhotoCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

		</div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="(item, index) in list" :key="index" :to="'/home/photoInfo/' + item.id " tag="li">
                <img v-lazy="item.img_url">
                <div class="photo-info">
                    <div class="photo-title">{{ item.title }}</div>
                    <div class="photo-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // 1. 导入 mui 的 js 文件
    import mui from '../../assets/mui/js/mui.min.js'
    // 2. 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    export default {
        data() {
            return {
                cates: [], // 所有分类的列表数组
                list: []  // 所有的图片列表数组
            }
        },
        created() {
            this.getAllCategory(),
            this.getPhotoCateId(0)  //  默认进入页面就请求所有图片
        },
        methods: {
            getAllCategory() { // 获取所有的图片分类
                this.$http.get("api/getimgcategory").then(result => {
                    if(result.body.status === 0 ) {
                        // 手动拼接处一个最完整的 分类列表
                        result.body.message.unshift({ title: '全部', id: 0})
                        this.cates = result.body.message
                    }
                })
            },
            getPhotoCateId(cateId) {
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if(result.body.status === 0 ) {
                        this.list = result.body.message
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }
    
    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .photo-info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 85px;
                .photo-title {
                    font-size: 14px;
                }
                .photo-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>
