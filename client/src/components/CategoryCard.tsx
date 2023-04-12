import { Link } from "react-router-dom";
import { CATEGORY_IMAGES_URL } from "../utils/constants/generic";

const CategoryCard = (props: any) => {
  const { category_name } = props.category;
  return (
    <Link to={`/productList?category=${category_name}`}>
      <div className="p-3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center	">
          <img
            className="w-full"
            src={`${CATEGORY_IMAGES_URL}/${category_name}.png`}
            alt={`${category_name}-alt-text`}
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
