import {SPOTIFY_CLIENT_ACCESS_TOKEN} from '$env/static/private'

export async function GET({ request, params, url }) {
    let response = await fetch("https://api.spotify.com/v1/me/player/previous", {
            method: "POST", headers: { Authorization: `Bearer ${SPOTIFY_CLIENT_ACCESS_TOKEN}` }
        })
}
