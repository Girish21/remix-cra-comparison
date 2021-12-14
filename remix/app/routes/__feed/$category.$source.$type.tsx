import { LoaderFunction, useLoaderData } from "remix";

type CountData = {
  id: string;
  count: number;
}[];

export const loader: LoaderFunction = () => {
  return {
    counts: [
      { id: "1", count: 10 },
      { id: "2", count: 20 },
      { id: "3", count: 30 },
      { id: "4", count: 40 },
    ],
    feedData: [
      ...Array.from({ length: 20 }).map(() => ({
        id: Math.random().toString(8).slice(2, 32),
      })),
    ],
  };
};

export default function Feed() {
  const { counts, feedData } = useLoaderData();

  return (
    <div className="py-6 h-full flex flex-col space-y-6">
      <FeedHeader />
      <Counts counts={counts} />
      <hr className="text-gray-300" />
      <FeedList feedData={feedData} />
    </div>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-blue-200 text-gray-700 px-3 py-2 flex gap-3">
      {children}
    </div>
  );
}

const tabs = ["All", "Documents", "Media", "Links"];

function Counts({ counts }: { counts: CountData }) {
  return (
    <div className="flex justify-between">
      {counts.map(({ count, id }, i) => (
        <Count key={id}>
          <span>{tabs[i]}</span>
          <span>{count}</span>
        </Count>
      ))}
    </div>
  );
}

function FeedHeader() {
  return <h2 className="text-xl font-bold text-gray-800">Home</h2>;
}

function FeedList({ feedData }: { feedData: { id: string }[] }) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {feedData.map(({ id }, i) => (
        <div
          key={id}
          className="rounded-lg bg-white shadow-sm p-6 grid place-content-center"
        >
          {i}
        </div>
      ))}
    </div>
  );
}
