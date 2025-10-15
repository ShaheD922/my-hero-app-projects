import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReactCharts = ({ ratings, description }) => {
  const chartData =
    ratings?.map((r) => ({
      name: r.name,
      count: r.count,
    })) || [];
  return (
    <div className="w-full   rounded-2xl p-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 14 }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
          <Tooltip />

          <Bar
            dataKey="count"
            fill="orange"
            radius={[0, 8, 8, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Show description pera by pera  */}
      <div>
        <p className="text-start font-bold text-2xl">Description</p>
        <div className="space-y-5 text-gray-700 leading-relaxed mt-4 text-justify">
          {description
            ?.split(/(?<=[.?!])\s+/)
            .reduce((acc, sentence, i) => {
              if (i % 4 === 0) acc.push([]);
              acc[acc.length - 1].push(sentence);
              return acc;
            }, [])
            .map((group, index) => (
              <p key={index}>{group.join(" ")}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReactCharts;