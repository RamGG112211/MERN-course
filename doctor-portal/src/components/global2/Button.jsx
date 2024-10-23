/* eslint-disable react/prop-types */

export default function Button({
  className,
  children,
  onClickFn,
  type,
  variant = "default",
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={` ${
        variant == "default"
          ? " !bg-primary bg-opacity-90 hover:bg-opacity-100 !text-white border !border-primary hover:!border-primary "
          : variant == "secondary"
          ? " !bg-gray-100 hover:!bg-gray-200"
          : "  !bg-white dark:!bg-inherit hover:!text-white dark:!text-inherit hover:!bg-primary border !border-primary !text-primary "
      } rounded-md py-2 px-4 transition duration-200 capitalize ${className}`}
      onClick={onClickFn}
    >
      {children}
    </button>
  );
}
