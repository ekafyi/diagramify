<script lang="ts">
  import { onMount } from "svelte";
  import mermaid from "mermaid";

  import Error from "./Error.svelte";

  export let content = "";

  let containerEl: HTMLElement;
  let hasMounted = false;
  let error = "";

  const renderDiagram = async () => {
    try {
      const { svg } = await mermaid.render("svelte-mermaid", content);
      containerEl.innerHTML = svg;
    } catch (err) {
      error = err.name;
      console.warn(`${err.name} — ${err.message}`);
    }
  };

  onMount(() => {
    hasMounted = true;
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        fontFamily: "inherit",
        // primaryColor: "#BB2528",
        // primaryTextColor: "#fff",
        primaryBorderColor: "#7480ff",
        lineColor: "#00cdb8",
        // secondaryColor: "#006100",
        // tertiaryColor: "#fff",
      },
    });
  });

  $: content && hasMounted && renderDiagram();
</script>

<div bind:this={containerEl} class="flex justify-center"></div>

{#if error}
  <Error title={error} msg="Error rendering diagram. Reload and try again." />
{:else}
  <div class="mockup-code text-xs md:text-sm">
    <pre><code>{content}</code></pre>
  </div>
{/if}

<style>
  .mockup-code pre:before {
    content: none;
  }
  .mockup-code pre {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }
</style>
