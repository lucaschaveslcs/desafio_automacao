import { Browser, BrowserContext, chromium, firefox, Page } from "playwright";
import { Actions as FormularioPage } from "../objects/pages/formulario";
import { Setup } from "../setup";

jest.setTimeout(300000); //Tempo máximo que cada teste terá para poder executar

const setup = new Setup();

describe("Teste Formulário", () => {
  let page: Page; //Declaração da Page, Page = uma nova Aba dentro do contexto
  let context: BrowserContext; //Declaração de Context, Context = representa uma nova 'janela' isolada no navegador, onde pode se ter várias pages diferentes
  let browser: Browser; //Declaração do Browser, Browser refere-se ao navegador que será iniciado para realizar os testes
  let formularioPage: FormularioPage; //Declaração de formularioPage, página na qual contém as actions que queremos utilizar

  beforeAll(async () => {
    //Ocorre antes dos testes iniciarem
    browser = await setup.browserSetup(chromium); //Irá iniciar um navegador
    context = await setup.browserContext(browser); //Irá abrir uma nova janela
  });

  beforeEach(async () => {
    //Ocorre antes de CADA teste
    global.nameTest = String(expect.getState().currentTestName); //Armazena o nome do test numa variavel global
    page = await setup.browserNewPage(context); //Instancia uma nova aba dentro da janela que ja foi aberta anteriormente
    formularioPage = new FormularioPage(page); //A página que contém os actions recebe a referencia da page que foi inicializada
    await page.goto(process.env.URL + ""); //função nativa playwright para ir pra pagina que eu desejo.
  });

  afterEach(async () => {
    //Ocorre após CADA teste
    //await setup.browserPageClose(page); //Finaliza a aba do teste
  });

  afterAll(async () => {
    //Ocorre após todos testes serem executados
    //await setup.browserClose(browser); //Finaliza o navegador
  });

  test.only("Preenchendo Todos Campos válidos", async () => {
    await formularioPage.preencherName("dasdsa");
    await formularioPage.preencherEmail("dasd@gmail.com");
    await formularioPage.preencherCompany("sdsds");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("123123123");
    await formularioPage.preencherInquiry("dasdsad");
    await formularioPage.clickSubmit();
    await formularioPage.realizarValidacaoSucesso();
  });

  test("Preenchendo Todos Campos obrigatórios válidos", async () => {
    await formularioPage.preencherName("");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });

  test("Campo Nome inválido", async () => {
    await formularioPage.preencherName("@#$@#$#@");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });

  test("Campo E-mail inválido", async () => {
    await formularioPage.preencherName("");
    await formularioPage.preencherEmail("31231");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });

  test("Campo Company inválido", async () => {
    await formularioPage.preencherName("");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("!@#!@#");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();  });

  test("Campo Phone inválido", async () => {
    await formularioPage.preencherName("");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("asassa");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });

  test("Campo Inquiry inválido", async () => {
    await formularioPage.preencherName("@#$@#$#@");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("500+");
    await formularioPage.clickSubmit();
  });

  test("Campo WebSite inválido", async () => {
    await formularioPage.preencherName("");
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("sadsad");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });

  test("Campo Obrigatório vazio", async () => {
    await formularioPage.preencherEmail("");
    await formularioPage.preencherCompany("");
    await formularioPage.preencherWebSite("");
    await formularioPage.preencherPhone("");
    await formularioPage.preencherInquiry("");
    await formularioPage.clickSubmit();
  });
});
