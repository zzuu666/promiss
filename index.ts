import { Promiss } from './promiss';

const promiss = new Promiss((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promiss.then(res => {
  console.log('rff', res);
});

const nextPromiss = promiss.then(res => {
  console.log(res);

  return 3;
});

const promiss2 = nextPromiss.then(res => {
  console.log(res);

  return 5;
});

promiss2
  .then()
  .then()
  .then(res => {
    console.log(res);
  });
