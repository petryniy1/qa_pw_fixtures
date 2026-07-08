import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: Array<String>;
  articleWithOneTag: Array<String>;
  articleWithTwoTags: Array<String>;
}>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },

  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },

  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },

  articleWithoutTags: async ({ logger }, use) => {
    await use(generateNewArticleData(0, logger));
  },

  articleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(1, logger));
  },

  articleWithTwoTags: async ({ logger }, use) => {
    await use(generateNewArticleData(2, logger));
  },
});
