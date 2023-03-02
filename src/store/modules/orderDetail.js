export default {
    namespaced: true,
    state: {

        orderData: {}
    },
    mutations: {
        changeOrder(state, date) {
            state.orderData = date
        },
    }
}