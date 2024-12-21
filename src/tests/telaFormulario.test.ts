import { Browser, BrowserContext, chromium, firefox, Page } from "playwright";
import { Actions as FormularioPage } from "../objects/pages/formulario";
import { Setup } from "../setup";

jest.setTimeout(300000); //Tempo máximo que cada teste terá para poder executar

const setup = new Setup();

describe("Teste Formulário", () => {
  let page: Page; //Declaração da Page, Page = uma nova Aba dentro do contexto
  let context: BrowserContext; //Declaração de Context, Context = representa uma nova 'janela' isolada no navegador, onde pode se ter várias pages diferentes
  let browser: Browser; //Declaração do Browser, Browser refere-se ao navegador que será iniciado para realizar os testes
  //criei esses outros 2 'repetidos', para poder utilizar outro navegador nos testes
  let context2: BrowserContext; //Declaração de Context 2, Context = representa uma nova 'janela' isolada no navegador, onde pode se ter várias pages diferentes
  let browser2: Browser; //Declaração do Browser2, Browser refere-se ao navegador que será iniciado para realizar os testes
  let formularioPage: FormularioPage; //Declaração de formularioPage, página na qual contém as actions que queremos utilizar

  beforeAll(async () => {
    //Ocorre antes dos testes iniciarem
    browser = await setup.browserSetup(chromium); //Irá iniciar um navegador
    context = await setup.browserContext(browser); //Irá abrir uma nova janela
    //criei esses outros 2 'repetidos', para poder utilizar outro navegador nos testes
    browser2 = await setup.browserSetup(firefox); //Irá iniciar um navegador
    context2 = await setup.browserContext(browser2); //Irá abrir uma nova janela
  });

  beforeEach(async () => {
    //Ocorre antes de CADA teste
    global.nameTest = String(expect.getState().currentTestName); //Armazena o nome do test numa variavel global
    if (global.nameTest.includes("Acessar o formulário com Firefox")) {
      page = await setup.browserNewPage(context2); //Instancia uma nova aba dentro da janela que ja foi aberta anteriormente
      formularioPage = new FormularioPage(page);
    } //A página que contém os actions recebe a referencia da page que foi inicializada
    else {
      page = await setup.browserNewPage(context); //Instancia uma nova aba dentro da janela que ja foi aberta anteriormente
      formularioPage = new FormularioPage(page);
    } //A página que contém os actions recebe a referencia da page que foi inicializada
    await page.goto(process.env.URL + ""); //função nativa playwright para ir pra pagina que eu desejo.
  });

  afterEach(async () => {
    //Ocorre após CADA teste
    await setup.browserPageClose(page); //Finaliza a aba do teste
  });

  afterAll(async () => {
    //Ocorre após todos testes serem executados
    await setup.browserClose(browser); //Finaliza o navegador
  });

  //cenario 1
  test("Preenchendo Todos Campos válidos", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherWebSite("https://teste.com.br");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 2
  test("Preenchendo Todos Campos obrigatórios válidos", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 3 Cenário sugerido para validar caractere especial
  test("Campo Nome inválido", async () => {
    await formularioPage.preencherName("@#$@#$#@");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 4
  test("Campo Nome Vazio", async () => {
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 5
  test("Campo Nome exceder limite caractere", async () => {
    await formularioPage.preencherName(
      formularioPage.testeLimite.nomeLimiteCaracter
    );
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 6
  test("Campo E-mail inválido", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 7
  test("Campo E-mail vazio", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 8
  test("Campo E-mail exceder limite caractere", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail(
      formularioPage.testeLimite.emailLimiteCaracter
    );
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 9
  test("Campo Company vazio", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 10
  test("Campo Company exceder limite caractere", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany(
      formularioPage.testeLimite.companyLimiteCaracter
    );
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 11
  test("Campo Phone inválido", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("testeTeste");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 12
  test("Campo Phone vazio", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 13
  test("Campo Phone exceder limite caractere", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone(
      formularioPage.testeLimite.phoneLimiteCaracter
    );
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 14
  test("Campo Inquiry inválido", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry(
      "Cenários de Testes com #!@%#@ especial"
    );
    await formularioPage.clickSubmit();
  });

  //cenario 15
  test("Campo Inquiry vazio", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.clickSubmit();
  });

  //cenario 16
  test("Campo Inquiry exceder limite caractere", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry(
      formularioPage.testeLimite.inquiryLimiteCaracter
    );
    await formularioPage.clickSubmit();
  });

  //cenario 17
  test("Campo WebSite inválido", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherWebSite("teste.com.br");
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    await formularioPage.clickSubmit();
  });

  //cenario 18
  test("Campo WebSite exceder limite caractere", async () => {
    await formularioPage.preencherName("Lucas Chaves");
    await formularioPage.preencherEmail("teste@test.com");
    await formularioPage.preencherCompany("PagBrasil");
    await formularioPage.preencherWebSite(
      formularioPage.testeLimite.webSiteLimiteCaracter
    );
    await formularioPage.preencherPhone("(51) 1234-5678");
    await formularioPage.preencherInquiry("Cenários de Testes");
    //await formularioPage.clickSubmit();
  });

  //cenario 19
  test("Acessar o formulário com Firefox", async () => {
   console.log("Formulário Acessado no Firefox com sucesso");
   //lógica do teste ja foi implementada na parte dos hooks
  });

  //cenario 20
  test("Acessar o formulário com Chromium", async () => {
    console.log("Formulário Acessado no Chromium com sucesso");
    //lógica do teste ja foi implementada na parte dos hooks
  });
});
