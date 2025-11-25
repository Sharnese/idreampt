import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Landing test</h1>
      <button
        onClick={() => navigate("/signup")}
        className="px-4 py-2 rounded bg-white text-black"
      >
        Go to Sign Up
      </button>
    </div>
  );
}
