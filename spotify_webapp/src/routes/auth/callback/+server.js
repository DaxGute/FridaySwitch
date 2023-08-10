import { redirect } from '@sveltejs/kit';

export async function GET({ request, params, url }) {  // see if we can use the params 

    console.log("(auth/callback/+server.js) this is the url we received: " + url)
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var code = queryString.get('code')
    console.log("(auth/callback/+server.js) code is: " + code)

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        form: {
            code: code,
            redirect_uri: "http://localhost:5173/auth/callback",
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
          },
          json: true
    })
    let callback = await response.json()
    console.log("(auth/callback/+server.js) this is what callback looks like: ")
    if (!error && response.statusCode === 200) { // fix this
        var access_token = body.access_token;
        throw redirect(307, '/');
    }
}