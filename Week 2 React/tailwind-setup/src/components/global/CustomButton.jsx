/* eslint-disable react/prop-types */

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center py-2 px-5 rounded-md bg-primary/95 hover:bg-primary transition-all duration-300 text-white  ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
