import fs from 'fs';
import path from 'path';

const ProductDetailPage = ({ loadProduct }) => {
  return (
    <>
      <h1>{loadProduct.title}</h1>
    </>
  );
};
async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find(product => product.id === productId);

  return {
    props: { loadProduct: product },
  };
}
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.map(product => product.id);
  const params = ids.map(id => ({ params: { pid: id } }));
  return {
    paths: params,
    fallback: false,
  };
}
export default ProductDetailPage;
