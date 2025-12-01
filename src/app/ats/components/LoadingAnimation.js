"use client";

export default function LoadingAnimation(){
  return (
    <section
      className="min-h-screen px-6 py-16 relative text-white flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/category_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="relative w-48 h-48 flex items-center justify-center rounded-full"
          style={{
            boxShadow:
              "0 0 40px rgba(19,255,236,0.35), 0 0 70px rgba(99,102,241,0.32), 0 0 120px rgba(124,58,237,0.28)",
            animation: "pulseGlow 2.2s infinite ease-in-out",
            border: "4px solid rgba(99,102,241,0.45)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border-4 border-indigo-500"
            style={{
              animation: "spinElectric 3.5s linear infinite",
              boxShadow:
                "0 0 35px rgba(19,255,236,0.32), inset 0 0 30px rgba(124,58,237,0.26)",
            }}
          ></div>

          <p className="text-indigo-300 text-xl font-semibold tracking-wide">
            Analyzing...
          </p>
        </div>

        <p className="mt-8 text-gray-300 text-center">
          We’re scanning your resume with AI…
        </p>
      </div>

      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: .8; }
            50% { opacity: 1; }
            100% { opacity: .8; }
          }
          @keyframes spinElectric {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
}
