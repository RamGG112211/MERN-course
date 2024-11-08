/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";

export default function DeleteButton({ onClick, className }) {
  return (
    <button
      className={` p-2 bg-red-400/10 border-red-400/10 text-red-400 rounded hover:bg-red-400/20 border hover:border-red-400/50 transition-all duration-400 ${className}`}
      onClick={onClick}
    >
      <Trash2 size={16} />
    </button>
  );
}
