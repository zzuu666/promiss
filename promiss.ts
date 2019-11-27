type InitialFunction = (resolve: Function, reject: Function) => void;

type ResolveHandle = (value: any) => any;

enum PromissState {
  PENDING = 0,
  FULFILLED = 1,
  REJECTED = 2,
}

function subscribe(promiss: Promiss, state: PromissState, callback: Function) {
  promiss.subscribe[state] = callback;
}

function publish(promiss: Promiss) {
  const state = promiss.state;
  const callback = promiss.subscribe[state];
  callback(promiss.value);
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
  subscribe: Function[];

  constructor(initial: InitialFunction) {
    this.state = PromissState.PENDING;
    this.subscribe = [];
    executeInitila(this, initial);
  }

  then(resolveHanlde: ResolveHandle, rejectHandle?) {
    // const child = this.constructor();
    if (this.state === PromissState.PENDING) {
      subscribe(this, PromissState.FULFILLED, resolveHanlde);
      subscribe(this, PromissState.REJECTED, rejectHandle);
    }
  }

  catch(errorHandle) {}

  finally() {}

  static all() {}

  static race() {}

  static resolve(value) {}

  static reject(error) {}
}
