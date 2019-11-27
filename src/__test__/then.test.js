import { Promiss } from '../promiss';

let promiss;

beforeEach(() => {
  promiss = new Promiss((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 0);
  });
});

test('Promiss basic then', done => {
  promiss.then(res => {
    expect(res).toBe(1);
    done();
  });
});

test('Promiss then can mutiple call', done => {
  promiss.then(res => {
    expect(res).toBe(1);
  });

  promiss.then(res => {
    expect(res).toBe(1);
    done();
  });
});

test('Promiss then can chain use without function', done => {
  promiss.then().then(res => {
    expect(res).toBe(1);
    done();
  });
});

test('Promiss then can chain use with return unpromiss', done => {
  promiss
    .then(res => res + 1)
    .then(res => {
      expect(res).toBe(2);
      done();
    });
});
