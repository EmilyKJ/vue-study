import Vue from 'vue'
// 导入 vuex 
import Vuex from 'vuex'
// 注册 vuex
Vue.use(Vuex)
//为了不让每次刷新，购物车中的数据都清空， 每次刚进入网站，肯定会 调用 main.js ，在刚被调用的时候，先从本地存储中，把 购物车中的数据读出来，放到 store 中的 car 上
// 用 字符串中的 JSON.parse() 方法，将字符串转换成数组
var car = JSON.parse(localStorage.getItem('car') || '[]')


var store = new Vuex.Store({
    state: {  // this.$store.state.***
        car: car  // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象，例如： { id: 商品的id, count: 要购买的数量，price: 商品的单价， selected: false}
    },
    mutations: {  // this.$store.commit('方法名'，'按需传入需要的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车后，把商品信息，保存到 store 中的car上
            /* 分析：
            1. 如果购物车中，之前就已经有这个对于的商品了，那么，只需要更新数量
            2. 如果没有，则直接把 商品数据，push 到 car 中即可
            some() 方法，找到想要的数据就停止，不是为了循环每一项
            */ 
           // 假设 在购物车中，没有找到对应的商品
           var flag = false  
           state.car.some(item => {  // item.id 指的是 购物车里面这一项的id
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true  // 找到了就终止后面的循环
                }
           })
           //如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
           if(!flag) {
               state.car.push(goodsinfo)
           }

           // 当 更新 car 之后，把 car 数组，存储到 本地 localStorage 中
           // 得到的 car 是一个数组，需要 用 JSON.stringify() 序列化成字符串
           localStorage.setItem("car", JSON.stringify(state.car))

        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当数据修改商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            // 根据id ，从 store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if(item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将 删除完毕后的最新的购物车数据 同步到 本地存储中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updataGoodsSelected(state, info) {
            state.car.some(item => {
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 将 更新完毕后的最新的购物车数据 同步到 本地存储中
            localStorage.setItem("car", JSON.stringify(state.car))
        }
        
    },
    getters: {  // this.$store.getters.***
        // getters 相当于 计算属性 computed ，也相当于 filters
        getAllCount(state) {
            var c = 0   // 先定义一个中间变量 c  总数量 默认为0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}  // 先定义一个空对象
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}  // 先定义一个空对象，给这个对象添加属性名为 id，属性值为 selected
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0  // 勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})
export default store