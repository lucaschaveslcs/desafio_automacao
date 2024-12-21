const dotenv = require("dotenv");
dotenv.config();
import { Page } from "playwright";
import { Selectors } from "./Elements";
import { BasePage } from "../../../common/utils/basePage";
//import { GenerateLogError } from "../../../exceptedHandler/GenerateLogError";

class Actions {
  constructor(private page: Page) {
    this.page = page;
  }

  //Criei essas variaveis publicas para poder realizar os testes Limites.
  public testeLimite = {
    nomeLimiteCaracter: this.repetirTexto("Lucas Chaves ", 256),
    emailLimiteCaracter: "teste@"+this.repetirTexto("test.com", 151),
    companyLimiteCaracter: this.repetirTexto("PagBrasil", 201),
    phoneLimiteCaracter: this.repetirTexto("(51) 1234-5678", 16),
    inquiryLimiteCaracter: this.repetirTexto("Cenários de Testes", 501),
    webSiteLimiteCaracter: this.repetirTexto("https://teste.com.br", 201),
  };

  //instanciando objetos de classes que serão utilizadas para realizar as ações na página
  //utilizo metodos da base que criei (utiliza nativo do playwright) mas reutilizei para destacar o campo no qual estou interagindo
  private base = new BasePage(this.page);
  //private generateLogError = new GenerateLogError();

  //funcao para preencher o campo name
  public async preencherName(nome: string) {
    console.log("Preenchendo campo Name!");
    await this.base.fillInput(Selectors.inputName, nome);
  }

  //funcao para preencher o campo email
  public async preencherEmail(email: string) {
    console.log("Preenchendo campo Email!");
    await this.base.fillInput(Selectors.inputEmail, email);
  }

  //funcao para preencher o campo company
  public async preencherCompany(company: string) {
    console.log("Preenchendo campo Company!");
    await this.base.fillInput(Selectors.inputCompany, company);
  }

  //funcao para preencher o campo website
  public async preencherWebSite(webSite: string) {
    console.log("Preenchendo campo WebSite!");
    await this.base.fillInput(Selectors.inputWebSite, webSite);
  }

  //funcao para preencher o campo Phone
  public async preencherPhone(phone: string) {
    console.log("Preenchendo campo Phone!");
    await this.base.fillInput(Selectors.inputPhone, phone);
  }

  //funcao para preencher o campo inquiry
  public async preencherInquiry(inquiry: string) {
    console.log("Preenchendo campo Inquiry!");
    await this.base.fillInput(Selectors.inputInquiry, inquiry);
  }

  //funcao para clicar no botao de submeter
  public async clickSubmit() {
    console.log("Clicando no botão Submit!");
    await this.base.buttonClick(Selectors.buttonSubmit);
  }

  //funcao para testes limites gerando caracteres ate o desejado
  public repetirTexto(baseTexto: string, length: number) {
    return baseTexto.repeat(Math.ceil(length / baseTexto.length)).slice(0, length);
  }

  /*
    //Não vai ser necessario realizar as validações nos Testes.
  // a ideia inicial era validar a resposta tanto pra positiva qnt pra erro 
  // separadamente para utilizar nos cenarios
  //funcao para realizar a validação dos testes verificando o retorno 200 da API, formulario preenchido corretamente
  public async realizarValidacaoSucesso(): Promise<boolean> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url() === "linkAPI" && response.status() === 200
      ),
    ]);

    // Verifica se a resposta tem status 200, formulário esta preenchido corretamente
    if (response.status() === 200) {
      console.log("Resposta da API: 200");
      return true; // Retorna true se a resposta for 200
    } else {
      console.log(
        `Erro: Resposta da API não é 200. Código recebido: ${response.status()}`
      );
      await this.generateLogError.screenShotError(this.page, "Erro: Resposta da API não é 200");
      return false; // Retorna false caso o status não seja 200 OK
    }
  }

  //Não vai ser necessario realizar as validações nos Testes.
  // a ideia inicial era validar a resposta tanto pra positiva qnt pra erro 
  // separadamente para utilizar nos cenarios
  //funcao para realizar a validação dos testes verificando o retorno da api 412, para os erros do formulario
  public async realizarValidacaoErro(): Promise<boolean> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url() === "linkAPI" && response.status() === 200
      ),
    ]);

    // Verifica se a resposta tem status 412, formulário esta preenchido com erro esperado
    if (response.status() === 412) {
      console.log("Resposta da API: 412");
      return true; // Retorna true se a resposta for 412
    } else {
      console.log(
        `Erro: Resposta da API não é 412. Código recebido: ${response.status()}`
      );
      await this.generateLogError.screenShotError(this.page, "Erro: Resposta da API não é 412");
      return false; // Retorna false caso o status não seja 412 OK
    }
  }*/
}
export { Actions };
