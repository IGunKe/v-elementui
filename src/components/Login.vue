<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="profile_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 登陆表单 -->
            <el-form
                status-icon
                :model="loginForm"
                ref="loginForm"
                :rules="rules"
            >
                <el-form-item label="用户名" label-width="65px" prop="username">
                    <el-input
                        type="text"
                        autocomplete="off"
                        prefix-icon="iconfont icon-yonghu"
                        v-model="loginForm.username"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="65px" prop="password">
                    <el-input
                        type="password"
                        autocomplete="off"
                        prefix-icon="iconfont icon-mima"
                        v-model="loginForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="50px">
                    <el-button type="primary" class="btn1" @click="onSubmit"
                        >提交</el-button
                    >
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 16,
                        message: '长度在 5 到 16 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入用户密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 16,
                        message: '长度在 6 到 16 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.loginForm.validate(async (valid) => {
                //console.log(valid);
                if (!valid) {
                    return
                }
                const { data: res } = await this.$http.post(
                    'login',
                    this.loginForm
                )
                console.log(res)
                if (res.status !== 200) {
                    return this.$message({
                        showClose: true,
                        message: '用户名或密码错误！',
                        type: 'error',
                        center: true
                    })
                }
                //提示login成功
                this.$message({
                    showClose: true,
                    message: '登陆成功',
                    type: 'success',
                    center: true
                })
                //存储token保证只在当前窗口生效
                window.sessionStorage.setItem('token', res.token)
                //跳转页面
                this.$router.push('/home')
            })
        },
        resetForm(loginForm) {
            //console.log(this);
            this.$refs[loginForm].resetFields()
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        .profile_box {
            width: 100px;
            height: 100px;
            margin-top: -40px;
            border: 1px solid #eee;
            border-radius: 50%;
            overflow: hidden;
            outline: 1px solid #eee;
            outline-offset: 10px;
            box-shadow: 0 0 15px #ddd;
            img {
                width: 100%;
                height: 100%;
                border: 1px solid #eee;
                background-color: #eee;
            }
        }
    }
}
.btn1 {
    margin-right: 20px;
    margin-left: 20px;
}
.el-form {
    width: 300px;
}
</style>
