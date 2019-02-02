const deck = require('./constants/deck')

class PokerHand {
  constructor(hand) {
    this.hand = hand
  }

  sortArray(a, b) {
    return a - b
  }

  rankHand() {
    let hand = this.convertCards(this.hand)
    let rank;
    if (hand.values.length != 5 || hand.values.includes(undefined)) return 'Invalid Hand'
    rank = this.isFlush(hand)
    if (rank) return rank
    rank = this.isStraight(hand.values)
    if (rank) return rank
    rank = this.isFullHouse(hand) 
    return rank   
  }

  convertCards(hand) {
    const cards = hand.split(" ")
    let values = []
    let suits = []
    for(let i =0; i<=cards.length-1; i++) {
      values.push(deck[cards[i].slice(0,1)])
      suits.push(cards[i].slice(-1))
    }
    values.sort(this.sortArray)
    return {values, suits}
  }

  isFullHouse(hand) {
    let cards = this.countCards(hand.values)
    let rank = "High Card"
    for( let count in cards) {
        if(cards[count] == 4) return "Four Of A Kind"
        if(cards[count] == 3) {
          rank = "Three Of A Kind"
          if (Object.keys(cards).length < 3) rank = "Full House"
        }
        if(cards[count] == 2) {
          rank = "One Pair"
          if(Object.keys(cards).length < 4) rank = "Two Pair"
        }
    }
    return rank
  }

  countCards(values) {
    let handCount = {}
    for (let i=0; i<=values.length -1; i++) {
      handCount[values[i]] = handCount[values[i]] ? handCount[values[i]] +1 : 1
    }
    return handCount
  }

  isStraight(values) {
    if(values.includes(2)) values = this.handleAce(values)
    for(let i = values.length - 1; i >= 1; i--) {
      if(values[i] == (values[i-1] +1)) {
        continue
      } else {
        return false
      }
    }
    return "Straight"
  }

  handleAce(values) {
    values[values.indexOf(14)] = 1
    return values.sort(this.sortArray)
  }

  isFlush(hand) {
    let rank;
    for(let i =hand.suits.length -1; i>=1; i--) {
      if(hand.suits[i] == hand.suits[i-1]) {
        continue
      } else {
        return false
      }
   }
   rank = "Flush"
   if(this.isStraight(hand.values)) rank = "Straight Flush"
   if(hand.values[0] >= 10) rank = "Royal Flush"
   return rank
  }
}

module.exports = PokerHand;