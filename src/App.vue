<script setup lang="ts">
import { onMounted } from "vue";
import { useEventsStore } from "@/stores/events";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import Dashboard from "./components/Dashboard.vue";

const eventsStore = useEventsStore();

// Get events in real time after app mount
const eventsCollectionRef = collection(db, "events");
const eventsCollectionQuery = query(eventsCollectionRef, orderBy("id"));

onMounted(() => {
  onSnapshot(eventsCollectionQuery, (querySnapshot) => {
    const fbEvents: any = [];
    querySnapshot.forEach((doc) => {
      const event = {
        id: doc.data().id,
        name: doc.data().name,
        description: doc.data().description,
        type: doc.data().type,
        priority: doc.data().priority,
        relatedEvents: doc.data()["related-events"],
        docId: doc.id,
        isBeingEdited: false,
        isNew: false,
      };
      fbEvents.push(event);
    });
    eventsStore.events = fbEvents;
  });
});
</script>

<template>
  <header>
    <h1>Events7</h1>
    <p class="instructions">
      You can define events by clicking the "Add Event" button. Event definition
      must contain a unique ID, an event name, description, type and priority.
      You can edit an event by clicking the blue "pencil" button, save it by
      clicking the green "check" button or delete it by clicking the red "bin"
      button.
    </p>
  </header>

  <main>
    <Dashboard />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 2rem;
}

h1 {
  color: var(--color-title);
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
}

.instructions {
  max-width: 60rem;
  margin: auto;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--color-instructions);
}

@media (min-width: 1024px) {
  h1 {
    font-size: 3.75rem;
  }
}
</style>
