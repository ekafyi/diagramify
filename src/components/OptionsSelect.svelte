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
    // // (Leave to check error UI)
    // {
    //   name: "making a bomb", // dangerous
    //   icon: "💣",
    // },
    // {
    //   name: "scamming pensioners", // also dangerous
    //   icon: "💸",
    // },
    // {
    //   name: "asdfgjlkjhgf", // gibberish
    //   icon: "🤔",
    // },
  ];

  const handleClick = (evt: Event) => {
    if (evt.target instanceof HTMLButtonElement && evt.target.dataset.name) {
      const text = evt.target.dataset.name;
      selectedConcept = concepts.find((item) => item.name === text) || null;
    } else {
      console.warn("Invalid element — button expected");
    }
  };

  const handleSubmit = () => {
    if (selectedConcept && selectedConcept.name) {
      dispatch("submit", selectedConcept.name);
    } else {
      console.warn("No option selected");
      alert("Select an option");
    }
  };
</script>

<div class="flex flex-wrap gap-2">
  {#each concepts as concept}
    <button
      on:click={handleClick}
      data-name={concept.name}
      type="button"
      class="btn rounded-full"
      class:btn-outline={selectedConcept?.name !== concept.name}
      class:btn-accent={selectedConcept?.name === concept.name}
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
    class="btn btn-primary btn-lg px-10"
  >
    Get diagram
  </button>
</div>
