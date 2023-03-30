import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categories";
import CategoryCard from "../CategoryCard";
import Footer from "../Footer";
import Header from "../Header";
import { Category } from "../../models/CategoryView.model";
import CategoryShimmer from "../CategoryShimmer";

const CategoryView = () => {
  const allCategories = useSelector((state: any) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div>
        <Header />
      </div>
      {allCategories?.length === 0 ? (
        <CategoryShimmer />
      ) : (
        <div className=" flex flex-wrap grow justify-center p-10">
          {allCategories?.map((category: Category) => {
            return <CategoryCard category={category} key={category._id} />;
          })}
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryView;
