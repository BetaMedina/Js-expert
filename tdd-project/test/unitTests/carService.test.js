const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("../../src/service/carService");
const Transaction = require("../../src/entities/transaction");

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

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIndex);

    const result = carService.chooseRandomCar(carCategory);

    const expected = carCategory.carIds[carIndex];

    expect(result).to.be.equal(expected);
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
  });

  it("given a carCAtegory it should return a anvaliable car", async () => {
    const car = mocks.validCar[0];
    const carCategory = Object.create(mocks.validCarCategory);

    carCategory.ids = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const carResponse = await carService.givenAvaliableCar(carCategory);
    const expected = car;
    expect(carResponse).deep.equal(expected);
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
  });

  it("given a carCAtegory,customer and numberofdays it should calculate final amount in real", async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    const expected = carService.currencyFormat.format(244.4);

    sandbox
      .stub(carService, "taxesBasedOnAge")
      .get(() => [{ from: 31, to: 100, then: 1.3 }]);

    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );
    expect(result).deep.equal(expected);
    // expect(carService.chooseRandomCar.calledOnce).to.be.ok
  });

  it("given a carCAtegory and a car category should return transaction receipt", async () => {
    const [car] = Object.create(mocks.validCar);
    const customer = Object.create(mocks.validCustomer);

    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };
    customer.age = 20;

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020"


    const now = new Date(2020,10,5)
   

    sandbox.useFakeTimers(now.getTime())
    const expectedAmount = carService.currencyFormat.format(206.8)
   
    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount:expectedAmount
    });

    const result = await carService.rent(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).deep.equal(expected);
  });
});
