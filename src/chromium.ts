import { launch, Page } from "puppeteer-core";
import { getOptions as getLaunchOptions } from "./options";
import ScreenOptions from "./screen_options";
let _page: Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }

  //These options will restrict it to OS X only for dev.
  const options = await getLaunchOptions(isDev);
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function captureScreen(
  screenOptions: ScreenOptions,
  isDev: boolean
) {
  if (screenOptions.isPDF) {
    return getPDF(screenOptions, isDev);
  }

  return getImage(screenOptions, isDev);
}

async function getPDF(screenOptions: ScreenOptions, isDev: boolean) {
  const page = await getPage(isDev);
  await page.goto(screenOptions.url);
  //Do not use a format if you want to control the page size
  const options: { [name: string]: string | number } = {
    width: screenOptions.width,
    height: screenOptions.height
  };
  if (!screenOptions.fullPage) {
    //without this, you will always get the full screen
    options["pageRanges"] = "1-1";
  }

  const file = await page.pdf(options);
  return file;
}

async function getImage(screenOptions: ScreenOptions, isDev: boolean) {
  const page = await getPage(isDev);
  await page.setViewport({
    width: screenOptions.width,
    height: screenOptions.height
  });
  await page.goto(screenOptions.url);

  const file = await page.screenshot({
    type: screenOptions.imageType,
    fullPage: screenOptions.fullPage
  });
  return file;
}
