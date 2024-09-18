/* eslint-disable react/prop-types */
import FilterListBox from "../filter/FilterListBox";

export default function FilterByOrderPlusStatistic({
  currentlyViewedItemsLastIndex,
  currentlyViewedItemsStartIndex,
  items,
  sort,
  order,
  updateSortFunc,
  updateOrderFunc,
  itemNameFiltered,
  sortOptions,
}) {
  const orderOptions = ["A-Z", "Z-A"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-sm text-black/75">
      <p>
        Showing:{" "}
        {currentlyViewedItemsStartIndex + 1 === currentlyViewedItemsLastIndex
          ? currentlyViewedItemsLastIndex
          : `${
              currentlyViewedItemsStartIndex + 1
            }-${currentlyViewedItemsLastIndex}`}{" "}
        of {items.length} {itemNameFiltered} available
      </p>

      <div className="flex items-center gap-3">
        <div className="flex gap-3 items-center">
          <span className="whitespace-nowrap">Sort by:</span>
          <FilterListBox
            item={sort}
            updateFunc={updateSortFunc}
            options={sortOptions}
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="whitespace-nowrap">Order:</span>
          <FilterListBox
            item={order}
            updateFunc={updateOrderFunc}
            options={orderOptions}
          />
        </div>
      </div>
    </div>
  );
}
