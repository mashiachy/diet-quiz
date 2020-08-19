import axios from 'axios'
import { evaluate } from 'mathjs'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    state: null,
    statesLength: null,
    quiz: null,
    formula: null,
    urls: null
  },
  mutations: {
    setState (state, newState) {
      state.state = newState
    },
    setStatesLength (state, len) {
      state.statesLength = len
    },
    setQuiz (state, quiz) {
      state.quiz = [ ...quiz ]
    },
    setFormula (state, formula) {
      state.formula = formula
    },
    setFill (state) {
      Vue.set(state.quiz, state.state, { filled: true, ...state.quiz[state.state] })
    },
    setUrls (state, urls) {
      state.urls = [ ...urls ]
    }
  },
  actions: {
    async loadQuiz ({ commit }) {
      let { data } = await axios.get('./quiz.json')
      commit('setStatesLength', data.states.length)
      commit('setQuiz', data.states)
      commit('setUrls', data.urls)
      commit('setState', 0)
      commit('setFormula', data.formula)
    },
    prevState ({ commit, state }) {
      commit('setState', state.state - 1)
    },
    nextState ({ commit, state }) {
      if ('noRequired' in state.quiz[state.state])
        commit('setFill')
      commit('setState', state.state + 1)
    },
    fillCurrent ({ commit }) {
      commit('setFill')
    }
  },
  getters: {
    quizState: ({ state }) => state,
    quizLength: ({ statesLength }) => statesLength,
    currentQuiz: ({ quiz, state }) => quiz ? quiz[state] : {},
    loading: ({ quiz }) => quiz === null,
    formulaEval: ({ formula }) => ({ weight, activity }) => {
      if (activity === 0)
        return evaluate(formula, { weight, activity: 0, number: 25 })
      else if (activity === 1)
        return evaluate(formula, { weight, activity: 350, number: 28 })
      else
        return evaluate(formula, { weight, activity: 500, number: 28 })
    },
    url: ({ urls }) => value => {
      return urls.find(urlObj => urlObj.value >= value).url
    },
    allFilled: ({ quiz }) => {
      if (quiz)  {
        return quiz.reduce(
          (acc, value) => acc && (('noRequired' in value) || ('filled' in value ? value.filled : false)),
          true
        )
      }
      return false
    },
    readyFilled: ({ quiz }) => {
      if (quiz)  {
        return quiz.reduce(
          (acc, value) => acc + ('noRequired' in value ? 1 : ('filled' in value ? (value.filled ? 1 : 0) : 0)),
          0
        )
      }
      return false
    },
    numberFilled: ({ quiz }) => {
      if (quiz)  {
        return quiz.reduce(
          (acc, value) => acc + ('filled' in value ? (value.filled ? 1 : 0) : 0),
          0
        )
      }
      return false
    }
  }
})
