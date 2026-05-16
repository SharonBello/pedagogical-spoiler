// ═══════════════════════════════════════════════════════════════════
// TopicDisplay — banner at the top of Section 5 showing the
// teacher's selected topic (subject · grade · topic).
// Includes a "change topic" link back to Section 4.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Link } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import type { CustomTopic } from '@/types/module.types';
import styles from './TopicDisplay.module.scss';

interface Props {
  topic: CustomTopic;
}

const TopicDisplay: React.FC<Props> = ({ topic }) => (
  <section className={styles.banner}>
    <div className={styles.tagRow}>
      <span className={styles.tag}>הנושא שלכם</span>
      <Link to="/break" className={styles.edit} aria-label="שינוי הנושא">
        <TbEdit aria-hidden />
        <span>שינוי</span>
      </Link>
    </div>

    <dl className={styles.fields}>
      <div className={styles.field}>
        <dt>מקצוע</dt>
        <dd>{topic.subject}</dd>
      </div>
      <div className={styles.field}>
        <dt>נושא</dt>
        <dd>{topic.topic}</dd>
      </div>
      <div className={styles.field}>
        <dt>כיתה</dt>
        <dd>{topic.grade}</dd>
      </div>
      {topic.ageRange && (
        <div className={styles.field}>
          <dt>גיל</dt>
          <dd>{topic.ageRange}</dd>
        </div>
      )}
    </dl>
  </section>
);

export default TopicDisplay;