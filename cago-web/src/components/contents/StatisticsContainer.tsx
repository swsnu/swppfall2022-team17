interface Stat {
  name: string;
  value: number | string;
}

interface Props {
  statList: Stat[];
}

const StatisticsContainer = ({ statList }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between flex-1 flex-shrink">
      {statList.map((stat) => (
        <div key={stat.name} className="bg-gray-50 shadow-lg text-center p-4 rounded-lg w-full zoom">
          <h3 className="font-semibold text-lg mb-2">{stat.name}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsContainer;
