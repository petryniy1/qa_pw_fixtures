import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithoutTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditButton();
});

test('Add the tag for the existing article without tags', async ({
  page,
  articleWithTwoTags,
  editArticlePage,
  viewArticlePage,
}) => {
  await editArticlePage.updateTagsField(articleWithTwoTags.tags);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTagIsVisible(articleWithTwoTags.tags);
});
