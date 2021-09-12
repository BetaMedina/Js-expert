const Service = require("./service");
const { API } = require("./constants");
const sinon = require("sinon");
const {deepStrictEqual} = require('assert');

const mocks = {
  tatooine: require("./mocks/swapi-planets-1.json"),
  alderaan: require("./mocks/swapi-planets-2.json"),
};

const baseUrl1 = `${API.BASE_URL}/1`
const baseUrl2 = `${API.BASE_URL}/2`


;(async () => {
  const service = await new Service();

  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(baseUrl1)
  .resolves(mocks.tatooine);
  
  stub.withArgs(baseUrl2)
  .resolves(mocks.alderaan);
  
  {
    const expected = {
      name:'Alderaan',
      surfaceWater:'40',
      films:2
    }

    const response = await service.getPlanets(baseUrl2)
    deepStrictEqual(response,expected)
  }
  {
    const expected = {
      name:'Tatooine',
      surfaceWater:'1',
      films:5
    }

    const response = await service.getPlanets(baseUrl1)
    deepStrictEqual(response,expected)
 }
})();
