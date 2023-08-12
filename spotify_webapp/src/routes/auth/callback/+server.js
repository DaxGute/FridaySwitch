import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '$env/static/private'

export async function GET({ request, params, url }) {  // see if we can use the params 

    // console.log("(auth/callback/+server.js) this is the param we received: " + params)
    let paramString = url.toString().split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var code = queryString.get('code')
    // console.log("(auth/callback/+server.js) code is: " + code)

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', "http://localhost:5173/auth/callback");

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      body: data,
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
    })
    let callback = await response.json()

    // console.log("(auth/callback/+server.js) this is what callback looks like: " + JSON.stringify(callback,null,2))
    
    env.SPOTIFY_CLIENT_ACCESS_TOKEN = callback["access_token"];
    env.SPOTIFY_CLIENT_REFRESH_TOKEN = callback["refresh_token"]
    throw redirect(307, '/');
}