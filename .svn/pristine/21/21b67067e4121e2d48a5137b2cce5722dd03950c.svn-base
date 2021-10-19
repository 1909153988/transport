<template>
    <div class="registersuccessful">
        
        <div class="recontent">
            <span @click="goTo('/register')">返回</span>
            <div>恭喜您,注册成功</div>
            <div>
                  <el-button type="primary" @click="goTo('/login')"> 立即登录，完成认证</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JushengConsignUiIndex',
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        goTo(path){
            this.$router.push(path);
        }
    },
};
</script>

<style lang="scss" scoped>
.registersuccessful{
     display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../../assets/images/loginbg.jpg");
    background-size: cover;
}
.recontent{
      display: flex;
    flex-direction:column;
    height: 280px;
         border-radius: 6px;
        background: #cccc;
        width: 500px;
        padding: 0px 25px 5px 25px;
            justify-content: space-between;
}
.recontent div{
    text-align: center;
        font-size: 24px;
            padding-top: 25px;
}
.recontent span{
    margin-top: 20px;
}
.recontent .el-button{
    margin-bottom: 30px;
    width: 300px;
}
</style>