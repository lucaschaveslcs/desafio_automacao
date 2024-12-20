import * as fs from "fs";
import * as path from "path";
import { Page } from "playwright";


export class GenerateLogError {
  //definindo o local onde sera salvo as prints de erro, caso ocorram
  private pathArq = path.join(
    __dirname,
    "..",
    "..",
    "html-report",
    "screenshot",
    "log.json"
  );

  //funcao onde realiza leitura do arquivo json, realiza a preparação para salvar o erro
  //adiciona o log de erro e antes de realizar a captura de tela grava no arquivo json.
  public async screenShotError(page: Page, error: string) {
    let json = this.jsonRead();
    let testeName = global.nameTest;
    let value = this.formatNameString(error);
    let nameReplace = testeName.replace(" ", "").replace(" ", "");
    let nameScreen = `${json.logs.length + 1}-Teste-${nameReplace}`;

    json.logs.push({
      Teste: testeName,
      Erro: value,
      screenshot: nameScreen,
    });

    fs.writeFileSync(this.pathArq, JSON.stringify(json), "utf8");
    await page.screenshot({
      path: `./html-report/screenshot/${nameScreen}.png`,
    });
  }

  //funcao para ler o log.json e converter para um objeto js
  private jsonRead(): any {
    let jsonFile = fs.readFileSync(this.pathArq, "utf8");
    let json = JSON.parse(jsonFile);
    return json;
  }

  //Funcao para limpar a string de entrada e formatar o nome
  private formatNameString(name: string) {
    let nameString = String(name);
    let value = nameString.replace(/[^A-Za-z 0-9 - : / . ]/g, "");
    return value;
  }
}