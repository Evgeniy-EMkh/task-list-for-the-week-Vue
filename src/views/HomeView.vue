<template>
  <div class="home">
    <h1>TASK MANAGER</h1>
    <div class="container">
      <TaskForm :curentDay="curentDay" />
      <TaskWeekday @CurentDay="CurentDay" />
    </div>
  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm.vue";
import TaskWeekday from "@/components/TaskWeekday.vue";
export default {
  name: "HomeView",
  components: {
    TaskForm,
    TaskWeekday,
  },
  data() {
    return {
      curentDay: 0,
    };
  },
  methods: {
    CurentDay(day) {
      this.curentDay = day;
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 1000px;
}
.home h1 {
  margin-bottom: 40px;
}
</style>
