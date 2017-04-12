var jose = require('node-jose');

// Empty keystore
var keystore = jose.JWK.createKeyStore();

// Create our keystore using the local keys.json document
// This document should have a copy of the keys returned from http://host;port/.well-known/openid-configuration/jwks <- Or similar address.
// You will need a security token service (STS) setup and running to provide the above URL.
// The above URL might be at a different location depending on your STS
// IdentityServer4 is an STS written in .Net
jose.JWK.asKeyStore(require("./keys.json")).
then(function(result) {
    keystore = result;
    // This matches the kid field contained in the keys.json document. Again, this document was taken from our STS at this location /.well-known/openid-configuration/jwks
    var kid = "7326DE239336F3E32C9D8679986C7C5C22165DD4";
    // Get the appropriate jwk from the store, using the above kid
    var key = keystore.get(kid);
    // Verify our token using the supplied jwk
    jose.JWS.createVerify(key).
    // Get our access_token from the json document
    // Note, if you make any changes to the access_token i.e. replace letters or digits
    // the verify should fail
    verify(require("./token.json").access_token).
    // Console out the result when done
    then(function(result) {
        console.log("Result: " + JSON.stringify(JSON.parse(result.payload)));
    });
});
