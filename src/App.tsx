import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Newspaper } from "lucide-react";
import { SiGithub } from "react-icons/si";

function App() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 font-Inter">
      <section className="text-center py-12 relative">
        {/* Centered Title */}
        <h1 className="text-4xl font-bold">DR.SIMON</h1>
        <div className="absolute top-6 right-4">
          <img
            src="/logo.png"
            className="w-30 h-36 object-contain"
            alt="Logo"
          />
        </div>

        <h1 className="text-3xl px-6 md:px-32 mb-6 leading-snug">
          Domain-wise Rewrite for Segment-Informed In-video Medical Oversight
          Zero-Shot Network
        </h1>

        <div className="flex justify-center gap-3 mt-4">
          <Button className="text-base px-6 py-2">
            <SiGithub className="mr-2" />
            Code
          </Button>
          <Button className="text-base px-6 py-2">
            <Newspaper className="mr-2" />
            Paper
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Abstract</h2>
        <p className="text-base leading-relaxed text-center">Abstract</p>
      </section>

      <Separator className="my-12" />
      <section className="py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Citation</h2>
        <div className="bg-gray-100 rounded-xl p-4 text-sm font-mono text-left overflow-x-auto">
          <pre className="whitespace-pre-wrap">
            {`@article{2025drsimon,
title     = {DR.SIMON: Domain-wise Rewrite for Segment-Informed In-video Medical Oversight Zero-Shot Network},
author    = {},
journal   = {arXiv preprint arXiv:},
year      = {2025}
            }`}
          </pre>
        </div>
      </section>
      <footer className="text-center text-sm text-muted-foreground mt-12 py-6">
        © 2025 DR.SIMON Project. All rights reserved.
      </footer>
    </main>
  );
}

export default App;
