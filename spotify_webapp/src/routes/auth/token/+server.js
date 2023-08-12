import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export function GET() { 
    // console.log("/auth/token/+server.js") 
    return json({
        access_token: env.SPOTIFY_CLIENT_ACCESS_TOKEN
    })
}