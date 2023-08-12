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


<div class="album-box">
    <div class="album-cover">
        <img src={current_track.album.images[0].url} class="now-playing__cover" alt="" />
    </div>
    <div class="track-info">
      <p class="track-name"> <strong>{current_track.name}</strong></p>
      <p class="artist-name">{current_track.artists[0].name}</p>
    </div>
    <div class="playback-buttons">
        <button class="btn-spotify" on:click={prevTrack} >
            <u>[&lt;&lt;]</u>
        </button>
        <button class="btn-spotify" on:click={togglePlay} >
            <u>[{ is_paused ? "PLAY" : "PAUSE" }]</u>
        </button>
        <button class="btn-spotify" on:click={nextTrack} >
                <u>[&gt;&gt;]</u>
        </button>
    </div>
  </div>
  
  <style>
    .album-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end; /* Align at the bottom */
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.8);;
      border-radius: 8px 8px 0 0;
      position: fixed;
      bottom: 0; /* Stick to the bottom */
      left: 50%; /* Center horizontally */
      transform: translateX(-50%);
      width: 80%; /* Adjust the width as needed */
      max-width: 400px; /* Add a max-width for responsiveness */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      color: white;
    }
  
    .album-cover img {
      max-width: 100px;
      height: auto;
      border-radius: 4px;
    }
  
    .track-info {
      text-align: center;
    }
  
    .track-name {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
  
    .artist-name {
      font-size: 1rem;
      color: #777;
      margin: 0;
    }
  
    .playback-buttons {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    .playback-buttons button {
        background-color: transparent;
        border: none;
        border-radius: 5px;
        padding: 10px;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .playback-buttons button:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
  </style>
  