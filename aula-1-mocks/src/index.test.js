const { File } = require("./file");
const { constants } = require("./constants");

const { rejects,equal } = require("assert");

(async () => {
  {
    const reject = new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE);
    const result =  File.csvToJson("./../mocks/invalidHeader-invalid.csv");
    await rejects(result, reject);
  }
  {
    const reject = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const result =  File.csvToJson("./../mocks/emptyFile-invalid.csv");
    await rejects(result, reject);
  }
  {
    const result =  await File.csvToJson("./../mocks/threeItems-valid.csv");
    const expected = [
        {
          "id": 1,
          "name": "Teste",
          "profession": "Js",
          "age": 23
        },
        {
          "id": 2,
          "name": "Teste2",
          "profession": "Js",
          "age": 23
        },
        {
          "id": 3,
          "name": "Teste2",
          "profession": "Js",
          "age": 25
        }
      ]

    await equal(JSON.stringify(result), JSON.stringify(expected));
  }
})();
