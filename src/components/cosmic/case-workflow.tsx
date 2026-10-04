const workflows: Record<
  string,
  { title: string; steps: { title: string; text: string }[] }
> = {
  "daily-smith": {
    title: "From connected context to a clearer day",
    steps: [
      {
        title: "Connect",
        text: "Email and calendar context enters through provider tools and MCP connections.",
      },
      {
        title: "Understand",
        text: "The AI pipeline brings relevant information into the LLM-agent layer.",
      },
      {
        title: "Continue",
        text: "Daily priorities, important emails and follow-up conversation.",
      },
    ],
  },
  "creative-studio": {
    title: "A coherent visual language, carried through",
    steps: [
      {
        title: "Study references",
        text: "Start with images whose visual language works as a whole.",
      },
      {
        title: "Describe the DNA",
        text: "Extract coherent visual descriptions into JSONL guidelines.",
      },
      {
        title: "Guide generation",
        text: "Use those descriptions to guide menu generation. The poster owner later adopted the method across other formats.",
      },
    ],
  },
};

export function CaseWorkflow({ slug }: { slug: string }) {
  const flow = workflows[slug];
  if (!flow) return null;
  return (
    <section className="case-workflow" aria-labelledby="workflow-heading">
      <h2 id="workflow-heading">{flow.title}</h2>
      <ol>
        {flow.steps.map((step, i) => (
          <li key={step.title}>
            <span className="workflow-stop">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="art-note">
        Public workflow overview · illustrates the approach, not an internal
        architecture or live product demo.
      </p>
    </section>
  );
}
