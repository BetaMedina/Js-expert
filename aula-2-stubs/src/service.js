//
const https = require("https");
const { API } = require("./constants");

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }

  async getPlanets(url){
    const result = await this.makeRequest(url)
    return{
      name:result.name,
      surfaceWater:result.surface_water,
      films:result.films.length
    }
  }
}



module.exports = Service;
