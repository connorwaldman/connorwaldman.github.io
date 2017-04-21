module('Test Group');

<script src="index.js"></script>

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "authorize", function( assert ) {
  assert.equal(index.authorize, true)
});

