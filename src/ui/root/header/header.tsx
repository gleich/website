"use client";

import styles from "@/ui/root/header/header.module.css";
import Logo from "./logo";
import Social from "./social";
import { useEffect, useState, useMemo } from "react";

export default function Header() {
  const descriptions = useMemo(
    () => ["photographer", "cyclist", "developer", "college student"],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycleTexts = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 2000);

    return () => clearInterval(cycleTexts);
  }, [descriptions]);

  return (
    <div className={styles.root}>
      <div className={styles.personal}>
        <div className={styles.nameAndDescription}>
          <h1 className={styles.name}>Matt Gleich</h1>
          <p className={styles.description}>{descriptions[index]}</p>
        </div>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.socials}>
        <Social name="github" href="https://github.com/gleich" />
        <Social
          name="instagram"
          href="https://www.instagram.com/mattglei.ch/"
        />
        <Social name="strava" href="https://www.strava.com/athletes/30124266" />
        <Social
          name="linkedin"
          href="https://www.linkedin.com/in/matt-gleich/"
        />
      </div>
    </div>
  );
}
