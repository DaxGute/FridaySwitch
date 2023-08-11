<script>
    import { onMount } from "svelte";
    export let token

    let profileImgSrc
    let profileName
    let profileEmail
    async function fetchProfile() {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        let resultJSON = await result.json()
        console.log("profile.svelt")
        console.log(resultJSON)
        profileName = resultJSON["display_name"]
        profileEmail = resultJSON["email"]
        profileImgSrc = resultJSON["images"][1]["url"]
    }

    onMount(() => {
        setTimeout(fetchProfile,1000) //somehow the delay between onmount makes it work
    })

    let isVisible = true;
    function toggleBox() {
        isVisible = !isVisible;
    }
</script>
  
<div class="rounded-box {isVisible ? '' : 'active'}">
    <img src={profileImgSrc} alt="profile_photo"/>
    <p><strong>{profileName}</strong></p>
    <p style="margin-top:-10px">{profileEmail}</p>
    <button on:click={toggleBox}><u>{isVisible ? "[hide]" : "[show]"}</u></button>
</div>


<style>
    .square-image {
        width: 200px; /* Set the desired width */
        height: 200px; /* Set the same value as the width to make it square */
        object-fit: cover; /* Maintain aspect ratio while covering the container */
    }

  .rounded-box {
    position: fixed;
    right: 20px;
    top: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    transition: transform 0.5s ease-in-out;
  }

  .active{
    transform: translate(0px, -140px);
  }

  .rounded-box img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .rounded-box button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
  
</style>
