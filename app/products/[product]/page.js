import { products } from "@/mockData";

export async function generateMetadata({ params, searchParams }, parent) {
  const product = products.find((product) => product.id == params.product);

  return {
    title: `¡Buy ${product.name}!`,
  };
}

const Products = ({ params }) => {
  const product = products.find((product) => product.id == params.product);

  return <div>You are watching: {product.name}</div>;
};

export default Products;
