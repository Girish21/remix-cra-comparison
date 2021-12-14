import { Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

type NavData = {
  name: string;
  id: string;
}[];

export const loader: LoaderFunction = () => {
  return {
    nav1: [
      { name: "Nav Link 1", id: "nav-1" },
      { name: "Nav Link 2", id: "nav-2" },
      { name: "Nav Link 3", id: "nav-3" },
    ],
    nav2: [
      { name: "Nav Link 1", id: "nav-1" },
      { name: "Nav Link 2", id: "nav-2" },
      { name: "Nav Link 3", id: "nav-3" },
    ],
    nav3: [
      { name: "Nav Link 1", id: "nav-1" },
      { name: "Nav Link 2", id: "nav-2" },
      { name: "Nav Link 3", id: "nav-3" },
    ],
  };
};

export default function Layout() {
  const { nav1, nav2, nav3 } = useLoaderData();
  return (
    <div className="w-[1080px] h-full m-auto grid grid-cols-[1fr_700px_1fr]">
      <nav className="flex flex-grow justify-end">
        <Nav nav1={nav1} nav2={nav2} nav3={nav3} />
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

function Nav({
  nav1,
  nav2,
  nav3,
}: {
  nav1: NavData;
  nav2: NavData;
  nav3: NavData;
}) {
  return (
    <div className="flex-[1_1_0%] overflow-auto max-w-[256px] fixed flex flex-col h-[calc(100vh-64px)] items-stretch">
      <div className="py-6 flex flex-col gap-6">
        <div>
          <NavHeading>Nav 1</NavHeading>
          <ul className="flex flex-col gap-4">
            {nav1.map(({ id, name }) => (
              <NavLink key={id}>{name}</NavLink>
            ))}
          </ul>
        </div>
        <div>
          <NavHeading>Nav 2</NavHeading>
          <ul className="flex flex-col gap-4">
            {nav2.map(({ id, name }) => (
              <NavLink key={id}>{name}</NavLink>
            ))}
          </ul>
        </div>
        <div>
          <NavHeading>Nav 3</NavHeading>
          <ul className="flex flex-col gap-4">
            {nav3.map(({ id, name }) => (
              <NavLink key={id}>{name}</NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
