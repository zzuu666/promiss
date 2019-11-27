type InitialFunction = (resolve: Function, reject: Function) => void;

type ResolveHandle = (value: any) => any;

enum PromissState {
  PENDING = 0,
  FULFILLED = 1,
  REJECTED = 2,
}

function noop () {}

function isFunction (target) {
  return Object.prototype.toString.call(target) === '[object Function]';
}

function subscribe(promiss: Promiss, child: Promiss,onResolved: Function, onRejected: Function) {
  promiss.subscribe[PromissState.PENDING].push(child);
  promiss.subscribe[PromissState.FULFILLED].push(onResolved);
  promiss.subscribe[PromissState.REJECTED].push(onRejected);
}

function publish(promiss: Promiss) {
  const state = promiss.state;
  if (state === PromissState.PENDING) return;
  const callbacks = promiss.subscribe[state];
  const childs = promiss.subscribe[0];
  for (let i = 0, len = callbacks.length; i < len; i += 1) {
    const callback =callbacks[i];
    const nextValue = isFunction(callback) ? callback(promiss.value) : promiss.value;
    const nextValueIsPromiss = nextValue instanceof Promiss;
    const child = childs[i];

    if (child && state === PromissState.FULFILLED) {
      if (nextValueIsPromiss) {
      }
      else {
        resolve(child, nextValue)
      }
    }
  }
}

function resolve(promiss, value) {
  promiss.state = PromissState.FULFILLED;
  promiss.value = value;

  publish(promiss);
}

function reject(promiss, error) {}

function executeInitila(promiss: Promiss, initial: InitialFunction) {
  initial(
    resolveValue => {
      resolve(promiss, resolveValue);
    },
    rejectValue => {
      reject(promiss, rejectValue);
    }
  );
}

/**
 * Pormiss 类
 * state: 该 Promiss 所处的状态
 * subscribe: 该 Promiss 下订阅的事件[1]: resolve [2]:reject
 */
export class Promiss {
  state: PromissState;
  value: any;
  subscribe: [Promiss[], Function[], Function[]];

  constructor(initial: InitialFunction) {
    this.state = PromissState.PENDING;
    this.subscribe = [[], [] ,[]];
    executeInitila(this, initial);
  }

  then(resolveHanlde?: ResolveHandle, rejectHandle?) {
    const child = new Promiss(noop);

    if (this.state === PromissState.PENDING) {
      subscribe(this, child, resolveHanlde, rejectHandle);
    }


    return child;
  }

  catch(errorHandle) {}

  finally() {}

  static all() {}

  static race() {}

  static resolve(value) {}

  static reject(error) {}
}
