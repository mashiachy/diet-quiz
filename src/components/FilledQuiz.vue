<template>
  <div class="filled-quiz">
    <h1>Программа похудения подготовлена!</h1>
    <p>
      Если вы не были перенаправлены на ссылку с программой, перейдите по данной ссылке:
      <a :href="url">{{ url }}</a>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'FilledQuiz',
    props: {
      url: {
        type: String
      }
    }
  }
</script>

<style lang="sass">
  .filled-quiz
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    background-color: white
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    h1
      max-width: 640px
      margin-bottom: 24px
      text-align: center
    p
      max-width: 640px
      text-align: center
</style>