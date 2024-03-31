<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type ArrayType<T> = T extends (infer Item)[] ? Item : T;

  const dispatch = createEventDispatcher();
  let selectedConcept: ArrayType<typeof concepts> | null = null;

  const concepts = [
    {
      name: "OAuth 2.0",
      icon: "🔒",
    },
    {
      name: "photosynthesis process",
      icon: "🌱",
    },
    {
      name: "human metabolism",
      icon: "🤹",
    },
    {
      name: "dropshipping business",
      icon: "👕",
    },
    {
      name: "applying for mortgage loan",
      icon: "🏦",
    },
    {
      name: "making instant noodles",
      icon: "🍜",
    },
    {
      name: "YouTube channel monetization",
      icon: "🤳",
    },
    {
      name: "building and distributing an Electron app",
      icon: "⚛️",
    },
  ];

  const handleClick = (evt: Event) => {
    if (evt.target instanceof HTMLButtonElement && evt.target.dataset.name) {
      const text = evt.target.dataset.name;
      selectedConcept = concepts.find((item) => item.name === text) || null;
    }
  };

  const handleSubmit = () => {
    if (selectedConcept) {
      dispatch("submit", selectedConcept.name);
    }
  };
</script>

<h1>Explain with Gemini AI + Mermaid diagram</h1>

<div class="options-container">
  {#each concepts as concept}
    <button
      on:click={handleClick}
      data-name={concept.name}
      type="button"
      class="option"
      class:option--active={selectedConcept?.name === concept.name}
    >
      <span aria-hidden="true">{concept.icon}</span>
      {concept.name}
    </button>
  {/each}
</div>
<div>
  <button
    on:click={handleSubmit}
    disabled={!selectedConcept}
    class="submit-btn"
  >
    Explain
  </button>
</div>

<style>
  .options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .option {
    list-height: 1;
    border: 2px solid currentColor;
    border-radius: 1.25rem;
    padding: 0.5rem 1rem;
  }
  .option--active {
    background: beige;
  }
  .submit-btn {
    font-size: 1.25em;
  }
</style>
