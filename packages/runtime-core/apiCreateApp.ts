import { Component } from "./component";
import { RootRenderFunction } from "./renderer";

/**
 * Vueアプリケーションインターフェース
 * @template HostElement - マウント先のDOM要素の型
 */
export interface App<HostElement = any> {
  /**
   * アプリケーションをDOMにマウント
   * @param rootContainer -  マウント先のDOM要素
   * @returns {void}
   */
  mount(rootContainer: HostElement | string): void;
}

/**
 * アプリケーション作成関数の型
 * @template HostElement - マウント先のDOM要素の型
 */
export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

/**
 * アプリケーション作成関数
 * @template HostElement - マウント先のDOM要素の型
 */
export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  /**
   * Vueアプリケーション作成
   * @param rootComponent - マウント先のDOM要素
   */
  return function createApp(rootComponent) {
    const app: App = {
      mount(rootContainer: HostElement) {
        const vnode = rootComponent.render!();
        console.log("vnode", vnode);
        render(vnode, rootContainer);
      },
    };
    return app;
  };
}
