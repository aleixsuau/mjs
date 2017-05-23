import { MjsPage } from './app.po';

describe('mjs App', () => {
  let page: MjsPage;

  beforeEach(() => {
    page = new MjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
