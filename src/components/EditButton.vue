<script setup lang="ts">
import IconEdit from "./icons/IconEdit.vue";
</script>

<template>
  <button class="round-button edit-button">
    <IconEdit />
  </button>
</template>

<style>
.edit-button {
  background-color: var(--color-edit-button);
}

@media (hover: hover) {
  .edit-button:hover {
    background-color: var(--c-blue-ligther);
  }
}
</style>
