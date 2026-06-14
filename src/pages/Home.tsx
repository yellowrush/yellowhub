import "./Home.css";

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <div className="intro">
          <h1>Welcome to YellowHub</h1>
          <p>
            Built with <strong>Vite</strong> + <strong>vite-react-ssg</strong>{" "}
            + <strong>React Router v6</strong>. Static-site generation with
            lightning-fast builds.
          </p>
        </div>
        <div className="ctas">
          <a
            className="primary"
            href="https://vitejs.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          <a
            className="secondary"
            href="https://github.com/Daydreamer-riri/vite-react-ssg"
            target="_blank"
            rel="noopener noreferrer"
          >
            vite-react-ssg
          </a>
        </div>
      </main>
    </div>
  );
}
