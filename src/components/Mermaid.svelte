<script lang="ts">
  import { onMount } from "svelte";
  import mermaid from "mermaid";

  export let content = "";

  let containerEl: HTMLElement;
  let hasMounted = false;

  const renderDiagram = async () => {
    const { svg } = await mermaid.render("svelte-mermaid", content);
    containerEl.innerHTML = svg;
  };

  onMount(() => {
    hasMounted = true;
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif",
        primaryColor: "#BB2528",
        primaryTextColor: "#fff",
        primaryBorderColor: "#7C0000",
        lineColor: "#F8B229",
        secondaryColor: "#006100",
        tertiaryColor: "#fff",
      },
    });
  });

  $: content && hasMounted && renderDiagram();
</script>

<div bind:this={containerEl}></div>
