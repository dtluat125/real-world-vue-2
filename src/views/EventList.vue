<template>
  <div class="home">
    <h1>Events For Good</h1>

    <div v-if="events" class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    };
  },
  async created() {
    try {
      const response = await EventService.getEvents();
      this.events = response.data;
    } catch (error) {
      alert(error.message);
    }
  },
};
</script>

<style lang="scss">
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
