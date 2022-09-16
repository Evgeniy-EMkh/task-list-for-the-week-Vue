<template>
  <div class="form">
    <div class="task__item" v-for="item in taskList[curentDay]" :key="item.id">
      <div :class="{ expired: item.time < curentTime }">
        <p>{{ item.time }}</p>
        <p>{{ item.text }}</p>
      </div>
      <p class="delete__btn" @click="deleteData(item)">x</p>
    </div>
    <div class="input-form">
      <input class="input" type="text" v-model.lazy="taskTime" />
      <input class="input" type="text" v-model.lazy="taskText" />
      <p class="add__btn" @click="addData">+</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskForm",
  props: {
    curentDay: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      taskList: {},
      taskTime: "",
      taskText: "",
      curentTime: "",
    };
  },
  methods: {
    addData() {
      const taskItem = [];
      taskItem[0] = this.curentDay;
      taskItem[1] = {
        id: this.taskList[this.curentDay].length,
        time: this.taskTime,
        text: this.taskText,
      };

      this.taskTime = "";
      this.taskText = "";

      this.$store.commit("setTaskList", taskItem);
    },
    deleteData(item) {
      const taskItem = [this.curentDay, item.id];
      this.$store.commit("deleteTaskList", taskItem);
    },
  },
  created() {
    this.taskList = this.$store.getters.getTaskList;
  },
  updated() {
    const time = new Date();
    this.curentTime = `${time.getHours()}:${time.getMinutes()}`;
    this.taskList[this.curentDay].sort(
      (a, b) =>
        Number(a.time.split(":").join("")) - Number(b.time.split(":").join(""))
    );
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 500px;
}
.input-form,
.task__item {
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    display: flex;
    justify-content: space-between;
    width: 400px;
    border: 1px solid black;

    & p {
      display: inline-block;
      width: 200px;
    }
  }
}
.input-form {
  margin-top: 30px;

  & .input {
    width: 200px;
  }
}
.add__btn,
.delete__btn {
  margin-left: 20px;
  display: inline-block;
  font-size: 25px;
  cursor: pointer;
}
.add__btn:hover,
.delete__btn:hover {
  color: red;
}
.expired {
  background-color: rgb(231, 178, 169);
}
</style>
