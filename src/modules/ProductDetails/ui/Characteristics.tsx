import React from "react";

// Описание типа одной характеристики
interface CharacteristicItem {
  id: number;
  name: string;
  value: string;
}

// Пропсы для компонента
interface IProps {
  characteristics: CharacteristicItem[] | undefined;
}

const Characteristics: React.FC<IProps> = ({ characteristics }) => {
  // Удаляем дублирующиеся элементы по `name` и `value`
  const uniqueCharacteristics = characteristics
    ? characteristics.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.name === item.name && t.value === item.value)
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10 shadow-sm border border-gray-300">
      <table className="w-full border-collapse text-left table-fixed">
        {/* <thead>
          <tr>
            <th className="w-1/2 px-6 py-3 text-gray-800 font-semibold uppercase text-sm border-b border-gray-300 text-center">
              Характеристика
            </th>
            <th className="w-1/2 px-6 py-3 text-gray-800 font-semibold uppercase text-sm border-b border-gray-300 text-center">
              Значение
            </th>
          </tr>
        </thead> */}
        <tbody>
          {uniqueCharacteristics.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 transition duration-150">
              <td className="px-6 py-4 text-gray-800 text-sm border-b border-gray-200 text-center">
                {item.name}
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium text-sm border-b border-gray-200 text-center">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Characteristics;
