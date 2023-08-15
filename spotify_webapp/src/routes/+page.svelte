<script>
	import { onMount } from 'svelte';
  import Login from './Login.svelte'
  import WebPlayback from './WebPlayback.svelte';
  import Profile from './Profile.svelte';

  let hasToken = false

  onMount(async () => {
    let response = await fetch('/auth/hasToken');
    let tokenJson = await response.json();
    hasToken = tokenJson["hasToken"]
    // console.log("(+page) token is " + token)
  })

  let client_id
  let client_secret
  let client_token
  async function getClientSpecs() { //PURELY FOR TESTING
      const response = await fetch('/auth');
      let clientSpecs = await response.json();

      client_id = clientSpecs["client_id"]
      client_secret = clientSpecs["client_secret"]

      const tokenResponse = await fetch('/auth/hasToken')
      let tokenSpecs = await tokenResponse.json()

      client_token = tokenSpecs["hasToken"]
	  }
  
</script>

{#if !hasToken}
  <Login/>
{:else}
  <WebPlayback/>
{/if}

<button on:click={getClientSpecs}>Get Client Specifications</button>
<p>Client ID = {client_id}</p>
<p>Client Secret = {client_secret}</p>
<p>Client Token = {client_token}</p>

<Profile/>
