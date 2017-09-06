import { CsmsPage } from './app.po';

describe('csms App', () => {
  let page: CsmsPage;

  beforeEach(() => {
    page = new CsmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
