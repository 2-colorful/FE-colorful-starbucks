import { EventResponseType, getEventProducts } from '@/actions/event-service';
import { getProductSimple } from '@/actions/product-service';
import ProductList from './productList';

export default async function EventSection({
  events,
}: {
  events: EventResponseType[];
}) {
  const eventsWithProducts = await Promise.all(
    events.map(async (event) => {
      const products = await getEventProducts(event.eventUuid);

      const productsWithDetails = await Promise.all(
        products.map(async (product) => {
          const details = await getProductSimple(product.productCode);
          return { ...product, details };
        }),
      );

      return { event, products: productsWithDetails };
    }),
  );

  return (
    <>
      {eventsWithProducts.map(({ event, products }) => (
        <ProductList key={event.eventUuid} event={event} products={products} />
      ))}
    </>
  );
}
