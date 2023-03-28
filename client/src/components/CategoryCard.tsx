const CategoryCard = (props: any) => {
  const { category_name } = props.category;
  return (
    <div className="p-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={"../../public/card-top.jpg"}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 bg-center">
            {category_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
