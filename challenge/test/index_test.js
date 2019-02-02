const assert = require('assert');
const PokerHand = require('../index');

describe('hand should be ranked properly', function() {
  it('should hold 5 cards', function() {
    const hand = new PokerHand('As Ks Qs Js 10s 2c');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });

  it('should not accept strange cards', function() {
    const hand = new PokerHand('Ds Km Qs Fs 15s');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });

  it('should rank a royal flush', function() {
    const hand = new PokerHand('As Ks Qs Js 10s');
    assert.equal(hand.rankHand(), 'Royal Flush');
  });

  it('should rank a straight flush', function() {
    const hand = new PokerHand('Ks Qs Js 9s 10s');
    assert.equal(hand.rankHand(), 'Straight Flush');
  });

  it('should rank a flush', function() {
    const hand = new PokerHand('As 4s 3s 8s 10s');
    assert.equal(hand.rankHand(), 'Flush');
  });

  it('should rank a straight', function() {
    const hand = new PokerHand('6s 2d 3h 4h 5s');
    assert.equal(hand.rankHand(), 'Straight');
  });

  it('should rank a straight with low ace', function() {
    const hand = new PokerHand('As 2d 3h 4h 5s');
    assert.equal(hand.rankHand(), 'Straight');
  });

  it('should rank a straight with high ace', function() {
    const hand = new PokerHand('As Ks Qs Jh 10d');
    assert.equal(hand.rankHand(), 'Straight');
  });

  it('should rank a four of a kind', function() {
    const hand = new PokerHand('As 10c 10s 10h 10d');
    //TODO: Error handling, should not be able to have two of the same card.
    assert.equal(hand.rankHand(), "Four Of A Kind");
  });

  it('should rank a three of a kind', function() {
    const hand = new PokerHand('As 10c 10s 10h 9d');
    assert.equal(hand.rankHand(), "Three Of A Kind");
  });

  it('should rank a full house', function() {
    const hand = new PokerHand('9s 10c 10s 10h 9d');
    assert.equal(hand.rankHand(), "Full House");
  });

  it('should rank a two pair', function() {
    const hand = new PokerHand('As 10c 10s 9h 9d');
    assert.equal(hand.rankHand(), "Two Pair");
  });

  it('should rank a pair', function() {
    const hand = new PokerHand('As 10c 10s 4h 9d');
    assert.equal(hand.rankHand(), "One Pair");
  });

  it('should rank a high card', function() {
    const hand = new PokerHand('As 10c 6s 4h 9d');
    assert.equal(hand.rankHand(), "High Card");
  });
});
