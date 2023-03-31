import { Link } from "react-router-dom";

const CategoryCard = (props: any) => {
  const { category_name } = props.category;
  return (
    <Link to={`/productList?category=${category_name}`}>
      <div className="p-3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center	">
          <img
            className="w-full"
            src={`https://peermarket.s3.eu-west-2.amazonaws.com/Category/${category_name}.png`}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 bg-center">
              {category_name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
