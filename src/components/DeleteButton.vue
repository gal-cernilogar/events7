<script setup lang="ts">
import IconDelete from "./icons/IconDelete.vue";
</script>

<template>
  <button class="round-button delete-button">
    <IconDelete />
  </button>
</template>

<style>
.delete-button {
  background-color: var(--color-delete-button);
}

@media (hover: hover) {
  .delete-button:hover {
    background-color: var(--c-red);
  }
}
</style>
