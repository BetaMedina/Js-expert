const assert = require('assert');

function* calculate(arg1,arg2) {
 yield arg1 * arg2;
}

function* main (){
  yield 'Hello'
  yield '-'
  yield 'World'
  yield* calculate(20,10)
}

const generator = main();
const testWithArrayFrom = main()

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });
assert.deepStrictEqual([...testWithArrayFrom],['Hello','-','World',200]);

//--- Async iterrators ---\\

const {readFile,stat,readdir} = require('fs/promises');

function* promisified(){
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

console.log(Promise.all([...promisified()]).then(results=>console.log(results)));
console.log(promisified().next());

;(async ()=>{
  for await(const item of promisified()){
    console.log(item);
  }
})()

async function* systemInfo(){
  const file = await readFile(__filename)
  yield {file:file}

  const {size} = await stat(__filename)
  yield {size}

  const dir = await readdir(__dirname)
  yield {dir}
};

;(async ()=>{
  for await(const item of systemInfo()){
    console.log(item);
  }
})()

