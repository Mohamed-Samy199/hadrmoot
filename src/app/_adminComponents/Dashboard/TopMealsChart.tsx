import { useTopMeals } from "@/lib/hooks/topMenus";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopMealsChart() {
  const data = useTopMeals();
  return (
    <div
      className="
        w-full h-[40vh] p-2 dark:bg-gray-200 rounded-2xl shadow
        flex justify-center items-center
        sm:justify-start sm:items-start
      "
    >
      <div className="w-[90%] h-[40vh] sm:w-full sm:h-[35vh]">
        <h2 className="text-sm md:text-xl font-bold text-center mb-2">
          أكثر الوجبات طلبًا (آخر 30 يوم)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};