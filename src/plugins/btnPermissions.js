import Vue from 'vue'

/**权限指令**/
const has = Vue.directive('has', {
    inserted: function (el, binding) {
        console.log(binding, "w")
        // 获取按钮权限// 获取按钮权限
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    console.log("value", value)
    console.log("btnPermissions", btnPermissionsStr == 200)
    console.log("btnPermissions", btnPermissionsStr)
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    isExist = btnPermissionsStr==value;
    console.log("isExist", isExist)
    return isExist;
};
export { has }


