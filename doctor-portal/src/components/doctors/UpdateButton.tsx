import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";

export default function UpdateButton({onClick ,className}:{onClick:()=>void, className?:string}) {
  return (
    <button
      className={`p-2 bg-green-400/10 border-green-400/10 dark:border-yoga-yoga/10 text-green-400 rounded hover:bg-green-400/20 border hover:border-green-400/50 transition-all duration-400 ${className}`}
      onClick={onClick}
    >
      <AiTwotoneEdit size={18} />
    </button>
  );
}
