import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
    currentElem:null,
    cur_com_list:[
       ],

    cur_com_type:"",
    cur_com_attr:{},
    cur_com_id:-1



}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})