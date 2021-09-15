const BaseRepository = require('../repository/base/baseRepository')

class CarService{
  constructor({cars}){
    this.carRepository = new BaseRepository({file:cars})
  }

  getRandomPositionFromArray(list){
    const listLegnth = list.length
    return Math.floor(
      Math.random() * listLegnth
    )
  }

  chooseRandomCar(carCategory){
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return carId
  }

  async givenAvaliableCar(carCategory){
    const carId = this.chooseRandomCar(carCategory)

    return this.carRepository.find(carId)
  }
}

module.exports = CarService