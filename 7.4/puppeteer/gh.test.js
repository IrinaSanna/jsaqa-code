let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  })
  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 40000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 50000);
});

test("Header of the GitHub action research tools page", async () => {
  await page.goto("https://github.com/marketplace?type=actions");
  const actual = await page.$eval(
    ".lh-condensed.text-wrap-balance",
    (link) => link.textContent
  );
  const expected = "Enhance your workflow with extensions"; 
  expect(actual).toContain(expected);
});

test("Page title about how GitHub helps secure applications", async () => {
  await page.goto("https://github.com/features/security");
  const actual = await page.$eval(
    ".Primer_Brand__Hero-module__Hero___EM3jf.Primer_Brand__Hero-module__Hero--align-start___m8GEr.pb-0",
    (link) => link.textContent);
  const expected = "Security at every step";
  expect(actual).toContain(expected);
});

test("Header of the page with company stories", async () => {
  await page.goto("https://github.com/customer-stories?type=team");
  const actual = await page.$eval(".col-10-max.color-fg-default.mx-auto.h1-mktg",
    (link) => link.textContent
  );
  const expected = "Meet the companies who build with GitHub";
  expect(actual).toContain(expected);
});