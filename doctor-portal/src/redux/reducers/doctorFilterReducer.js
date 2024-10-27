import { doctors_data } from "../../utils/data";
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
} from "../actions/doctorFilterActionTypes";

const initialState = {
  hospitalChosen: "",
  specialityChosen: "",
  cityChosen: "",
  filteredDoctors: doctors_data,
  sort: "Name",
  currentlyViewedPageNum: 1,
  previouslyViewedPageNums: [1],
  numOfDoctorsPerPage: 6,
  order: "A-Z",
  totalPage: undefined,
  totalDoctors: undefined,
};

const doctorFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_HOSPITAL_CHOSEN:
      return { ...state, hospitalChosen: action.payload };
    case UPDATE_SPECIALITY_CHOSEN:
      return { ...state, specialityChosen: action.payload };
    case UPDATE_CITY_CHOSEN:
      return { ...state, cityChosen: action.payload };
    case UPDATE_FILTERED_DOCTORS:
      return { ...state, filteredDoctors: action.payload };
    case UPDATE_DOCTORS_SORT:
      return { ...state, sort: action.payload };
    case UPDATE_DOCTORS_ORDER:
      return { ...state, order: action.payload };
    case UPDATE_DOCTORS_TOTAL_PAGE:
      return { ...state, totalPage: action.payload };
    case UPDATE_DOCTORS_CURRENTLY_VIEWED_PAGE_NUM:
      return { ...state, currentlyViewedPageNum: action.payload };
    case UPDATE_DOCTORS_PREVIOUSLY_VIEWED_PAGE_NUMS:
      if (!state.previouslyViewedPageNums.includes(action.payload)) {
        return {
          ...state,
          previouslyViewedPageNums: [
            ...state.previouslyViewedPageNums,
            action.payload,
          ],
        };
      }
      return state;
    case UPDATE_TOTAL_DOCTORS:
      return { ...state, totalDoctors: action.payload };
    case UPDATE_NUM_OF_DOCTORS_PER_PAGE:
      return { ...state, numOfDoctorsPerPage: action.payload };
    default:
      return state;
  }
};

export default doctorFilterReducer;
