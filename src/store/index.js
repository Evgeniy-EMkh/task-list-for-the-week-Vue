import { createStore } from "vuex";

export default createStore({
  state: {
    taskList: {
      0: [],
      1: [],
      2: [],
      3: [
        { id: 0, time: "12:50", text: "daliy meeting" },
        { id: 1, time: "11:20", text: "work" },
        { id: 2, time: "13:55", text: "dinner" },
        { id: 3, time: "18:00", text: "end of work" },
      ],
      4: [],
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
  },
  actions: {},
});
