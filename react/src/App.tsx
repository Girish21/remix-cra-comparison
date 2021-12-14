import * as React from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Spin from "./components/spin";
import useFetcher from "./hooks/useFetcher";

type NavData = {
  name: string;
  id: string;
}[];

type CountData = {
  id: string;
  count: number;
}[];

function Header() {
  return (
    <div className="flex flex-col">
      <header className="h-16 w-full bg-white shadow-md fixed z-10 isolate grid place-content-center">
        Header
      </header>
      <div className="relative top-16 h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </div>
  );
}

function Index() {
  const { isLoading } = useFetcher({
    queryKeys: ["second_request"],
    url: "/second",
  });

  if (isLoading) {
    return (
      <div className="h-full grid place-content-center">
        <Spin />
      </div>
    );
  }

  return <Navigate replace to="/feeds" />;
}

function FeedLayout() {
  return (
    <div className="w-[1080px] h-full m-auto grid grid-cols-[1fr_700px_1fr]">
      <nav className="flex flex-grow justify-end">
        <Nav />
      </nav>
      <section className="w-[700px] px-12">
        <Outlet />
      </section>
    </div>
  );
}

function NavHeading({ children }: { children: string }) {
  return <h3 className="text-lg font-bold text-gray-800">{children}</h3>;
}

function NavLink({ children }: { children: string }) {
  return <li className="text-gray-500">{children}</li>;
}

function NavSpinner() {
  return (
    <div className="h-28 grid place-content-center">
      <Spin />
    </div>
  );
}

function Nav() {
  const { data: nav1Data, isLoading: nav1Loading } = useFetcher<NavData>({
    queryKeys: ["nav_1"],
    url: "/nav/nav_1",
  });

  const { data: nav2Data, isLoading: nav2Loading } = useFetcher<NavData>({
    queryKeys: ["nav_2"],
    url: "/nav/nav_2",
  });

  const { data: nav3Data, isLoading: nav3Loading } = useFetcher<NavData>({
    queryKeys: ["nav_3"],
    url: "/nav/nav_3",
  });

  return (
    <div className="flex-[1_1_0%] overflow-auto max-w-[256px] fixed flex flex-col h-[calc(100vh-64px)] items-stretch">
      <div className="py-6 flex flex-col gap-6">
        <div>
          <NavHeading>Nav 1</NavHeading>
          {nav1Loading ? (
            <NavSpinner />
          ) : (
            <ul className="flex flex-col gap-4">
              {nav1Data.map(({ id, name }) => (
                <NavLink key={id}>{name}</NavLink>
              ))}
            </ul>
          )}
        </div>
        <div>
          <NavHeading>Nav 2</NavHeading>
          {nav2Loading ? (
            <NavSpinner />
          ) : (
            <ul className="flex flex-col gap-4">
              {nav2Data.map(({ id, name }) => (
                <NavLink key={id}>{name}</NavLink>
              ))}
            </ul>
          )}
        </div>
        <div>
          <NavHeading>Nav 3</NavHeading>
          {nav3Loading ? (
            <NavSpinner />
          ) : (
            <ul className="flex flex-col gap-4">
              {nav3Data.map(({ id, name }) => (
                <NavLink key={id}>{name}</NavLink>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Cateogory() {
  const navigate = useNavigate();
  const { isLoading: nav1Loading } = useFetcher<NavData>({
    queryKeys: ["nav_1"],
    url: "/nav/nav_1",
  });

  const { isLoading: nav2Loading } = useFetcher<NavData>({
    queryKeys: ["nav_2"],
    url: "/nav/nav_2",
  });

  const { isLoading: nav3Loading } = useFetcher<NavData>({
    queryKeys: ["nav_3"],
    url: "/nav/nav_3",
  });

  React.useEffect(() => {
    if (nav1Loading || nav2Loading || nav3Loading) {
      return;
    }
    navigate("home", { replace: true });
  }, [nav1Loading, nav2Loading, nav3Loading]);

  return <Outlet />;
}

function Source() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("all", { replace: true });
  }, []);

  return <Outlet />;
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-blue-200 text-gray-700 px-3 py-2 flex gap-3">
      {children}
    </div>
  );
}

const tabs = ["All", "Documents", "Media", "Links"];

function Counts() {
  const { data, isLoading } = useFetcher<CountData>({
    queryKeys: ["count"],
    url: "/search/count",
  });

  if (isLoading) {
    return (
      <div className="flex justify-between">
        {Array.from({ length: 4 }, (_, i) => tabs[i]).map((name, i) => (
          <Count key={i}>
            <span>{name}</span>
            <Spin />
          </Count>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      {data.map(({ count, id }, i) => (
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

function FeedList() {
  const { data, isLoading } = useFetcher<{ id: string }[]>({
    queryKeys: ["search"],
    url: "/search",
  });

  if (isLoading) {
    return (
      <div className="flex-1 grid place-content-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {data.map(({ id }, i) => (
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

function Feed() {
  return (
    <div className="py-6 h-full flex flex-col space-y-6">
      <FeedHeader />
      <Counts />
      <hr className="text-gray-300" />
      <FeedList />
    </div>
  );
}

function App() {
  const { isLoading } = useFetcher({
    queryKeys: ["first_request"],
    url: "/first",
  });

  if (isLoading) {
    return (
      <main className="h-full grid place-content-center">
        <Spin />
      </main>
    );
  }

  return (
    <main className="h-full">
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Index />} />
          <Route element={<FeedLayout />}>
            <Route path=":category" element={<Cateogory />}>
              <Route path=":source" element={<Source />}>
                <Route path=":type" element={<Feed />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
