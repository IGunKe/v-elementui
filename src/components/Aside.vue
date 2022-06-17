<template>
    <el-menu
        background-color="#373d41"
        text-color="#fff"
        active-text-color="#409EFF"
        :unique-opened='true'
        :collapse='toggle'
        :collapse-transition='false'
    >
        <el-submenu :index="item.id + ''" v-for='item in menuList' :key='item.id'>
            <template slot="title">
                <i :class="iconList[item.id]"></i>
                <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="val.id + ''" v-for='val in item.children' :key='val.id'>
                <i class="el-icon-menu"></i>
                <span slot="title">{{val.authName}}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'Aside',
    props: ['menuList', 'toggle'],
    data() {
        return {
            iconList: {
                '101': 'iconfont icon-haoyou',
                '102': 'iconfont icon-shangpin',
                '103': 'iconfont icon-yonghu',
                '104': 'iconfont icon-dingdandingdanmingxishouzhimingxi',
                '105': 'iconfont icon-shuzhuangtu'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.iconfont {
    margin-right: 2vh;
}
.el-menu {
    border-right: 0;
}
</style>
