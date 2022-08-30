<template>
  <p>Register for the event here</p>
  <button @click="register">Register me!</button>
</template>
<script>
export default {
  props: ["event"],
  name: "EventRegister",
  inject: ["GStore"],
  methods: {
    register() {
      this.GStore.flashMessage = `You are successfully reigstered for ${this.event.title}`;
      setTimeout(() => {
        // After 3 seconds remove it
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.push({
        name: "EventDetails",
        params: { id: this.event.id },
      });
    },
  },
};
</script>
