import { createStore } from 'vuex';

export default createStore({
    state: {
        selectedCategoryId: 0, // 默认值
    },
    mutations: {
        setSelectedCategoryId(state, id) {
            state.selectedCategoryId = id;
        },
    },
    actions: {
        updateSelectedCategoryId({ commit }, id) {
            commit('setSelectedCategoryId', id);
        },
    },
});