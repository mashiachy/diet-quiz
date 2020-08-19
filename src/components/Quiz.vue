<template>
  <section class="quiz">
    <header class="quiz__header">
      <svg viewBox="0 0 24 24"><path fill="#ff711f" d="M17,21L14.25,18L15.41,16.84L17,18.43L20.59,14.84L21.75,16.25M12.8,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 12.45,20.39 12.8,21M12,17H7V15H12M14.68,13H7V11H17V12.08C16.15,12.22 15.37,12.54 14.68,13M17,9H7V7H17"></path></svg>
      <h3>Експрес програма схуднення</h3>
    </header>
    <Loader
      v-if="loading"
      class="quiz__main"
    ></Loader>
    <QuizContent
      v-if="!loading"
      class="quiz__main"
      v-model="variables"
      :quiz="quiz"
      :url="url"
      @next="next"
      ref="content"
    ></QuizContent>
    <footer class="quiz__footer">
      <ProgressBar class="quiz__progress" :value="percents"></ProgressBar>
      <NavigateButtons
        @next="next"
        @prev="prev"
      ></NavigateButtons>
    </footer>
  </section>
</template>

<script>
  // import TWEEN from '@tweenjs/tween.js'
  import { Tween, Easing, update } from 'es6-tween'

  import QuizContent from './QuizContent'
  import ProgressBar from './ProgressBar'
  import NavigateButtons from './NavigateButtons'
  import Loader from './Loader'

  export default {
    name: 'Quiz',
    components: {
      QuizContent,
      ProgressBar,
      NavigateButtons,
      Loader
    },
    data () {
      return {
        variables: {},
        opacity: 0,
        appearance: null,
        fade: null,
        url: '#'
      }
    },
    computed: {
      state () {
        return this.$store.getters.quizState
      },
      quiz () {
        return this.$store.getters.currentQuiz
      },
      filled () {
        return this.$store.getters.quizLength === this.$store.getters.readyFilled
      },
      percents () {
        return this.$store.getters.numberFilled / this.$store.getters.quizLength
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      filled (val) {
        if (val)
          this.goToLink()
      },
      loading (val) {
        if (val){
          this.appearance.start()
        }
      },
      opacity (val) {
        this.$refs.content.$el.style.opacity = `${val}`
      }
    },
    methods: {
      goToLink () {
        const calc = this.$store.getters.formulaEval(this.variables)
        const url = this.$store.getters.url(calc)
        console.log({ calc, url })
        this.url = url
        window.open(url, '_blank')
      },
      next () {
        this.fade.start()
        setTimeout(() => {
          this.$store.dispatch('nextState')
          this.appearance.start()
        }, 150)
      },
      prev () {
        this.fade.start()
        setTimeout(() => {
          this.$store.dispatch('prevState')
          this.appearance.start()
        }, 150)
      }
    },
    mounted () {
      const animate = (time) => {
        requestAnimationFrame(animate)
        update(time)
      }
      requestAnimationFrame(animate)

      this.appearance = new Tween({ opacity: 0 })
        .to({ opacity: 1 }, 150)
        .easing(Easing.Quadratic.InOut)
        .on('update', ({ opacity }) => {
          this.opacity = `${opacity}`
        })
      this.fade = new Tween({ opacity: 1 })
        .to({ opacity: 0 }, 150)
        .easing(Easing.Quadratic.InOut)
        .on('update', ({ opacity }) => {
          this.opacity = `${opacity}`
        })
    }
  }
</script>

<style lang="sass">
  .quiz
    width: 1024px
    height: 570px
    display: flex
    flex-direction: column
    align-items: stretch
    background-color: white
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4)
    @media screen and (max-width: 1024px)
      width: 100%
      height: auto
      min-height: calc(100 * var(--vh))
      box-shadow: none
    &__header
      position: relative
      box-sizing: border-box
      padding: 30px 30px 16px
      display: flex
      flex-wrap: wrap
      svg
        margin-right: 12px
        height: 18px
        width: 18px
      &:after
        position: absolute
        bottom: 0
        left: 0
        content: ''
        width: 100%
        height: 1px
        background-color: #dedede
    &__main
      margin-bottom: auto
      max-height: calc(100% - 153px)
      overflow-y: auto
    &__footer
      position: relative
      box-sizing: border-box
      padding: 16px 30px 30px
      display: flex
      align-items: flex-start
      justify-content: space-between
      &:before
        position: absolute
        top: 0
        left: 0
        content: ''
        width: 100%
        height: 1px
        background-color: #dedede
    &__progress
      width: calc(100% - 194px)
</style>