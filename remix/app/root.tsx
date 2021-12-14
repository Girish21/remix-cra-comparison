import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction, LoaderFunction } from "remix";

import tailwindcss from "~/styles/tailwind.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindcss }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const onboarded = true;

  const url = new URL(request.url);

  async function userOnboarded() {
    if (onboarded) {
      return;
    }
    throw redirect("/");
  }

  async function userStatus() {
    return { status: true };
  }

  async function boards() {
    return [{ name: "home" }];
  }
  async function publicSource() {
    return [{ name: "BSE" }];
  }
  async function privateSource() {
    return [{ name: "Gmail" }];
  }

  async function validUrl() {
    await Promise.all([boards(), publicSource(), privateSource()]);

    // validate URL and return boolean

    return url.pathname === "/feeds/home/all";
  }

  if (!(await validUrl())) throw redirect("/feeds/home/all");

  await Promise.all([userOnboarded(), userStatus()]);

  return {};
};

export default function App() {
  return (
    <Document>
      <main className="h-full">
        <div className="flex flex-col">
          <header className="h-16 w-full bg-white shadow-md fixed z-10 isolate grid place-content-center">
            Header
          </header>
          <div className="relative top-16 h-[calc(100vh-64px)]">
            <Outlet />
          </div>
        </div>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
        <hr />
        <p>
          Hey, developer, you should replace this with what you want your users
          to see.
        </p>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
