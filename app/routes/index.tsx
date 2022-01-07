import * as React from "react";
import type ConfettiType from "react-confetti";

export default function Index() {
  const [Confetti, setConfetti] = React.useState<typeof ConfettiType | null>(null);

  React.useEffect(() => {
    (async () => {
      const mod = await import("react-confetti");
      console.log(mod);
      setConfetti(mod.default);
    })();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
        {Confetti && <Confetti recycle={false} />}
      </ul>
    </div>
  );
}
