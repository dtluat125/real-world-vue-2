<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <nav id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
    </nav>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  name: "EventDetails",
  props: ["id"],
  inject: ["GStore"],
};
</script>
