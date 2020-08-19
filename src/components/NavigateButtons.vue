<template>
  <div class="navigate-buttons">
    <button
      class="navigate-buttons__left"
      :disabled="curState === 0 || curState === maxState"
      @click.prevent="$emit('prev')"
    >
      <svg fill="#4a505e" x="0px" y="0px" viewBox="0 0 31.49 31.49" xml:space="preserve" class="is-back"><path data-v-f63d6478="" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>
    </button>
    <button
      class="navigate-buttons__right"
      :disabled="!filled || curState === maxState"
      @click.prevent="$emit('next')"
    >
      <span>Далее</span>
      <svg fill="#fff" x="0px" y="0px" viewBox="0 0 31.49 31.49" xml:space="preserve" class=""><path data-v-f63d6478="" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'NavigateButtons',
    computed: {
      curState () {
        return this.$store.getters.quizState
      },
      maxState () {
        return this.$store.getters.quizLength - 1
      },
      filled () {
        return this.$store.getters.currentQuiz.filled || this.$store.getters.currentQuiz.noRequired
      }
    }
  }
</script>

<style lang="sass">
  .navigate-buttons
    width: 150px
    display: flex
    justify-content: space-between
    align-items: center
    [disabled]
      opacity: 0.5
      cursor: default
    &__left, &__right
      border: 0
      padding: 0
      outline: none
      cursor: pointer
    &__left
      background: transparent
      svg
        transform: rotate(180deg)
    &__right
      height: 43px
      width: 112px
      display: flex
      align-items: center
      justify-content: center
      border-radius: 21.5px
      background-color: #ff711f
      color: white
    svg
      width: 20px
      height: 14px
</style>