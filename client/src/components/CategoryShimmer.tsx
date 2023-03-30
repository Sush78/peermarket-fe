import { shimmer_card_unit } from "../utils/constants/generic";

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img stroke animate"></div>
      <div className="shimmer-title stroke animate"></div>
      <div className="shimmer-tags stroke animate "></div>
      <div className="shimmer-details stroke animate "></div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="p-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {/* <img className="w-full stroke animate " src="../../public/card-top.jpg" alt="Sunset in the mountains"/> */}
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
