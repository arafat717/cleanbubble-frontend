
import FeatureJob from "./FeatureJob";
import TopCategoriesJob from "./TopCategories";

const TopAndFeatureJob = () => {
  return (
    <div

      className="relative overflow-hidden min-h-[80vh] -mt-16"
    >
      <TopCategoriesJob />
      <FeatureJob />
    </div>
  );
};

export default TopAndFeatureJob;
