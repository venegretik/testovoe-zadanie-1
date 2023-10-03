import { createStore } from 'vuex';
import {jokesStorage} from './jokesStorage.js'
export default createStore({
    modules: {
        jokesStorage:jokesStorage
    }
});