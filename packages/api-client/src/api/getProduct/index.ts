import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context, ReviewAvarage } from 'src/types';

export async function getProduct(context: Context, params: ProductsSearchParams): Promise<Product[]> {

  let url: URL;
  if (params.id) {
    url = new URL('/rest/io/variations', context.config.api.url);
    url.searchParams.set('variationIds[]', params.id);
    url.searchParams.set('resultFieldTemplate', 'SingleItem');
  } else if (params.term) {
    url = new URL('/rest/io/item/search', context.config.api.url);
    url.searchParams.set('query', params.term);
  } else {

    const categoryId = params.categoryId?.toString() || '16';
    url = new URL('/rest/io/category', context.config.api.url);
    url.searchParams.set('categoryId', categoryId);
    if (params.limit) {
      url.searchParams.set('items', params.limit);
    }
    if (params.sort) {
      url.searchParams.set('sorting', params.sort);
    }
  }

  const { data } = await context.client.get(url.href);

  if (params.id) {
    const product: Product[] = data.data.documents.map(document => document.data);
    product[0].feedback = await getFeedbackAvarage(context, [product[0].item.id.toString()]);
    return product;
  } else {
    // TODO: load feedback for products
    return data.data.itemList.documents.map(document => document.data);
  }
}

async function getFeedbackAvarage(context: Context, itemIds: string[]): Promise<ReviewAvarage> {
  const urlFeedbackStars: URL = new URL(`/rest/feedbacks/feedback/helper/counts/${itemIds[0]}`, context.config.api.url);
  urlFeedbackStars.searchParams.set('allowFeedbacksOnlyIfPurchased', 'false');
  urlFeedbackStars.searchParams.set('numberOfFeedbacks', '100');
  const { data } = await context.client.get(urlFeedbackStars.href);
  return data;
}