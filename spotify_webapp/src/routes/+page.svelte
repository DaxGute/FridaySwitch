<script>
	import { onMount } from 'svelte';
  import Login from './Login.svelte'
  import WebPlayback from './WebPlayback.svelte';
  import Profile from './Profile.svelte';

  let token = ""

  onMount(async () => {
    let response = await fetch('/auth/token');
    let tokenJson = await response.json();
    token = tokenJson["access_token"]
    console.log("(+page) token is " + token)
  })

  let client_id
  let client_secret
  let client_token
  async function getClientSpecs() { //PURELY FOR TESTING
      const response = await fetch('/auth');
      let clientSpecs = await response.json();

      client_id = clientSpecs["client_id"]
      client_secret = clientSpecs["client_secret"]

      const tokenResponse = await fetch('/auth/token')
      let tokenSpecs = await tokenResponse.json()

      client_token = tokenSpecs["access_token"]
	  }
  
</script>

{#if token === undefined}
  <Login/>
{:else}
  <WebPlayback token={token} />
{/if}

<button on:click={getClientSpecs}>Get Client Specifications</button>
<p>Client ID = {client_id}</p>
<p>Client Secret = {client_secret}</p>
<p>Client Token = {client_token}</p>

<Profile token={token}/>
