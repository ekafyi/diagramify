<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type ArrayType<T> = T extends (infer Item)[] ? Item : T;

  const dispatch = createEventDispatcher();
  let selectedConcept: ArrayType<typeof concepts> | null = null;
  let customConcept: (typeof concepts)[0];

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
      icon: "💓",
    },
    {
      name: "dropshipping business",
      icon: "👕",
    },
    {
      name: "YouTube channel monetization",
      icon: "🤳",
    },
    {
      name: "applying for mortgage loan",
      icon: "🏦",
    },
    {
      name: "building and distributing an Electron app",
      icon: "⚛️",
    },
    {
      name: "making instant noodles",
      icon: "🍜",
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

  const handleCustomInput = () => {
    const MAX_LENGTH = 40;
    const userInput = window.prompt("Explain about…", "solar eclipse");

    if (userInput && userInput.length > MAX_LENGTH) {
      // @ts-ignore
      window.umami?.track("option-user-input", {
        name: userInput,
        status: "INVALID_INPUT",
      });
      return alert(`Keep it ${MAX_LENGTH} characters or shorter.`);
    }
    if (userInput) {
      customConcept = {
        name: userInput,
        icon: "💬",
      };
      concepts.push(customConcept);
      selectedConcept = customConcept;
      // @ts-ignore
      window.umami?.track("option-user-input", {
        name: userInput,
        status: "VALID",
      });
      return;
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

<div class="flex flex-wrap gap-2" aria-label="select a concept">
  {#each concepts as concept}
    <button
      on:click={handleClick}
      data-name={concept.name}
      data-umami-event="option-button"
      data-umami-event-name={concept.name}
      type="button"
      class="btn rounded-full"
      class:btn-outline={selectedConcept?.name !== concept.name}
      class:btn-accent={selectedConcept?.name === concept.name}
    >
      <span aria-hidden="true">{concept.icon}</span>
      {concept.name}
    </button>
  {/each}
  {#if !customConcept}
    <button
      on:click={handleCustomInput}
      data-umami-event="custom-option-button"
      class="btn rounded-full px-4"
    >
      Add your own
    </button>
  {/if}
</div>
<div>
  <button
    on:click={handleSubmit}
    disabled={!selectedConcept}
    data-umami-event={selectedConcept ? "submit-button" : undefined}
    data-umami-event-selected-name={selectedConcept?.name || undefined}
    class="btn btn-primary btn-lg px-10"
  >
    Get diagram
  </button>
</div>
