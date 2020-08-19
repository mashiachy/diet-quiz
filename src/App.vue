<template>
  <div id="app">
    <Quiz></Quiz>
  </div>
</template>

<script>
  import Quiz from './components/Quiz'

  export default {
    name: 'App',
    components: {
      Quiz
    },
    created () {
      let root = document.querySelector(':root')
      root.style.setProperty('--vh', `${window.innerHeight / 100}px`)
      window.addEventListener('resize', () => {
        root.style.setProperty('--vh', `${window.innerHeight / 100}px`)
      })
    },
    mounted () {
      this.$store.dispatch('loadQuiz')
    }
  }
</script>

<style lang="sass">
  @import '~normalize-scss'
  @include normalize()

  #app
    font-family: Open Sans, sans-serif
    width: 100%
    min-height: calc(100 * var(--vh))
    display: flex
    justify-content: center
    align-items: center

  h1, h2, h3, h4, h5, p
    font-weight: normal
    margin: 0
    padding: 0

  h3
    font-size: 16px
    line-height: 18px

  .text
    &--red
      color: #ff711f
    &--bold
      font-weight: bold
</style>
