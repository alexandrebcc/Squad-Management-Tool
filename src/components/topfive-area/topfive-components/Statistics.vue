<template>
    <div class="informations">
        <h1>{{title}}</h1>
        <div class="block">
            <section class="item" v-for="datafive in data" v-bind:key="datafive.id" @click="hoverActive">
                <span>{{datafive.name}}</span>
                <span><b>{{datafive.punctuation}}</b></span>                    
            </section>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        data:Array,
        title:String
    }
}
</script>
    
<style scoped>
  
  
  
  .informations{
    width:100%;
    margin: 1rem 1rem;
  }

  .informations h1{
   padding-bottom:1rem;
     }
  .block{
        background-color:#E9E3E8;
        padding:1px;     
        
    }
    .item{
        display:flex;
        flex-direction: inline;
        height:3rem;
        padding: 15px;
        background-color: #FFFFFF;
        margin:2px; 
        align-items: center;
        justify-content: space-between;
        transition: 0.3s; 
    }

    .block, .item{
        border-radius:0.5rem;
    }
    .item:hover{
        border: 0.1rem solid #B91053;
      
    }
</style>