/* eslint-disable react/prop-types */

export default function Wrapper({ children, className }) {
  return (
    <div className={`${className} px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 `}>
      {children}
    </div>
  );
}
