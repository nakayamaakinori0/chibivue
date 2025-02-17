import { RendererOptions } from "../runtime-core";

/**
 * DOM操作のための基本的な操作セットを提供するオブジェクト
 * @type {Omit<RendererOptions, "patchProp">}
 */
export const nodeOps: Omit<RendererOptions, "patchProp"> = {
  /**
   * 指定されたタグ名のHTML要素を作成
   * @param {string} tagName - 作成する要素のタグ名(例： div, span)
   * @returns {HTMLElement} 作成されたHTML要素
   */
  createElement: (tagName: string): HTMLElement => {
    return document.createElement(tagName);
  },

  /**
   * テキストノードを作成する
   * @param text {string} text - テキストノードの内容
   * @returns {Text} 作成されたテキストノード
   */
  createText: (text: string): Text => {
    return document.createTextNode(text);
  },

  setText: (node, text) => {
    node.nodeValue = text;
  },

  /**
   * 要素のテキストコンテンツを設定する
   * @param {Node} node node - テキストを設定する対象のノード
   * @param {string} text - 設定するテキスト
   */
  setElementText(node: Node, text: string): void {
    node.textContent = text;
  },

  /**
   * 子要素を親要素に挿入する
   * @param {Node} child - 挿入する子要素
   * @param {Node} parent - 親要素
   * @param {Node | null} [anchor] - 挿入位置の参照要素(nullの場合は末尾に追加)
   */
  insert: (child: Node, parent: Node, anchor: Node | null): void => {
    parent.insertBefore(child, anchor || null);
  },
};
