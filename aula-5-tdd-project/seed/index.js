const faker = require("faker");
const { Car } = require("../src/entities/car");
const { CarCategory } = require("../src/entities/carCategory");
const { Customer } = require("../src/entities/customer");

const {join} = require('path');
const { writeFile } = require("fs/promises");
const seederBaseFolder = join(__dirname,"../","database")

const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  carIds:[],
  price: faker.finance.amount()
});

const cars = []
const customers = []

for (let i = 0;i<ITEMS_AMOUNT; i++){
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    avaliable:true,
    gasAvaliable:true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    age: faker.datatype.number(50)
  })
  customers.push(customer)
} 

const write = (filename,data)=> writeFile(join(seederBaseFolder,filename),JSON.stringify(data))


;(async ()=> {
  await write('cars.json',cars)
  await write('carsCategory.json',carCategory)
  await write('customers.json',customers)
})()