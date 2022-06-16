import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../components/Login";
import Home from "../components/Home";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        // 重定向到指定地址
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/home",
        component: Home
    }
];

const router = new VueRouter({
    routes
});
//挂载路由守卫控制访问权限
router.beforeEach((to, from, next) => {
    //to 即将访问的url
    //from 从哪一个路径跳转
    //next 表示放行
    if (to.path === "/login") return next();

    //获取tokenStr
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) return next("/login");
    next();
});
export default router;
