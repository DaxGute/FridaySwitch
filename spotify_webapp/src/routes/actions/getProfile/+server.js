import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function GET({ request, params, url }) {
    let response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${env.SPOTIFY_CLIENT_ACCESS_TOKEN}` }
    });
    let responseJSON = await response.json()
    return json(responseJSON)
}