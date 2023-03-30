const CategoryCard = (props: any) => {
  const { category_name } = props.category;
  const category_url = "../../public/card-top.jpg";
  return (
    <div className="p-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center	">
        <img
          className="w-full"
          // src={category_url}
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
  );
};

export default CategoryCard;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
