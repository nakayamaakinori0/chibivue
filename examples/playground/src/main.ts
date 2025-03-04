import { createApp, h } from "chibivue";
import { reactive } from "../../../packages/reactivity";

const CounterComponent = {
  setup() {
    console.log("CounterComponent");
    const state = reactive({ count: 0 });
    const increment = () => state.count++;
    return () =>
      h("div", {}, [
        h("p", {}, [`count: ${state.count}`]),
        h("button", { onClick: increment }, ["increment"]),
      ]);
  },
};

const ZhangNing = {
  setup() {
    const state = reactive({ clicked: false });
    const clickHandler = () => {
      state.clicked = !state.clicked;
    };
    return () =>
      h("div", { onClick: clickHandler }, [
        h("p", { style: state.clicked ? "color: red;" : "" }, ["ZhangNing"]),
      ]);
  },
};

const app = createApp({
  setup() {
    return () =>
      h("div", { id: "my-app" }, [
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
        h(ZhangNing, {}, []),
      ]);
  },
});

app.mount("#app"); // #appがselectorとして渡される
