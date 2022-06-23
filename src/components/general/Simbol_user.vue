<template>
    <div class="icon">
        {{initial}}
    </div>
</template>

<script>
 export default {
        name:"SimbolUser",
        props: ["initials_name"],
        data(){
            return{
                initial:""
            }},
        created(){
            this.select_initials();
        },
        methods: {
            select_initials(){
                let complete_name = this.initials_name.split(" ");
                this.initial = complete_name[0][0]+complete_name[complete_name.length-1][0]
            }
        }
    
    }
    

</script>

<style scoped>
.icon{
    display: flex;
    color:#701A5A;
    text-transform: uppercase;
    font-weight: bold;
    background-color: #F3F5F7;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
}
</style>
