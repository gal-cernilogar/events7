<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useEventsStore } from "@/stores/events";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import IconDelete from "./icons/IconDelete.vue";
import IconEdit from "./icons/IconEdit.vue";
import IconDone from "./icons/IconDone.vue";

const eventsStore = useEventsStore();

const props = defineProps<{
  event: EventType;
}>();

// watch(eventsStore.events, (newEvents, oldEvents) => {
//   if (newEvents.length < oldEvents.length) {
//     console.log("New length is shorter than old.");
//   }
// });

// watch(eventsStore.getOtherEvents(props.event), (otherEvents) => {
//   const index = eventsStore.events.findIndex((e) => e === props.event);
//   eventsStore.events[index].relatedEvents?.filter((relatedEvent: string) => {
//     otherEvents.forEach((event) => event.name === relatedEvent);
//   });
// });

// const relatedEventsFiltered = computed(() => {
//   const index = eventsStore.events.findIndex((e) => e === props.event);
//   return eventsStore.events[index].relatedEvents?.filter((eventName) => {
//     eventsStore
//       .getOtherEvents(props.event)
//       .forEach((event) => event.name === eventName);
//   });
// });

const createEvent = (event: EventType) => {
  addDoc(collection(db, "events"), {
    id: event.id,
    name: event.name,
    description: event.description,
    type: event.type,
    priority: event.priority,
    "related-events": event.relatedEvents,
  });
  event.isNew = false;
  event.isBeingEdited = false;
  eventsStore.editing = false;
  eventsStore.newEvent.pop();
};

const editEvent = (event: EventType) => {
  event.isBeingEdited = true;
  eventsStore.editing = true;
};

const updateEvent = (event: EventType) => {
  updateDoc(doc(db, "events", event.docId), {
    id: event.id,
    name: event.name,
    description: event.description,
    type: event.type,
    priority: event.priority,
    "related-events": event.relatedEvents,
  });
  event.isBeingEdited = false;
  eventsStore.editing = false;
};

const onSubmit = () => {
  // Check for ID uniqueness
  for (const event of eventsStore.getOtherEvents(props.event)) {
    if (props.event.id === event.id) {
      alert("Event ID must be unique.");
      return;
    }
  }
  if (props.event.isBeingEdited && props.event.isNew)
    return createEvent(props.event);
  if (props.event.isBeingEdited && !props.event.isNew)
    return updateEvent(props.event);
};

const deleteEvent = (event: EventType) => {
  if (event.isNew) {
    eventsStore.newEvent.pop();
  } else {
    deleteDoc(doc(db, "events", event.docId));
  }
  event.isBeingEdited = false;
  eventsStore.editing = false;
  // this.events.forEach((e) => {
  //   e.relatedEvents = e.relatedEvents?.filter((relatedEvent) => {
  //     this.events.forEach((ev) => {
  //       return ev.name !== relatedEvent;
  //     });
  //   });
  // });
  // this.events.forEach((e) => {
  //   e.relatedEvents = e.relatedEvents?.filter((relatedEvent) => {
  //     console.log(event.name !== relatedEvent);
  //     event.name !== relatedEvent;
  //   });
  // });
};
</script>

<template>
  <li class="event-card">
    <form class="event-form" @submit.prevent="onSubmit">
      <div class="event-field">
        <label for="id">ID</label>
        <input
          v-model="props.event.id"
          type="text"
          class="text-input"
          id="id"
          placeholder="ID"
          autocomplete="off"
          maxlength="3"
          required
          v-if="props.event.isBeingEdited"
        />
        <p v-else>{{ props.event.id }}</p>
      </div>
      <div class="event-field">
        <label for="name">Name</label>
        <input
          v-model="props.event.name"
          class="text-input"
          id="name"
          placeholder="Name"
          autocomplete="off"
          required
          v-if="props.event.isBeingEdited"
        />
        <p v-else>{{ props.event.name }}</p>
      </div>
      <div class="event-field">
        <label for="description">Description</label>
        <textarea
          v-model="props.event.description"
          class="text-input"
          id="description"
          placeholder="Description"
          rows="1"
          required
          v-if="props.event.isBeingEdited"
        >
        </textarea>
        <p v-else>{{ props.event.description }}</p>
      </div>
      <div class="event-field">
        <label for="type">Type</label>
        <select
          v-model="props.event.type"
          class="dropdown"
          name="type"
          id="type"
          required
          v-if="props.event.isBeingEdited"
        >
          <option disabled value=""></option>
          <option value="crosspromo">crosspromo</option>
          <option value="liveops">liveops</option>
          <option value="app">app</option>
          <option value="ads">ads</option>
        </select>
        <p v-else>{{ props.event.type }}</p>
      </div>
      <div class="event-field">
        <label for="priority">Priority</label>
        <select
          v-model="props.event.priority"
          class="dropdown"
          name="priority"
          id="priority"
          required
          v-if="props.event.isBeingEdited"
        >
          <option disabled value=""></option>
          <option v-for="i in 11" :value="i - 1">{{ i - 1 }}</option>
        </select>
        <p v-else>{{ props.event.priority }}</p>
      </div>
      <div class="event-field">
        <label for="related-events">Related Events</label>
        <ul class="related-events-choices" v-if="props.event.isBeingEdited">
          <li v-for="event in eventsStore.getOtherEvents(props.event)">
            <input
              type="checkbox"
              :value="event.name"
              v-model="props.event.relatedEvents"
            />
            {{ event.name }}
          </li>
        </ul>
        <ul class="related-events-list" v-else>
          <li v-for="event in props.event.relatedEvents">
            {{ event }}
          </li>
        </ul>
      </div>
      <div class="event-field event-buttons">
        <button
          v-if="props.event.isBeingEdited"
          class="round-button update-button"
        >
          <IconDone />
        </button>
        <button
          v-else
          @click="editEvent(props.event)"
          class="round-button edit-button"
          :disabled="eventsStore.editing"
        >
          <IconEdit />
        </button>
        <button
          @click="deleteEvent(props.event)"
          class="round-button delete-button"
          :disabled="eventsStore.editing && !props.event.isBeingEdited"
        >
          <IconDelete />
        </button>
      </div>
    </form>
  </li>
</template>

<style scoped>
.event-card {
  padding-inline: 1rem;
  padding-block: 1rem;
  border-radius: 1rem;
  background-color: var(--color-card);
}

.event-card:not(:last-child) {
  margin-bottom: 1rem;
}

.event-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}

.event-field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem;
}

.event-field p {
  word-break: break-word;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

.event-field > label {
  font-size: 0.875rem;
  color: var(--c-red);
  font-weight: 600;
}

.text-input {
  word-break: break-word;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: var(--color-text);
  background-color: #444444;
}

textarea {
  resize: vertical;
  min-height: 5rem;
}

.dropdown {
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: var(--color-text);
  background-color: #444444;
}

input[type="checkbox"] {
  transform: scale(1.25);
  margin-right: 0.5rem;
}

.related-events-choices,
.related-events-list {
  width: 100%;
  min-height: 2.48rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: var(--color-text);
  /* background-color: #444444; */
  /* background-color: transparent; */
}

.related-events-choices {
  list-style: none;
}

.related-events-list {
  list-style: disc;
  padding-left: 2rem;
}

.event-buttons {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;
}
.round-button:disabled {
  background-color: #777777;
  opacity: 0.8;
  cursor: default;
}

.edit-button {
  background-color: var(--color-edit-button);
}

.delete-button {
  background-color: var(--color-delete-button);
}
.update-button,
.create-button {
  background-color: var(--color-done-button);
}

@media (hover: hover) {
  .edit-button:hover {
    background-color: var(--c-blue-ligther);
  }

  .delete-button:hover {
    background-color: var(--c-red);
  }
  .update-button:hover,
  .create-button:hover {
    background-color: var(--c-green);
  }
  .round-button:disabled {
    background: #777777;
  }
}

@media (min-width: 1024px) {
  .event-card {
    padding-block: 0rem;
  }
  .event-form {
    grid-template-columns: 1.5fr 3fr 6fr 2.5fr 1.5fr 4fr 8rem;
    grid-template-rows: 1fr;
  }
  .event-field > label {
    display: none;
  }
  textarea {
    min-height: 2.48rem;
  }
}
</style>
