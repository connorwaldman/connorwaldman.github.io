<script src="index.js"></script>

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "authorize", function( assert ) {
  assert.equal(index.authorize == true, "Passed");
});

QUnit.test( "start", function( assert ) {
  var id = realtimeUtils.getParam('id');
  assert.equal(realtimeUtils.load == id, "Passed");
});

QUnit.test( "onFileInitialize", function( assert ) {
  var string = model.createString();
  assert.equal(model.getRoot().set == string, "Passed");
});

