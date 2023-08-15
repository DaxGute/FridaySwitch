import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export function GET() { 
    let hasToken = true
    if (env.SPOTIFY_CLIENT_ACCESS_TOKEN === undefined) {
        hasToken = false
    }
    // console.log("/auth/token/+server.js") 
    return json({
        hasToken: hasToken
    })
}