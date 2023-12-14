const { describe, it } = require("mocha");
const { ok, deepEqual } = require("assert");
const database = require('../database/database')


const DEFAULT_ITEM = { name: "Flash", power: "Speed", id: 1 };

describe("Testes de API de Herois", () => {
  it("deve trazer o heroi por id do arquivo", async () => {
    const expected = DEFAULT_ITEM
    const [response] = await database.listar(1) 
    deepEqual(response, expected);
    ok(response.name, expected.name)
  });

  it("deve ser possivel cadastrar um novo Heroi", async () => {
    const expected = {name: 'Batman', power: 'rich'}
    const createdHero = await database.create(expected)
    expected.id = createdHero.id
    deepEqual(expected, createdHero)

  })

});
