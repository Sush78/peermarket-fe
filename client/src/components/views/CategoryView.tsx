// import header
// import footer
// handle grid config
// import category cards
// handle states

import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard";
import Footer from "../Footer";
import Header from "../Header";

const CategoryView = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const data = await fetch("http://localhost:3001/");
    const json = await data.json();
    // console.log(json.categories);
    setAllCategories(json.categories);
  }
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Header />
      </div>
      <div className=" flex flex-wrap p-10">
        {allCategories.map((category, index) => {
          console.log(index);
          return <CategoryCard category={category} key={index} />;
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryView;
