<script setup lang="ts">
import { useEventsStore } from "@/stores/events";
import Event from "./Event.vue";

const eventsStore = useEventsStore();

const addEvent = () => {
  const event = {
    id: "",
    name: "",
    description: "",
    type: "",
    priority: null,
    relatedEvents: [],
    docId: "",
    isBeingEdited: true,
    isNew: true,
  };
  eventsStore.newEvent.push(event);

  eventsStore.editing = true;
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="dashboard-id">ID</div>
      <div class="dashboard-name">Name</div>
      <div class="dashboard-description">Description</div>
      <div class="dashboard-type">Type</div>
      <div class="dashboard-priority">Priority</div>
      <div class="dashboard-related-events">Related Events</div>
    </div>
    <div class="dashboard-content">
      <ul class="event-list">
        <Event v-for="event in eventsStore.events" :event="event" />
      </ul>
      <ul class="event-list">
        <Event v-for="event in eventsStore.newEvent" :event="event" />
      </ul>
      <button
        @click="addEvent"
        class="add-button"
        :disabled="eventsStore.editing"
      >
        + Add Event
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-header {
  display: none;
}

.dashboard-header > * {
  padding: 1rem;
}

.dashboard-content {
  width: 100%;
  height: calc(100vh - 18rem);
  /* padding-inline: 1rem; */
  overflow: overlay;
}

.event-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.add-button {
  background-color: var(--color-add-button);
}

.add-button:disabled {
  background-color: #777777;
  opacity: 0.8;
  cursor: default;
}

@media (hover: hover) {
  .add-button:hover {
    background-color: var(--c-red-darker);
  }
  .add-button:disabled {
    background: #777777;
  }
}

@media (min-width: 1024px) {
  .dashboard-header {
    width: 100%;
    padding-inline: 1rem;
    display: grid;
    grid-template-columns: 1.5fr 3fr 6fr 2.5fr 1.5fr 4fr 8rem;
    background-color: var(--color-dashboard-header);
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
