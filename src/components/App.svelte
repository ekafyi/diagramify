<script lang="ts">
  import OptionsSelect from "./OptionsSelect.svelte";
  import ResultRenderer from "./ResultRenderer.svelte";

  let uiState = {
    response: "",
    error: "",
    isLoading: false,
  };

  const fetchData = async (concept: string) => {
    uiState = {
      response: "",
      error: "",
      isLoading: true,
    };

    const prompt = `You are a helpful educator. Explain ${concept} as a Mermaid diagram. Choose from the most appropriate Mermaid syntaxes: flowchart, sequenceDiagram, classDiagram, stateDiagram, erDiagram, journey, gantt, pie, gitGraph. Use the latest version and refer to the docs (https://mermaid.js.org/intro).\n\nIf you don't understand or cannot explain the concept in a diagram, respond with NO_DIAGRAM. Else, ﻿under the Mermaid code, include 1-3 links to further explanation or resources related to the concept. Use a bullet list format with no heading text. The links must have a title and must come from official or trustworthy source. Omit links about Mermaid or diagrams.`;

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
  };

  const handleSubmit = async (concept: CustomEvent<string>) => {
    fetchData(concept.detail);
  };
</script>

<OptionsSelect on:submit={handleSubmit} />

{#if uiState.isLoading}
  <div>loading...</div>
{:else if uiState.error}
  <p id="prompter-error" aria-live="polite">
    {uiState.error}
  </p>
{:else if uiState.response}
  <ResultRenderer response={uiState.response} />
{/if}
