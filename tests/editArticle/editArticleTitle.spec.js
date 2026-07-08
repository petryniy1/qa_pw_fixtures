import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithTwoTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);

  await viewArticlePage.clickEditButton();
});

test('Edit the article title for the existing article', async ({
  page,
  editArticlePage,
  viewArticlePage,
}) => {
  const newTitleText = 'Good day';

  await editArticlePage.updateTitleField(newTitleText);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitleText);
});
