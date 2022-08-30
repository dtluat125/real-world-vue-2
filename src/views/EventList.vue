<template>
  <div class="events">
    <h1>Events For Good</h1>

    <div v-if="events" class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="pagination">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        >&#60; Previous</router-link
      >
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },

  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      const response = await EventService.getEvents(2, routeTo.query.page || 1);
      next((comp) => {
        comp.events = response.data;
        comp.totalEvents = response.headers["x-total-count"];
      });
    } catch (error) {
      next({ name: "NetworkError" });
    }
  },

  async beforeRouteUpdate(routeTo, routeFrom, next) {
    try {
      const response = await EventService.getEvents(2, routeTo.query.page || 1);
      this.events = response.data;
      this.totalEvents = response.headers["x-total-count"];
      next();
    } catch (error) {
      next({ name: "NetworkError" });
    }
  },

  computed: {
    hasNextPage() {
      const totalPage = Math.ceil(this.totalEvents / 2);

      return this.page < totalPage;
    },
  },
};
</script>

<style lang="scss">
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
  width: 290px;
  a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
  }

  #page-prev {
    text-align: left;
  }

  #page-next {
    text-align: right;
  }
}
</style>
