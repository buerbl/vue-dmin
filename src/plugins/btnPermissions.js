import Vue from 'vue'

/**权限指令**/
const has = Vue.directive('has', {
    inserted: function (el, binding) {
        console.log(binding, "w")
        // 获取按钮权限// 获取按钮权限
        if (!Vue.prototype.$_has(binding.expression)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    btnPermissionsStr = JSON.parse(btnPermissionsStr);
    btnPermissionsStr = btnPermissionsStr[0].buttonPermissin;
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    for(const v of btnPermissionsStr){
        if(v==value){
            isExist = v==value;
            break;
        }
        isExist = v==value;
        
    }
    return isExist;
};
export { has }


