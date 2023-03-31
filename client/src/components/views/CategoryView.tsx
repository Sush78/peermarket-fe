import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categories";
import CategoryCard from "../CategoryCard";
import { Category } from "../../models/CategoryView.model";
import CategoryShimmer from "../CategoryShimmer";

const CategoryView = () => {
  const allCategories = useSelector((state: any) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      {allCategories?.length === 0 ? (
        <CategoryShimmer />
      ) : (
        <div className=" flex flex-wrap grow justify-center p-10">
          {allCategories?.map((category: Category) => {
            return <CategoryCard category={category} key={category._id} />;
          })}
        </div>
      )}
    </>
  );
};

export default CategoryView;
