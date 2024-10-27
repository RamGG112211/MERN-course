/* eslint-disable react/prop-types */

export default function Img({ img_url, alt, width, height, className }) {
  return (
    <img
      src={img_url}
      alt={alt}
      width={width}
      height={height}
      className={` object-center object-cover ${className}`}
    />
  );
}
