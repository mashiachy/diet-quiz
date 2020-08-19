<template>
  <div
    class="select-option"
    :class="{
      'select-option--empty': !icon
    }"
  >
    <img
      v-if="icon"
      class="select-option__icon"
      :src="icon"
      alt="Icon"
    />
    {{ label }}
  </div>
</template>

<script>
  export default {
    name: "SelectOption",
    props: {
      value: {
        type: Number,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      icon: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="sass">
  .select-option
    box-sizing: border-box
    padding: 16px
    border: 1px #dedede solid
    border-radius: 4px
    display: flex
    align-items: center
    cursor: pointer
    &:hover
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2)
    &--empty
      position: relative
      &:before
        content: ''
        width: 12px
        height: 12px
        border-radius: 6px
        background-color: #dedede
        margin-right: 16px
    &--active
      border: 1px solid #ff711f
      &.select-option--empty
        &:before
          background-color: #ff711f
    &__icon
      width: 41px
      height: 41px
      margin-right: 16px
</style>