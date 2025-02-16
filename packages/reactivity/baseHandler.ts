import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: string | symbol, reciver: object) {
    track(target, key);

    const res = Reflect.get(target, key, reciver);
    // objectの場合はreacriveにしてあげる(これにより、ネストしたオブジェクトもリアクティブにすることができる)
    if (res !== null && typeof res === "object") {
      return reactive(res);
    }

    return res;
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    let oldValue = (target as any)[key];
    Reflect.set(target, key, value, receiver);
    // 値が変わったかどうかをチェックしてあげる
    if (hasChanged(value, oldValue)) {
      trigger(target, key);
    }
    return true;
  },
};
const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue);
