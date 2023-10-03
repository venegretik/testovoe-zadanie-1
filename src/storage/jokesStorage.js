import axios from 'axios';
export const jokesStorage = {
    state: () => ({
        searchValue: '',
        jokesArray:[],
        jokesArrayLength: 0,
        isFetch:false,
        textError:''
    }),
    getter: {

    },
    mutations:{
        setSearchValue(state, searchValue){
            state.searchValue = searchValue;
        },
        setTextError(state, textError){
            state.textError = textError;
        },
        clearValues(state){
            state.jokesArray = [];
            state.jokesArrayLength = 0;
        }
    },
    actions: {
        async searchFunc({ state, commit }) {
            state.isFetch = true;
            commit('clearValues');
            axios.get(`https://api.chucknorris.io/jokes/search?query=${state.searchValue}`).then(
                response => {
                    state.isFetch = false;
                    state.jokesArray = response.data.result;
                    state.jokesArrayLength = response.data.total;
                    if(response.data.total == 0){
                        commit('setTextError', `Ничего не найдено по запросу - ${state.searchValue}`);
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        },
    },
    namespaced: true
}