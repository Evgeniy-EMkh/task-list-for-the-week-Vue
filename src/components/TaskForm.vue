<template>
  <div class="form">
    <div class="form__star">*</div>

    <transition-group name="taskanimation" tag="div">
      <div
        class="task__form"
        v-for="(item, indx) in displayedTaskList"
        :key="item.id"
      >
        <div
          class="task__form-item"
          :class="{ expired: item.time < curentTime }"
        >
          <input
            class="input-task"
            type="text"
            v-model.lazy="displayedTaskList[indx].time"
          />
          <input
            class="input-task"
            type="text"
            v-model.lazy="displayedTaskList[indx].text"
          />
        </div>
        <p class="delete__btn" @click="deleteData(item)">x</p>
      </div>
    </transition-group>
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
      displayedTaskList: [],
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
      this.taskList = this.$store.getters.getTaskList;
    },
    deleteData(item) {
      const taskItem = [this.curentDay, item.id];
      this.$store.commit("deleteTaskList", taskItem);
      this.taskList = this.$store.getters.getTaskList;
      this.displayedTaskList = this.taskList[this.curentDay];
    },
  },
  mounted() {
    this.taskList = this.$store.getters.getTaskList;
    this.taskList[this.curentDay].forEach((el) =>
      this.displayedTaskList.push(el)
    );
  },

  updated() {
    this.displayedTaskList = this.taskList[this.curentDay];
    const time = new Date();
    this.curentTime = `${time.getHours()}:${time.getMinutes()}`;
    this.displayedTaskList.sort(
      (a, b) =>
        Number(a.time.split(":").join("")) - Number(b.time.split(":").join(""))
    );

    const taskItemItem = [];
    taskItemItem[0] = this.curentDay;
    taskItemItem[1] = this.displayedTaskList;
    this.$store.commit("updateTaskList", taskItemItem);
    console.log("updated");
    console.log("curent day", this.curentDay);
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 500px;
  padding: 20px;
  border: 2px solid black;
}
.input-form,
.task__form {
  display: flex;
  justify-content: center;
  align-items: center;

  & .task__form-item {
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
.input-task {
  border: none;
  background-color: transparent;
}
.form__star {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 43px;
  cursor: pointer;
  margin-right: 9px;
}

// animation

.taskanimation-enter-active {
  transition: all 0.4s ease;
}

.taskanimation-enter-from {
  opacity: 0;
  transform: translateY(150px);
}
</style>
