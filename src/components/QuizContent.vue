<template>
  <main>
    <span
      v-if="quiz.noRequired"
      class="no-required-tag"
    >
      {{ quiz.noRequired }}
    </span>
    <h1>{{ quiz.question }}</h1>
    <div class="options-form" v-if="quiz.type === 'select'">
      <SelectOption
        v-for="(option, i) in quiz.options"
        :key="i"
        v-bind="option"
        @click.native="clickSelectOption(option.value)"
        :class="{
          'select-option--active': ('variable' in quiz) ? value[quiz.variable] === option.value : false
        }"
      ></SelectOption>
    </div>
    <div
      class="input-form"
      v-if="quiz.type === 'input'"
      @keyup.enter.prevent="enterTextInput"
    >
      <input
        class="input-field"
        type="text"
        :placeholder="quiz.placeholder"
        :value="value[quiz.variable]"
        @input="inputTextInput"
      >
    </div>
    <transition name="opacity">
      <FilledQuiz
        v-if="$store.getters.quizLength === $store.getters.readyFilled"
        :url="url"
      ></FilledQuiz>
    </transition>
  </main>
</template>

<script>
  import SelectOption from './SelectOption'
  import FilledQuiz from './FilledQuiz'

  export default {
    name: "QuizContent",
    components: {
      SelectOption,
      FilledQuiz
    },
    props: {
      value: {
        type: Object,
      },
      quiz: {
        type: Object,
      },
      url: {
        type: String
      }
    },
    mounted () {
      if ('variable' in this.quiz) {
        let payload = { ...this.value }
        payload[this.quiz.variable] = null
        this.$emit('input', payload)
      }
    },
    methods: {
      clickSelectOption (value) {
        let payload = { ...this.value }
        payload[this.quiz.variable] = value
        this.$emit('input', payload)
        this.$store.dispatch('fillCurrent')
        if (this.$store.getters.quizState !== this.$store.getters.quizLength - 1) {
          this.$emit('next')
        }
      },
      inputTextInput ({ target }) {
        let payload = { ...this.value }
        payload[this.quiz.variable] = target.value
        this.$emit('input', payload)
        this.$store.dispatch('fillCurrent')
      },
      enterTextInput () {
        if (this.quiz.filled || this.quiz.noRequired) {
          this.$emit('next')
        }
      }
    }
  }
</script>

<style lang="sass">
  .quiz__main
    padding: 30px
    position: relative
    h1
      margin-bottom: 24px

  .options-form
    display: flex
    flex-wrap: wrap
  .select-option
    width: calc(50% - 8px)
    margin-bottom: 16px
    &:nth-child(2n - 1)
      margin-right: 16px
    @media screen and (max-width: 768px)
      width: 100%
      &:nth-child(2n - 1)
        margin-right: 0

  .no-required-tag
    display: inline-block
    font-size: 14px
    line-height: 16px
    padding: 4px 8px
    border-radius:  4px
    background-color: #dedede
    margin-bottom: 12px

  .input-field
    width: 100%
    box-sizing: border-box
    padding: 12px 16px
    background-color: #dedede
    border: 0
    outline: none
    &:focus
      border-bottom: 1px solid #ff711f

  .opacity
    &-enter-active, &-leave-active
      transition: opacity .5s ease-out
    &-enter, &-leave-to
      opacity: 0
</style>