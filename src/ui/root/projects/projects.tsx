import LiveSection from '@/ui/section/liveSection';

export default function Projects() {
  return (
    <LiveSection
      name="Projects"
      source="GitHub"
      sourceURL="https://github.com"
      lastUpdated={new Date()}
    >
      <p>Hello world!</p>
    </LiveSection>
  );
}
