<script lang="ts">
  import Mermaid from "./Mermaid.svelte";
  import Markdown from "svelte-exmarkdown";
  import Error from "./Error.svelte";

  import { getMermaidAndLinks } from "@/utils/str";

  let mermaidStr = "";
  let markdownStr = "";

  export let response = `
\`\`\`mermaid
graph LR
subgraph YouTube Channel Monetization
    A[Create a YouTube channel] --> B[Build an audience]
    B --> C[Enable monetization]
    C --> D[Meet eligibility requirements]
    D --> E[Apply for the YouTube Partner Program]
    E --> F[Get approved]
    F --> G[Start earning money]
end
\`\`\`

- [YouTube Help: Monetization](https://support.google.com/youtube/answer/72851)
- [YouTube Creator Academy: How to Make Money on YouTube](https://creatoracademy.youtube.com/page/course/make-money-on-youtube)
- [Google AdSense Help: YouTube Monetization](https://support.google.com/adsense/answer/9317141)
	`;

  const split = getMermaidAndLinks(response);
  if (split?.mermaid) {
    mermaidStr = split.mermaid;
  }
  if (split?.markdown) {
    markdownStr = split.markdown;
  }
  // $: console.log(split);
</script>

{#if mermaidStr}
  <Mermaid content={mermaidStr} />
{:else}
  <Error
    title="Data issue"
    msg="Invalid or empty diagram. Try clicking “Get diagram” again."
  />
{/if}

{#if markdownStr}
  <section aria-labelledby="links-heading">
    <p id="links-heading">Learn more</p>
    <Markdown md={markdownStr} />
  </section>
{/if}
