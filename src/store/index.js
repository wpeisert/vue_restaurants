import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
    state () {
        return {
            data: {
                products: [],
            },
            categories: [],
            products: [],
            loaded: false,
            category_id: 0,
            order: { products: []}
        }
    },
    mutations: {
        loadData (state) {
            axios.get('/products/example-data.json')
                .then((response) => {
                    state.data = response.data;
                    state.categories = state.data.categories;
                    if (state.data.settings.show_all_products) {
                        state.categories.unshift({id: 0, name: "Wszystko"});
                        state.category_id = 0;
                    } else {
                        state.category_id = state.categories[0].id;
                    }
                    state.loaded = true;
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                });
        }
        // call: store.commit('increment')
    },
    actions: {
        loadData(context) {
            context.commit('loadData');
        },
        // call: store.dispatch('increment')
    }
})

export default store
