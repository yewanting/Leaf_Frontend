const CURRENTELEM = 'CURRENTELEM'
const CURCOMLIST = 'CURCOMLIST'
const CURCOMTYPE = 'CURCOMTYPE'
const CURCOMATTR = 'CURCOMATTR'
const CURCOMID = 'CURCOMID'

export default {
    [CURRENTELEM](state,res){
        state.currentElem = res   
    },


    [CURCOMLIST](state,res){
        state.cur_com_list = res   
    },

    [CURCOMTYPE](state,res){
        state.cur_com_type = res   
    },

    [CURCOMATTR](state,res){
        state.cur_com_attr = res   
    },

    [CURCOMID](state,res){
        state.cur_com_id = res   
    },
  
  
}