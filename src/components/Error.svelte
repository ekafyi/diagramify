<script lang="ts">
  export let title = "Error!";
  export let msg = "";
</script>

<div role="alert" class="alert" aria-labelledby="error-heading">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="stroke-error shrink-0 w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
  <div>
    <p id="error-heading" class="font-bold">{title}</p>
    {#if msg}
      <p class="text-sm mt-1">
        {msg}
      </p>
    {/if}
  </div>
</div>
