import { VNode } from "./vnode";

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  patchProp(el: HostElement, key: string, value: any): void;

  createElement(type: string): HostNode;

  createText(text: string): HostNode;

  setElementText(node: HostNode, text: string): void;

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode | string,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const {
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options;

  function renderVNode(vnode: VNode | string) {
    // 文字列の場合はテキストノードを作成
    if (typeof vnode === "string") return hostCreateText(vnode);

    // 要素の作成
    const el = hostCreateElement(vnode.type);

    // 属性の設定
    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value);
    });

    // 子要素の再起的な作成と挿入
    for (const child of vnode.children) {
      const childEl = renderVNode(child);
      hostInsert(childEl, el);
    }

    return el;
  }

  /**
   * @module render
   * @param {VNode | string} vnode - setup関数から渡された値
   * @param {RendererElement} container - #appのDOM要素
   * @returns {void}
   */
  const render: RootRenderFunction = (vnode: VNode | string, container: RendererElement): void => {
    while (container.firstChild) container.removeChild(container.firstChild); // 全消し処理を追加
    const el = renderVNode(vnode);
    hostInsert(el, container);
  };

  return { render };
}
