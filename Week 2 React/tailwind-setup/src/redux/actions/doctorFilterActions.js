import {
  UPDATE_CITY_CHOSEN,
  UPDATE_DOCTORS_CURRENTLY_VIEWED_PAGE_NUM,
  UPDATE_DOCTORS_ORDER,
  UPDATE_DOCTORS_PREVIOUSLY_VIEWED_PAGE_NUMS,
  UPDATE_DOCTORS_SORT,
  UPDATE_DOCTORS_TOTAL_PAGE,
  UPDATE_FILTERED_DOCTORS,
  UPDATE_HOSPITAL_CHOSEN,
  UPDATE_NUM_OF_DOCTORS_PER_PAGE,
  UPDATE_SPECIALITY_CHOSEN,
  UPDATE_TOTAL_DOCTORS,
} from "./doctorFilterActionTypes";

export const updateHospitalChosen = (hospital) => ({
  type: UPDATE_HOSPITAL_CHOSEN,
  payload: hospital,
});

export const updateSpecialityChosen = (speciality) => ({
  type: UPDATE_SPECIALITY_CHOSEN,
  payload: speciality,
});

export const updateCityChosen = (city) => ({
  type: UPDATE_CITY_CHOSEN,
  payload: city,
});

export const updateFilteredDoctors = (doctors) => ({
  type: UPDATE_FILTERED_DOCTORS,
  payload: doctors,
});

export const updateDoctorsSort = (sort) => ({
  type: UPDATE_DOCTORS_SORT,
  payload: sort,
});

export const updateDoctorsOrder = (order) => ({
  type: UPDATE_DOCTORS_ORDER,
  payload: order,
});

export const updateDoctorsTotalPage = (totalPage) => ({
  type: UPDATE_DOCTORS_TOTAL_PAGE,
  payload: totalPage,
});

export const updateDoctorsCurrentlyViewedPageNum = (pageNum) => ({
  type: UPDATE_DOCTORS_CURRENTLY_VIEWED_PAGE_NUM,
  payload: pageNum,
});

export const updateDoctorsPreviouslyViewedPageNums = (pageNum) => ({
  type: UPDATE_DOCTORS_PREVIOUSLY_VIEWED_PAGE_NUMS,
  payload: pageNum,
});

export const updateTotalDoctors = (total) => ({
  type: UPDATE_TOTAL_DOCTORS,
  payload: total,
});

export const updateNumOfDoctorsPerPage = (num) => ({
  type: UPDATE_NUM_OF_DOCTORS_PER_PAGE,
  payload: num,
});
