<script lang="ts">
  import OptionsSelect from "./OptionsSelect.svelte";
  import ResultRenderer from "./ResultRenderer.svelte";
  import Error from "./Error.svelte";

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

    const prompt = `You are an educator. Explain this concept as a Mermaid diagram: ${concept}. Choose from the most appropriate Mermaid syntaxes: flowchart, sequenceDiagram, classDiagram, stateDiagram, erDiagram, journey, gantt, pie, gitGraph. Use the latest version and refer to the docs (https://mermaid.js.org/intro).\n\nIf using sequenceDiagram, write the arrow as "->>" instead of "->".\n\nIf you don't understand or cannot explain the concept in a diagram, respond with NO_DIAGRAM. Else, ﻿under the Mermaid code, include 1-3 links to further explanation or resources related to the concept. Use a bullet list format with no heading text. The links must have a title and must come from official or trustworthy source. Omit links about Mermaid or diagrams.`;

    try {
      const apiRes = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (apiRes.ok) {
        const data = await apiRes.json();

        if (data.response === "NO_DIAGRAM") {
          uiState.error = `Gemini doesn’t understand the query or it violates safety settings. Try rephrasing your query.`;
        } else if (data.promptFeedback) {
          uiState.error = `${data.response} — ${JSON.stringify(data.promptFeedback.safetyRatings)}`;
        } else if (data.response) {
          uiState.response = data.response;
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

<div class="app-container grid lg:grid-cols-2 gap-10 xl:gap-12">
  <div class="space-y-6 lg:space-y-8">
    <h1 class="text-4xl font-bold leading-none py-4 lg:py-0">
      Explain <em class="text-accent">concepts</em> with&nbsp;<em
        class="text-primary">diagrams</em
      >
    </h1>
    <OptionsSelect on:submit={handleSubmit} />
  </div>
  <div
    aria-live="polite"
    aria-busy={uiState.isLoading ? "true" : "false"}
    class="space-y-2"
    class:flex={uiState.isLoading}
  >
    {#if uiState.isLoading}
      <div
        class="loading loading-spinner loading-lg mx-auto"
        aria-label="loading"
      />
    {:else if uiState.error}
      <Error title={"Server response issue"} msg={uiState.error} />
    {:else if uiState.response}
      <ResultRenderer response={uiState.response} />
    {/if}
  </div>
</div>

<style>
  em {
    font-style: normal;
  }
  @media (min-width: 1024px) {
    h1 {
      font-size: clamp(2.5rem, 5vw, 3.75rem);
    }
  }
  @media (min-width: 1280px) {
    .app-container {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
  }
</style>
