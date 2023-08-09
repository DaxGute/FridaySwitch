import { json } from '@sveltejs/kit';
import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '$env/static/private'

export function GET() {
    console.log("/auth/+server.js")
	return json({
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    });
}
