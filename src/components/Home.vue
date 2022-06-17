<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/header.png" alt="" />
                <span>后台管理系统</span>
            </div>
            <el-button @click="logout" type="info">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width='toggle ? "64px" : "200px"'>
                <div class="toggle-menu" @click="toggleCollapse">|||</div>
                <Aside :menuList="menuList" :toggle="toggle"></Aside>
            </el-aside>
            <!-- 主体区 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
import Aside from './Aside.vue'
export default {
    name: 'Home',
    components: {
        Aside
    },
    data() {
        return {
            menuList: [],
            toggle: false
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList() {
            const { data: res } = await this.$http.get('menus')
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }
            this.menuList = res.data
            console.log(res)
        },
        toggleCollapse() {
            this.toggle = !this.toggle
        }
    },
    // 页面一加载就请求菜单
    created() {
        this.getMenuList()
    }
}
</script>

<style lang="less" scoped>
/* element-ui中的标签名就是类名 */
.el-header {
    background-color: #373d41;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #fff;
    padding-left: 0;
    img {
        width: 200px;
    }
    > div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        span {
            font-size: 20px;
            margin-left: 20px;
        }
    }
}
.el-aside {
    background-color: #373d41;
    .toggle-menu {
        color: #fff;
        background-color: #373d41;
        font-size: 16px;
        height: 20px;
        line-height: 5%;
        text-align: center;
        letter-spacing: 0.2em; //控制文字间距
        cursor: pointer;
    }
}
.el-main {
    background-color: #eaedf1;
}
.home-container {
    height: 100%;
}
</style>
