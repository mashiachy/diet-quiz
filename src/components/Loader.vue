<template>
  <div>
    <div class="loader">Loading</div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
  }
</script>

<style lang="sass">
  .loader, .loader:after 
    border-radius: 50%
    width: 64px
    height: 64px
  .loader 
    margin: 60px auto
    font-size: 10px
    position: relative
    text-indent: -9999em
    border-top: 8px solid rgba(255, 255, 255, 0.2)
    border-right: 8px solid rgba(255, 255, 255, 0.2)
    border-bottom: 8px solid rgba(255, 255, 255, 0.2)
    border-left: 8px solid #ff711f
    transform: translateZ(0)
    animation: load8 1.1s infinite linear

  @keyframes load8 
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>