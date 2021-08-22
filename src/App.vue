<template>
  <div class="container">
    <Heading msg="THE MEMORY GAME"/>
    <p class="description">How good is your memory? Pick the country flags that match</p>
    <div class="scores">
      <p class="correct">Correct Attempts: <span>{{correctAttempts}}</span></p>
      <p class="failed">Failed Attempts: <span>{{failedAttempts}}</span></p>
    </div>
    <div class="row">
      <div v-for="(card, index) in cardStore" class="col flip-card" :class="{ 'flipped': card.isFlipped }" @click="flipCard(card)" :key="index">
        <div class="card">
          <div class="front">
            <img src="./assets/question.png">
          </div>
          <div class="back">
            <img :src="getImgUrl(card.img)">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="success-message" :class="{'show-msg': showSuccessMsg}">
    <p>Yay! you completed the memory game &#127881;</p>
    <button @click="reset()" class="reset-btn">Reset</button>
  </div>
</template>

<script>
import Heading from './components/Heading.vue';
import _ from 'lodash';

export default {
  name: 'App',
  components: {
    Heading
  },
  data() {
    return {
      cards: [
        {name: 'Canada', img: 'canada.png', isFlipped: false, isOpened: false},
        {name: 'Germany', img: 'germany.png', isFlipped: false, isOpened: false},
        {name: 'Niger', img: 'niger.png', isFlipped: false, isOpened: false},
        {name: 'Nigeria', img: 'nigeria.png', isFlipped: false, isOpened: false},
      ],
      cardStore: [],
      openedCards: [],
      correctAttempts: 0,
      failedAttempts: 0,
      showSuccessMsg: false
    }
  },
  methods: {
    getImgUrl: function (path) { 
      return require('@/assets/' + path);
    },
    flipCard(card){
      if(!card.isOpened){
        card.isFlipped = !card.isFlipped;
        if(this.openedCards.length === 0) {
          this.openedCards.push(card.name)
        } else {
          if(card.name === this.openedCards[0]){
              if(card.isFlipped){
                this.openCard(card.name)
                this.correctAttempts += 1
              }
              this.openedCards = []
          } else {
            setTimeout(() => {
              this.unflipCard(card.name)
              this.failedAttempts += 1
              this.openedCards = []
            }, 500)
          }
        }
      }
    },
    openCard(name) {
      this.cardStore.forEach(card => {
        if(card.name === name){
          card.isOpened = true
        }
      });
    },
    unflipCard(name) {
      this.cardStore.forEach(card => {
        if(card.name === name || card.name === this.openedCards[0]){
          card.isFlipped = false
        }
      });
    },
    reset() {
      setTimeout(() => {
        this.showSuccessMsg = false
        this.shuffleCards()
        this.openedCards = []
        this.failedAttempts = 0
        this.correctAttempts = 0 
      }, 200);
    },
    shuffleCards() {
      this.cardStore = []
      this.cardStore = _.shuffle(_.cloneDeep(this.cards).concat(_.cloneDeep(this.cards))) 
    }
  },
  created(){
    this.shuffleCards()
  },
  updated(){
    const success = this.cardStore.every(card => card.isFlipped && card.isOpened)
    if(success) {
      setTimeout(() => {
        this.showSuccessMsg = true
      }, 500);
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap')

* 
  box-sizing: border-box

body 
  background-color: #3d348b
  margin: 0

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #212121

h1 
  font-family: 'Rampart One', cursive
  color: #F7B801
  font-size: 50px
  font-weight: 900

.description
  color: white
  font-size: 20px

.container
  max-width: 850px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.row
  display: flex
  flex-wrap: wrap
  padding-left: -10px
  padding-right: -10px

.col 
  position: relative
  width: 100%
  flex: 25%
  padding-left: 10px
  padding-right: 10px
  max-width: 25%
  margin-bottom: 40px

.flip-card
  perspective: 1000
  height: 100px
  &.flipped 
    .front
      transform: rotateY(180deg)
    .back
      transform: rotateY(0deg)

.front,
.back 
  backface-visibility: hidden
  transition: 0.3s
  transform-style: preserve-3d
  top: 0
  left: 0
  width: 100%
  img
    object-fit: cover
    width: 100%
    height: 100px
    // max-width: 150px
    cursor: pointer
    border-radius: 5px

.front img
  border: 3px solid white

.back 
  position: relative
  top: -105px
  transform: rotateY(-180deg)

.scores
  display: flex
  padding: 0 10px
  justify-content: space-between
  margin: 40px 0
  p, button 
    font-weight: bold
    padding: 10px 15px
    color: white
    border-radius: 5px
  p
    &.failed
      background-color: #FF595E
    &.correct
      background-color: #28AFB0
    span
      background-color: white
      padding: 2px 8px
      border-radius: 5px
      color: #212121

.success-message
  position: fixed
  width: 100%
  transition: bottom 0.5s
  bottom: -150px
  text-align: center
  background-color: #28AFB0
  &.show-msg
    bottom: 0
  p
    color: white
    font-weight: 500
    font-size: 18px
  .reset-btn
    background-color: #F7B801
    border: 0
    border-radius: 5px
    padding: 10px 20px
    font-weight: 700
    font-size: 15px
    color: #313131
    cursor: pointer
    margin-bottom: 15px

@media only screen and (max-width: 768px)
  .container
    position: relative
    top: 0
    left: 0
    transform: translate(0, 0)
    padding: 16px
    max-width: 100% !important
  .col
    flex: 33.333333%
    max-width: 33.333333%
  .scores 
    p
      span
        display: block
        width: max-content
        margin: 10px auto 0
        margin-top: 10px
</style>