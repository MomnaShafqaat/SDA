const { auth } = require("express-oauth2-jwt-bearer");


const jwtCheck = auth({
    audience: 'https://mentora.com/api',
    issuerBaseURL: 'https://dev-vwgdhd3en1zcwos3.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });



  module.exports=jwtCheck;
  