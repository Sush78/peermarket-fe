import { shimmer_card_unit } from "../utils/constants/generic";

const Shimmer = () => {
  return (
    <div className="p-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="w-full shimmer-img stroke animate"></div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 bg-center stroke animate "></div>
        </div>
      </div>
    </div>
  );
};

const CategoryShimmer = () => {
  return (
    <div className="shimmer-container p-10">
      {new Array(shimmer_card_unit).fill(0).map((element, index) => {
        return <Shimmer key={index} />;
      })}
    </div>
  );
};
export default CategoryShimmer;
