import { redirect } from '@sveltejs/kit';
import {SPOTIFY_CLIENT_ID} from '$env/static/private'

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  

export function GET() {  
  var scope = "streaming \
               user-read-email \
               user-read-private"

  var state = generateRandomString(16);

  console.log("(auth/login/+server.js)")

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: "http://localhost:5173/auth/callback",
    state: state
  })

  throw redirect(307, 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
}