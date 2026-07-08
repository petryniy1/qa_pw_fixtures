import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { DESC_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithTwoTags, viewArticlePage }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);

  await viewArticlePage.clickEditButton();
});

test('Remove an article description for the existing article', async ({
  editArticlePage,
}) => {
  await editArticlePage.deleteFieldText(editArticlePage.descriptionField);
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(DESC_CANNOT_BE_EMPTY);
});
