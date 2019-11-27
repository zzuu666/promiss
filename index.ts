import { Promiss } from './promiss';


const promiss = new Promiss((resolve, reject) => {
  setTimeout(() => {

    resolve(1);

  }, 1000);
});

const nextPromiss = promiss.then(res => {
  console.log(res);
})
