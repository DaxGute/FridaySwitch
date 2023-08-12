<script>
    export let token

    import {onMount} from 'svelte'

    let is_paused = false
    let current_track = {
            name: "",
            album: {
                images: [
                    { url: "" }
                ]
            },
            artists: [
                { name: "" }
            ]
        }

    async function getCurrentState(){
        const result = await fetch("https://api.spotify.com/v1/me/player",{
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        })
        let resultJSON = await result.json() // for some rzn spotify has to be open for this to read anything
        
        current_track = {
            name: resultJSON.item.name,
            album: resultJSON.item.album,
            artists: resultJSON.item.artists,
        }
        is_paused = !resultJSON.is_playing
    }
    

    onMount(() => {
        setTimeout(getCurrentState,1000) //somehow the delay between onmount makes it work
        setInterval(getCurrentState,10000)
    })
    
    async function prevTrack(){
        let response = await fetch("https://api.spotify.com/v1/me/player/previous", {
            method: "POST", headers: { Authorization: `Bearer ${token}` }
        })
        // let responseJSON = await response.json() // BUG TESTING ONLY
        // console.log(responseJSON)
        getCurrentState()
    }
    async function togglePlay(){
        let response
        if (is_paused) {
            response = await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT", headers: { Authorization: `Bearer ${token}` }
            })
            is_paused = false
        }else{
            response = await fetch("https://api.spotify.com/v1/me/player/pause", {
                method: "PUT", headers: { Authorization: `Bearer ${token}` }
            })
            is_paused = true
        }
        // let responseJSON = await response.json() // BUG TESTING ONLY
        // console.log(responseJSON)
        getCurrentState()
    }
    async function nextTrack(){
        let response = await fetch("https://api.spotify.com/v1/me/player/next", {
            method: "POST", headers: { Authorization: `Bearer ${token}` }
        })
        // let responseJSON = await response.json() // BUG TESTING ONLY
        // console.log(responseJSON)
        getCurrentState()
    }

</script>

<div class="container">
    <div class="main-wrapper">
        <img src={current_track.album.images[0].url} class="now-playing__cover" alt="" />

        <div class="now-playing__side">
            <div class="now-playing__name">
                <strong>{current_track.name}</strong>
            </div>

            <div class="now-playing__artist">
                {current_track.artists[0].name}
            </div>
        </div>
    </div>
    <button class="btn-spotify" on:click={prevTrack} >
        &lt;&lt;
    </button>
  
    <button class="btn-spotify" on:click={togglePlay} >
        { is_paused ? "PLAY" : "PAUSE" }
    </button>
  
    <button class="btn-spotify" on:click={nextTrack} >
            &gt;&gt;
    </button>
</div>