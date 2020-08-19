<template>
  <div class="progress">
    <p>Готово: <span class="text--red text--bold">{{(value * 100) | formatPercent }}</span></p>
    <div class="progress__bar">
      <div
        class="progress__bar-inner"
        :style="{
          width: `${value * 100}%`
        }"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    filters: {
      formatPercent (val) {
        return `${ Math.floor(val) }%`
      }
    }
  }
</script>

<style lang="sass">
  .progress
    p
      margin-bottom: 12px
    &__bar, &__bar-inner
      display: block
      height: 8px
      border-radius: 4px
    &__bar
      background-color: #dedede
      width: 100%
      &-inner
        background-color: #ff711f
        transition: width .25s ease-out
</style>