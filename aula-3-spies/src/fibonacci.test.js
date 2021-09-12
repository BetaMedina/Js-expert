const Fibonacci = require("./fibonacci")
const sinon = require('sinon')
const {deepEqual} = require('assert')


// Fibonacci: o proximo valor é o valor é igual a soma dos dois valores anteriores
// dado 3
// 0,1,1
// dado 5
// 0, 1, 1, 2, 3

;(async()=>{
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci,fibonacci.execute.name)
    for await (const i of fibonacci.execute(3)){}

    //algoritmo começa sempre no 0
    const expectedCallCount = 4
    console.log('callcount',spy.callCount)
    deepEqual(spy.callCount,expectedCallCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci,fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    
    //[0] input = 5, current = 0, next  = 1
    const {args} = spy.getCall(2)
    const expectedResults = [0,1,1,2,3]
    const expectedParams = Object.values({
      input:3,
      current:1,
      next:2
    })
    console.log('callcount',spy.callCount)
    deepEqual(args,expectedParams)
    deepEqual(results,expectedResults)

  }
})()