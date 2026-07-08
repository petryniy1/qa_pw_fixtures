import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithTwoTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);

  await viewArticlePage.clickEditButton();
});

test('Add the tag for the existing article with tags', async ({
  page,
  articleWithOneTag,
  editArticlePage,
  viewArticlePage,
}) => {
  const newTags = articleWithOneTag.tags;

  await editArticlePage.updateTagsField(newTags);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTagIsVisible(newTags);
});
