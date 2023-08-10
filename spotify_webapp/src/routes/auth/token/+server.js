import { json } from '@sveltejs/kit';
import {SPOTIFY_CLIENT_ACCESS_TOKEN} from '$env/static/private'

export function GET() {  
    return json({
        access_token: SPOTIFY_CLIENT_ACCESS_TOKEN
    })
}