import { GzSearchPage } from './app.po';

describe('gz-search App', function() {
  let page: GzSearchPage;

  beforeEach(() => {
    page = new GzSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
