import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
        // call: store.commit('increment')
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
        // call: store.dispatch('increment')
    }
})

export default store
