const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_DO_ARQUIVO = `${__dirname}/herois.json`;
  }

  async obterDadosDoArquivo() {
    const arquivo = await readFileAsync(this.NOME_DO_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }
  async salvarDadosDoArquivo(dados) {
    await writeFileAsync(this.NOME_DO_ARQUIVO, JSON.stringify(dados))
    return true
  }
  async listar(id) {
    const dados = await this.obterDadosDoArquivo();
    if (!id) {
      return dados;
    }
    return dados.filter((item) => item.id === id);
  }
  async create(hero){
    const heroes = await this.obterDadosDoArquivo()
    const newHero = {
        id: heroes.length + 1,
        name: hero.name,
        power: hero.power
    }
    heroes.push(newHero)
    await this.salvarDadosDoArquivo(heroes)
    return newHero
  }
}

module.exports = new Database();
