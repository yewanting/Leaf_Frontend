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
    title_choice:"组件样式",
    cur_com_type:"",
    cur_com_attr:{},
    cur_com_id:-1,
    if_show_yes_no:0,
    if_yes:"否",
    delete_component:null,
    course_form:"详细列表",
    cur_move_id:-1
    



}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})