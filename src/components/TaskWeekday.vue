<template>
  <div class="task__days">
    <p
      v-for="(day, indx) in days"
      :key="indx"
      @click="getDay(indx)"
      :class="{ active: isActive == indx }"
    >
      {{ day }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TaskWeekday",
  data() {
    return {
      days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      isActive: 0,
    };
  },
  methods: {
    getDay(indx) {
      this.$emit("CurentDay", indx);
      this.isActive = indx;
    },
  },
  created() {
    const date = new Date();
    this.isActive = date.getDay() - 1;
    this.$emit("CurentDay", this.isActive);
  },
};
</script>

<style lang="scss">
.task__days {
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    cursor: pointer;
    margin-top: 5px;
  }
  & p:hover {
    color: red;
  }
}
.active {
  color: red;
  width: 40px;
  border: 2px solid red;
}
</style>
