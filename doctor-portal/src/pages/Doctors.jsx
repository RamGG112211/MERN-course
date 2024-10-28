import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDoctorsCurrentlyViewedPageNum,
  updateDoctorsTotalPage,
  updateTotalDoctors,
} from "../store/doctorsSlice"
import {
  updateCitySearched,
  updateProvider,
  updateSpecialitySearched,
} from "../store/providersSearchSlice";
import Wrapper from "../components/global/Wrapper";
import DoctorFilter from "../components/doctors/DoctorFilter";
import FilteredDoctorsList from "../components/doctors/FilteredDoctorsList";

export default function Doctors() {
  const { provider, citySearched, specialitySearched } = useSelector(
    (store) => store.providersSearch
  );

  const dispatch = useDispatch();

  const {
    filteredDoctors,
    totalPage,
    totalDoctors,
    currentlyViewedPageNum,
    numOfDoctorsPerPage,
    // sort,
  } = useSelector((store) => store.doctors);

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

  useEffect(() => {
    //clear provider from home search
    if (provider && provider.length > 0) {
      dispatch(updateProvider(""));
    }
    if (citySearched && citySearched.length > 0) {
      dispatch(updateCitySearched(""));
    }
    if (specialitySearched && specialitySearched.length > 0) {
      dispatch(updateSpecialitySearched(""));
    }
  }, []);

  return (
    <Wrapper className=" flex flex-col gap-4 md:gap-6 section_vp">
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
    </Wrapper>
  );
}
