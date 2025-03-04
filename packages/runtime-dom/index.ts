import {
  CreateAppFunction,
  createAppAPI,
  createRenderer,
} from "../runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const { render } = createRenderer({ ...nodeOps, patchProp });
const _createApp = createAppAPI(render);

export const createApp = ((...args) => {
  console.log("createApp");
  const app = _createApp(...args);
  const { mount } = app;
  app.mount = (selector: string) => {
    console.log("app.mount");
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container); // オリジナルのmountを呼び出し
  };
  return app;
}) as CreateAppFunction<Element>;
