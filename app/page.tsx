import Image from "next/image";

export default function Home() {
   return (
    <main className="p-6">
      <h1 className="font-display text-h1 text-brand">Heading One</h1>
      <h2 className="font-display text-h2 mt-4">Heading Two</h2>
      <p className="font-body text-body mt-2 text-gray-700">
        Body text set in Lora Regular 14px with 1.6 line-height.
      </p>

      <button className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90">
        Primary Button
      </button>
    </main>
  );
}
