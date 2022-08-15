import { defineStore } from "pinia";

export const useEventsStore = defineStore({
  id: "events",
  state: () => ({
    events: [] as EventsType[],
    newEvent: [] as EventsType[],
    editing: false,
  }),
  getters: {
    getThisEvent: (state) => (event: EventType) =>
      state.events.find((e) => e === event),
    getOtherEvents: (state) => (event: EventType) =>
      state.events.filter((e) => e !== event),
  },
});
