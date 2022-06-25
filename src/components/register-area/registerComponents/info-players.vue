<template>
        <div class="info-player search" v-if="hover && data['name'] !== '' && data['id'] == index">
        <span class="block-info">
            <p class="attributeTitle">Name:<span class="attribute">{{data['name']}}</span></p>
            <p class="attributeTitle">Age:<span class="attribute">{{data['age']}}</span></p>
        </span>
        <span  class="block-info">
            <p class="attributeTitle">Nacionality:<span class="attribute">{{data['nacionality']}}</span></p>
        </span> 
        </div>
</template>
<script>
export default {
  name:"InfoPlayer",
  props: {
    data:Object,
    hover:Boolean,
    index:Number
  }
}
</script>
<style scoped>
.search{
  display:flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  min-width:150px;
  max-width: 500px;
  height: 4rem;
  margin-top: 0.5rem;
  background-color: #F5F5F5;
  border: 0.15rem dashed #e9e3e8;   
}

.info-player{
  position: absolute;
  width:100px;
  height:60px;
  bottom:20px;
}
.block-info{
  justify-content: space-between;
  width:100%;
  padding: 0 1rem;
}
.attributeTitle{
  font-weight: bold;
}
.attribute{
  font-weight: bold;
  align-items:flex-start;
  color:#C60946;
}
</style>