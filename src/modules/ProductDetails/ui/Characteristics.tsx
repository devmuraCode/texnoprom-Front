import React from 'react'

interface CharacteristicItem {
  id: number;
  name: string;
  value: string;
}

interface IProps {
  characteristics: {
    id: string;
    product: string;
    items: CharacteristicItem[];
  };
}

const Characteristics: React.FC<IProps> = ({ characteristics }) => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg mt-10">
      {characteristics.items.map((item) => (
        <div key={item.id} className="border-b border-gray-200 py-2 flex gap-10">
          <strong className="text-gray-500 font-normal w-40">{item.name}:</strong> <span className="text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default Characteristics;