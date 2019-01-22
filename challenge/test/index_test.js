const assert = require('assert');
const PokerHand = require('../index');

describe('hand should be valid', function() {
  it('should hold 5 cards', function() {
    var hand = new PokerHand('As Ks Qs Js 10s 2c');
    assert.equal(hand.rankHand(), 'Invalid Hand');
  });
});
