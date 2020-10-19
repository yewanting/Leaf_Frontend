const CURRENTELEM = 'CURRENTELEM'
const CURCOMLIST = 'CURCOMLIST'
const TITLECHOICE = 'TITLECHOICE'
const CURCOMTYPE = 'CURCOMTYPE'
const CURCOMATTR = 'CURCOMATTR'
const CURCOMID = 'CURCOMID'
const IFYES = 'IFYES'
const IFSHOWYESNO = 'IFSHOWYESNO'
const DELETECOMPONENT = 'DELETECOMPONENT'
const COURSERFORM = 'COURSERFORM'
const CURMOVEID = 'CURMOVEID'
const MAINVIEW = 'MAINVIEW'

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
    [IFYES](state,res){
        state.if_yes = res
    },
    [IFSHOWYESNO](state,res){
        state.if_show_yes_no = res
    },
    [DELETECOMPONENT](state,res){
        state.delete_component = res
    },
    [COURSERFORM](state,res){
        state.course_form = res
    },
    [CURMOVEID](state,res){
        state.cur_move_id = res
    },
    [MAINVIEW](state,res){
        state.main_view = res
    }

}