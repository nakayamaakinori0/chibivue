import { createApp, h } from "chibivue";
import { reactive } from "../../../packages/reactivity";

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };

    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", {}, [`count: ${state.count}`]),
        h("button", { onClick: increment }, ["increment"]),
      ]); // vnode
    };
  },
});

app.mount("#app"); // #appがselectorとして渡される
