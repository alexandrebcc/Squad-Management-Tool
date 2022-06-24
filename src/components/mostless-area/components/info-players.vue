<template>
<div>
    <div class="info-player" v-if="hover && data['name'] !== ''">
        <span class="block-info">
            <p class="attributeTitle">Name:<span class="attribute">{{data['name']}}</span></p>
        </span>
    </div>
</div>
</template>
<script>
export default {
  name:"InfoPlayer",
  props: {
    data:Array,
    hover:Boolean,
  }
}
</script>
<style scoped>

.info-player{
  display:flex;
  align-items:center;
  position: fixed;
  opacity:0.8;
  top:500px; 
  min-width:150px;
  max-width: 500px;
  width:100px;
  height:60px;
  bottom:20px;
  background-color:var(--color-border)
}
.block-info{
  justify-content: space-between;
  width:100%;
  padding: 0 1rem;
}
.attributeTitle{
  font-weight: bold;
  color:#0e0004
}
.attribute{
  font-weight: bold;
  align-items:flex-start;
  color:var(--color-maguent-bold);
}
</style>