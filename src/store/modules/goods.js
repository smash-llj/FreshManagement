export default {
    namespaced: true,
    state: {
        title: "添加",
        goodsData: {}
    },
    getters: {},
    mutations: {
        changeTitle(state, date) {
            state.title = date
        },
        changeGoods(state, date) {
            state.goodsData = date
        },
    }
}