<template>
<div class="shopcar-container">
  <div class="goods-list">
    <!-- 商品列表项区域 -->
    <div class="mui-card" v-for="(item, index) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch 
          v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
          <img :src="item.thumb_path">
          <div class="info">
            <h1>{{ item.title }}</h1>
            <p>
              <span class="price">￥{{ item.sell_price }}</span>
              <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id" readonly></numbox>
              <!-- 如何从购物车中获取商品的数量呢
                1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，把 当前循环这条商品的 id ，作为 对象 的属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 87: 2, 89: 3, 90: 5 }
               -->
              <a href="#" @click.prevent="remove(item.id, index)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- 结算区域 -->
  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner jiesuan">
        <div class="left">
          <p>总计（不含运费）</p>
          <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount}}</span></p>
        </div>
        <mt-button type="danger">去结算</mt-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import numbox from '../subcomponents/ShopCar-numbox.vue'

export default {
  data() {
    return {
      goodsList: [] // 获取购物车中的商品列表
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      //1. 获取到  store 中car 里 所有的商品的 id ，然后拼接处一个 用逗号分隔的 字符串 join("|") 方法
      var idArr = []  // 先定义一个 空的id数组  ,然后循环 car 数组中的每一项的id，并 push 进去这个定义的 id数组中去
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 
      if(idArr.length <= 0) {
        return
      }
      // 获取购物车中的商品列表
      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
        if(result.body.status === 0 ){
            this.goodsList = result.body.message
        }
      })
    },
    remove(id, index) {
        // 点击删除，把商品从 store 中本剧 传递的 id 删除，同时，把当前组件中的 goodslist 中，对应要删除的那个商品，使用 index ；来删除
        this.goodsList.splice(index, 1)
        this.$store.commit('removeFromCar', id)
    },
    selectedChanged(id, val) {
      // 每当点击开关把最新的状态同步到 store 中去
      // console.log(id + '---' + val)
      this.$store.commit("updataGoodsSelected", { id, selected: val})
    }
  },
  components: {
    numbox
  }
}
</script>

<style scoped lang="scss">
  .shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
