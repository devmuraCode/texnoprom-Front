import React, { useState } from "react";

interface AccordionItemProps {

  content: React.ReactNode;
  img: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ img, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div >
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl   dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          <img src={img} alt="" />
          <svg
            className={`w-3 h-3 rotate-${isOpen ? "0" : "180"} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {isOpen && (
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {content}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
