import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const productType = searchParams.get("category");
  return (
    <div className="min-h-screen">ProductList of category {productType}</div>
  );
};

export default ProductList;
