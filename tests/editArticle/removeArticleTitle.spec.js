import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithTwoTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);

  await viewArticlePage.clickEditButton();
});

test('Remove an article title for the existing article', async ({
  editArticlePage,
}) => {
  await editArticlePage.deleteFieldText(editArticlePage.titleField);
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
