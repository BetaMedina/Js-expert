const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("../../src/service/carService");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");

const carServiceDatabase = join(__dirname, "./../../database", "cars.json");
const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("carService tests", () => {
  let carService = {};
  let sandbox = {};
  before(() => {
    carService = new CarService({ cars: carServiceDatabase });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve a random position from an car", () => {
    const data = [0, 1, 2, 3, 4, 5];
    const result = carService.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in category", () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIndex)

    const result = carService.chooseRandomCar(carCategory);

    const expected = carCategory.carIds[carIndex];

    expect(result).to.be.equal(expected);
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
  });

  it("given a carCAtegory it should return a anvaliable car", async () => {
    const car = mocks.validCar[0]
    const carCategory = Object.create(mocks.validCarCategory)

    carCategory.ids = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const carResponse = await carService.givenAvaliableCar(carCategory)
    const expected = car
    expect(carResponse).deep.equal(expected)
    expect(carService.chooseRandomCar.calledOnce).to.be.ok

  });
});
