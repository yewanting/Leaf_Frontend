const CURRENTELEM = 'CURRENTELEM'
const CURCOMLIST = 'CURCOMLIST'
const TITLECHOICE = 'TITLECHOICE'
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

    [TITLECHOICE](state,res){
        state.title_choice = res   
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