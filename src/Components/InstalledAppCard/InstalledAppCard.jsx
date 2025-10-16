import InstalledAppsCard from "../InstalledAppsCard/InstalledAppsCard";

const InstalledAppCard = ({ filteredDt, handleRemoveDtFromLocalStor }) => {
  return (
    <div className="grid gap-y-5 ">
      {filteredDt.map((filterDt) => (
        <InstalledAppsCard
          key={filterDt.id}
          filterDt={filterDt}
          handleRemoveDtFromLocalStor={handleRemoveDtFromLocalStor}
        />
      ))}
    </div>
  );
};

export default InstalledAppCard;

// 