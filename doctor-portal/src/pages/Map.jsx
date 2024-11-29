import SingleLocationMap from "../components/map/SingleLocationMap";
import SourceToDestinationMap from "../components/map/SourceToDestinationMap";

export default function Map() {
  return (
    <div>
      <div className=" mb-6">
        <h1>Single location map</h1>
        <SingleLocationMap />
      </div>

      <div>
        <h1>Source to destination map</h1>
        <SourceToDestinationMap />
      </div>
    </div>
  );
}
