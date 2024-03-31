<script lang="ts">
  let prompt = "";
  let uiState = {
    response: "",
    error: "",
    isLoading: false,
  };

  async function handleSubmit() {
    uiState = {
      response: "",
      error: "",
      isLoading: true,
    };
    try {
      const apiRes = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.response && !data.promptFeedback) {
          uiState.response = data.response;
        } else if (data.promptFeedback) {
          uiState.error = `${data.response} — ${JSON.stringify(data.promptFeedback)}`;
        } else {
          uiState.error = `Unknown error: Missing response`;
        }
      } else {
        const errorText = (await apiRes.text()) || apiRes.statusText;
        uiState.error = `Error ${apiRes.status}: ${errorText}`;
      }
    } catch (err) {
      uiState.error = `Unknown error: ${JSON.stringify(err)}`;
    } finally {
      uiState.isLoading = false;
    }
  }
</script>

<p id="desc-text">Ask Gemini</p>
<form aria-labelledby="desc-text" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="prompt-input" class="flex flex-col"> Write your prompt </label>
    <input
      id="prompt-input"
      bind:value={prompt}
      disabled={uiState.isLoading}
      aria-invalid={!!uiState.error}
      aria-describedby={uiState.error ? "prompter-error" : undefined}
      class="border border-gray-500 rounded"
    />
  </div>
  <button type="submit" disabled={uiState.isLoading} class="btn btn-primary">
    Submit
  </button>
</form>
<hr />
{#if uiState.response}
  <p aria-live="polite">{uiState.response}</p>
{/if}
{#if uiState.error}
  <p id="prompter-error" aria-live="polite" class="text-red-700">
    {uiState.error}
  </p>
{/if}
