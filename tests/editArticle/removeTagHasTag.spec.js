import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithTwoTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);

  await viewArticlePage.clickEditButton();
});

test('Remove an article tag for the existing article with tag', async ({
  page,
  articleWithTwoTags,
  editArticlePage,
  viewArticlePage,
}) => {
  const initialTags = articleWithTwoTags.tags;
  const tagsToRemove = initialTags.slice(0, 2);
  const remainingTags = initialTags.slice(2);

  await editArticlePage.deleteTags(tagsToRemove);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTagIsDeleted(tagsToRemove);
  await viewArticlePage.assertArticleTagIsVisible(remainingTags);
});
