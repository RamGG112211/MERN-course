/* eslint-disable react/prop-types */

const ProviderSearchInput = ({
  icon,
  placeholder,
  onChangeFunc,
  className,
}) => {
  return (
    <div
      className={` flex items-center gap-2 px-5 py-2 rounded-md shadow-md h-fit text-black w-full shrink-0 ${className}`}
    >
      <span className="text-sm text-black/70">{icon}</span>
      <input
        className=" text-sm w-full placeholder:text-black/70 outline-none bg-transparent"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onChangeFunc(e.target.value);
        }}
      />
    </div>
  );
};

export default ProviderSearchInput;
