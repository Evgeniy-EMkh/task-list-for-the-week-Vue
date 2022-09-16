import { createStore } from "vuex";

export default createStore({
  state: {
    taskList: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [
        { id: 0, time: "10:20", text: "coffe" },
        { id: 1, time: "12:50", text: "daliy meeting" },
        { id: 2, time: "11:20", text: "work" },
        { id: 3, time: "13:55", text: "dinner" },
        { id: 4, time: "18:00", text: "end of work" },
      ],
      5: [],
      6: [],
    },
  },
  getters: {
    getTaskList: (state) => state.taskList,
  },
  mutations: {
    setTaskList: (state, payload) => {
      state.taskList[payload[0]].push(payload[1]);
    },
    deleteTaskList: (state, payload) => {
      state.taskList[payload[0]] = state.taskList[payload[0]].filter(
        (el) => el.id !== payload[1]
      );
    },
    updateTaskList: (state, payload) => {
      state.taskList[payload[0]] = payload[1];
    },
  },
  actions: {},
});
