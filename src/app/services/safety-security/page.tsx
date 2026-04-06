import { Container } from "@/components/ui/container";

export default function SafetySecurityPage() {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <h1 className="text-3xl sm:text-4xl leading-tight">
          <span className="title-thin">Safety & </span><span className="title-highlight">Security</span>
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          Detailed service page placeholder. We can add risk assessment
          frameworks, security management plans, and training packages here.
        </p>
      </Container>
    </main>
  );
}

