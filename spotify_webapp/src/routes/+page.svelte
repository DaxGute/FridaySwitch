<script>
    let volume
    let client_id
    let client_secret
    
    async function getClientSpecs() {
      const response = await fetch('/auth');
      let clientSpecs = await response.json();

      client_id = clientSpecs["client_id"]
      client_secret = clientSpecs["client_secret"]
      console.log(client_id)
	  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={getClientSpecs}>Get Client Specifications</button>
<p>Client ID = {client_id}</p>
<p>Client Secret= {client_secret}</p>
