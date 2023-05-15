import { GetStaticProps } from "next";
import { env } from "@/env.mjs"

export default function Leaderboard({ leaderboard }: { leaderboard: { username: string, totalTime: number }[] }) {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-xl font-bold my-4">Leaderboard</h1>
        <p className="font-light text-center">This leaderboard is updated every 10 mins.</p>

        <div className="bg-white shadow overflow-hidden mx-2 rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-800 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-800 uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left font-medium text-gray-800 uppercase tracking-wider">Total Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((user, index) => (<tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.totalTime}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${env.BACKENDURL}/leaderboard`);
  var data = await res.json();
  return {
    props: { leaderboard: data },
    revalidate: 600,
  };
};
