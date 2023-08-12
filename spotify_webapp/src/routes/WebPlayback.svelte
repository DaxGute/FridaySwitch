<script>
    export let token

    import {onMount} from 'svelte'

    let is_paused = false
    let is_active = false
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

    let player
    onMount(() => {

        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {
                console.log(state)
                if (!state) {
                    return;
                }

                current_track = state.track_window.current_track
                is_paused = state.paused

                player.getCurrentState().then( state => { 
                    is_active = (!state)? false : true
                });
            }))

            player.connect();
        };
    })

    function prevTrack(){
        player.previousTrack()
    }
    function togglePlay(){
        player.togglePlay()
    }
    function nextTrack(){
        player.nextTrack()
    }

</script>

<div class="container">
    <div class="main-wrapper">
        <img src={current_track.album.images[0].url} class="now-playing__cover" alt="" />

        <div class="now-playing__side">
            <div class="now-playing__name">
                {current_track.name}
            </div>

            <div class="now-playing__artist">
                {current_track.artists[0].name}
            </div>
        </div>
    </div>
    <button class="btn-spotify" onClick={prevTrack} >
        &lt;&lt;
    </button>
  
    <button class="btn-spotify" onClick={togglePlay} >
        { is_paused ? "PLAY" : "PAUSE" }
    </button>
  
    <button class="btn-spotify" onClick={nextTrack} >
            &gt;&gt;
    </button>
</div>