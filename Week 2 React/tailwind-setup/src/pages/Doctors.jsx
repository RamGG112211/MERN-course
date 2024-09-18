import { useCallback, useEffect, useMemo } from "react";
import {
  updateDoctorsCurrentlyViewedPageNum,
  updateDoctorsPreviouslyViewedPageNums,
  updateDoctorsTotalPage,
  updateTotalDoctors,
} from "../redux/actions/doctorFilterActions";
import DoctorFilter from "../components/doctors/DoctorFIlter";
import FilteredDoctorsList from "../components/doctors/FilteredDoctorsList";
import { useDispatch, useSelector } from "react-redux";

export default function FindDoctorsPage() {
  const { filteredDoctors } = useSelector((store) => store.doctorFilter);

  const dispatch = useDispatch();

  const {
    totalPage,
    totalDoctors,
    currentlyViewedPageNum,
    // previouslyViewedPageNums,
    numOfDoctorsPerPage,
    // sort,
  } = useSelector((store) => store.doctorFilter);

  const currentlyViewedPageStartIndex = useMemo(
    () => (currentlyViewedPageNum - 1) * numOfDoctorsPerPage,
    [currentlyViewedPageNum, numOfDoctorsPerPage]
  );

  const currentlyViewedPageLastIndex = useMemo(() => {
    if (filteredDoctors)
      if (currentlyViewedPageNum == totalPage) return filteredDoctors.length;
      else return currentlyViewedPageNum * numOfDoctorsPerPage;
    return numOfDoctorsPerPage;
  }, [currentlyViewedPageNum, numOfDoctorsPerPage, totalPage, filteredDoctors]);

  const changeCurrentlyViewedPageNum = (currentlyViewedPageNum) => {
    dispatch(updateDoctorsCurrentlyViewedPageNum(currentlyViewedPageNum));
    dispatch(updateDoctorsPreviouslyViewedPageNums(currentlyViewedPageNum));
  };

  const changeTotalNumOfDoctors = useCallback(() => {
    if (filteredDoctors) dispatch(updateTotalDoctors(filteredDoctors.length));
    else dispatch(updateTotalDoctors(undefined));
  }, [dispatch, filteredDoctors]);

  const changeTotalPage = useCallback(() => {
    let totalPage;
    if (totalDoctors) {
      totalPage = Math.ceil(totalDoctors / numOfDoctorsPerPage);
    } else {
      totalPage = undefined;
    }
    dispatch(updateDoctorsTotalPage(totalPage));
  }, [dispatch, totalDoctors, numOfDoctorsPerPage]);

  const changeCurrentPageNum = useCallback(() => {
    if (totalPage && currentlyViewedPageNum > totalPage)
      dispatch(updateDoctorsCurrentlyViewedPageNum(1));
    else if (totalPage && currentlyViewedPageNum <= totalPage)
      dispatch(updateDoctorsCurrentlyViewedPageNum(currentlyViewedPageNum));
  }, [currentlyViewedPageNum, dispatch, totalPage]);

  useEffect(() => {
    changeCurrentPageNum();
  }, [totalPage]);

  useEffect(() => {
    changeTotalNumOfDoctors();
    changeTotalPage();
  }, []);

  useEffect(() => {
    changeTotalNumOfDoctors();
  }, [filteredDoctors]);

  useEffect(() => {
    changeTotalPage();
  }, [totalDoctors]);

  // useEffect(() => {
  //   //clear provider from home search
  //   if (provider && provider.length > 0) {
  //     dispatch(updateProvider(""));
  //   }
  //   if (citySearched && citySearched.length > 0) {
  //     dispatch(updateCitySearched(""));
  //   }
  //   if (specialitySearched && specialitySearched.length > 0) {
  //     dispatch(updateSpecialitySearched(""));
  //   }
  // }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6 section_vp padding">
      <DoctorFilter
        currentlyViewedDoctorsLastIndex={currentlyViewedPageLastIndex}
        currentlyViewedDoctorsStartIndex={currentlyViewedPageStartIndex}
      />

      <FilteredDoctorsList
        totalDoctors={totalDoctors}
        totalPage={totalPage}
        page={currentlyViewedPageNum}
        numOfDoctorsPerPage={numOfDoctorsPerPage}
        onPageChange={changeCurrentlyViewedPageNum}
        currentlyViewedDoctorsLastIndex={currentlyViewedPageLastIndex}
        currentlyViewedDoctorsStartIndex={currentlyViewedPageStartIndex}
      />
    </div>
  );
}
