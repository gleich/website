import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/projects/projects.module.css';
import Card from '@/ui/card';

export default function Projects() {
  return (
    <LiveSection
      name="Projects"
      source="GitHub"
      sourceURL="https://github.com"
      lastUpdated={new Date()}
    >
      <h3 className={styles.highlightedTitle}>Highlighted Projects</h3>
      <div className={styles.highlightedProjects}>
        <Card>
          <p>gleich/github</p>
          <p>Lightweight Cache Proxy Service</p>
          <p>GitHub Stargazers: #4</p>
        </Card>
      </div>
    </LiveSection>
  );
}
