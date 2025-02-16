import { Dep, createDep } from "./dep";

type KeyToDepMap = Map<any, Dep>;
const targetMap = new WeakMap<any, KeyToDepMap>();

// グローバルな現在のeffect
export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    // fnを実行する前のactiveEffectを保持しておいて、実行が終わった後下に戻す。
    // これをやらないと、どんどん上書きしてしまって、意図しない挙動をしてしまいます。(済んだら元に戻す)
    let parent: ReactiveEffect | undefined = activeEffect;
    // 現在のeffectを自身にセット
    activeEffect = this; // このthisは、new ReactiveEffect(updateComponent)で作られたインスタンス
    // クラスの引数に渡された関数を実行
    const res = this.fn();
    // 親のeffectに戻す
    activeEffect = parent;
    return res;
  }
}

export function track(target: object, key: unknown) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep()));
  }

  if (activeEffect) {
    dep.add(activeEffect);
  }
}

export function trigger(target: object, key?: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    const effects = [...dep];
    for (const effect of effects) {
      effect.run();
    }
  }
}
