<script>
    import { onMount } from "svelte";

    let profileImgSrc
    let profileName
    let profileEmail
    async function fetchProfile() {
        let response = await fetch("/actions/getProfile", {method: "GET"});
        let resultJSON = await response.json()
       
        // console.log(resultJSON)
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
    <p style="margin-top:-10px; color: #777;">{profileEmail}</p>
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
    border-radius: 5px;
    padding: 10px;
    margin-top: -10px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .rounded-box button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
</style>
