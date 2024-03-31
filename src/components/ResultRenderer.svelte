<script lang="ts">
  import Mermaid from "./Mermaid.svelte";
  import Markdown from "svelte-exmarkdown";
  import Error from "./Error.svelte";

  import { getMermaidAndLinks } from "@/utils/str";

  let mermaidStr = "";
  let markdownStr = "";

  export let response = "";

  const split = getMermaidAndLinks(response);
  if (split?.mermaid) {
    mermaidStr = split.mermaid;
  }
  if (split?.markdown) {
    markdownStr = split.markdown;
  }
</script>

{#if mermaidStr}
  <div class="collapse collapse-arrow bg-base-200">
    <input
      type="radio"
      name="my-accordion-2"
      checked={true}
      data-umami-event="result-diagram-expand"
    />
    <div class="collapse-title text-xl font-medium">Diagram</div>
    <div class="collapse-content">
      <Mermaid content={mermaidStr} />
    </div>
  </div>
{:else}
  <Error
    title="Data issue"
    msg="Invalid or empty diagram. Try clicking “Get diagram” again."
  />
{/if}

{#if markdownStr}
  <div class="collapse collapse-arrow bg-base-200">
    <input
      type="radio"
      name="my-accordion-2"
      data-umami-event="result-links-expand"
    />
    <div class="collapse-title text-xl font-medium">Learn more</div>
    <div
      class="collapse-content prose prose-sm md:prose-base prose-a:text-primary hover:prose-a:no-underline"
    >
      <Markdown md={markdownStr} />
    </div>
  </div>
{/if}

{#if mermaidStr}
  <div class="collapse collapse-arrow bg-base-200">
    <input
      type="radio"
      name="my-accordion-2"
      data-umami-event="result-code-expand"
    />
    <div class="collapse-title text-xl font-medium">Code</div>
    <div class="collapse-content overflow-x-auto">
      <div class="mockup-code text-xs md:text-sm">
        <pre><code>{mermaidStr}</code></pre>
      </div>
    </div>
  </div>
{/if}

<style>
  .mockup-code pre:before {
    content: none;
  }
  .mockup-code pre {
    padding-right: 1rem;
    padding-left: 1rem;
  }
</style>
