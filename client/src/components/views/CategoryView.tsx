import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../CategoryCard";
import { Category } from "../../models/CategoryView.model";
import CategoryShimmer from "../CategoryShimmer";
import { getCategories } from "../../redux/slices/categories";
import { AppDispatch } from "../../redux/store";
import Error from "../ErrorPage";

const CategoryView = () => {
  const allCategories = useSelector((state: any) => state.categories);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (allCategories.isLoading) {
    return <CategoryShimmer />;
  }
  if (allCategories.isError) {
    return <Error />;
  }

  return (
    <div className=" flex flex-wrap grow justify-center p-10">
      {allCategories?.data?.map((category: Category) => {
        return <CategoryCard category={category} key={category._id} />;
      })}
    </div>
  );
};

export default CategoryView;
