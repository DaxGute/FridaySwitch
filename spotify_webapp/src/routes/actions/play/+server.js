import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function PUT({ request, params, url }) {
    let response = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT", headers: { Authorization: `Bearer ${env.SPOTIFY_CLIENT_ACCESS_TOKEN}` }
        })

    return json(response)
}
