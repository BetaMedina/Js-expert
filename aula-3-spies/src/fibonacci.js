class Fibonacci{
  *execute(input,current = 0,next = 1){
    console.log(input , current,next )

    if(input === 0){
      return 0
    }
    // retorna o valor
    yield current

    // delega a função mas não retorna o valor. Ou seja, continua a interação de valores.
    yield* this.execute(input -1, next, current+next)
  }
}


module.exports = Fibonacci