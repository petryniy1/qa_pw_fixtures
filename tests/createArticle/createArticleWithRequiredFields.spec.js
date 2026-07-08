import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  articleWithTwoTags,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithTwoTags.title);
  await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
  await createArticlePage.fillTextField(articleWithTwoTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
});
