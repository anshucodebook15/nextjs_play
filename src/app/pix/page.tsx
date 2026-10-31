import { PixContactForm } from "@/src/features/pix/components/PixContactForm";

export default function PixPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Pix</h1>
        <p className="text-sm opacity-70">Get in touch using the form below.</p>
      </header>
      <PixContactForm />
    </main>
  );
}
