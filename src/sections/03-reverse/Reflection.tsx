// ═══════════════════════════════════════════════════════════════════
// Reflection — closes the reverse-engineering section.
// Uses the demo's reflectionHook to describe the specific opening.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbBulb } from 'react-icons/tb';
import type { ReverseDemoMeta } from '@/data/reverseDemo';
import styles from './Reflection.module.scss';

interface Props {
  meta: ReverseDemoMeta;
}

const Reflection: React.FC<Props> = ({ meta }) => (
  <section className={styles.section}>
    <div className={styles.icon}>
      <TbBulb aria-hidden />
    </div>
    <div className={styles.body}>
      <h4 className={styles.title}>הרגע ה-aha</h4>
      <p>
        ה<strong>פתיח של ההצתה</strong> בסוף — <em>{meta.reflectionHook}</em> —
        לא היה רעיון אקראי. הוא <strong>נולד מתוך השאלה הסופית</strong>:
        מה שהתלמיד צריך להוכיח שהוא מבין. זאת הסיבה שהוא עובד.
      </p>
      <p className={styles.next}>
        <span className={styles.nextBadge}>הבא</span>
        בחלק <strong>תרגול</strong> — תבחרו נושא משלכם ותריצו את 5 הפרומפטים בעצמכם.
      </p>
    </div>
  </section>
);

export default Reflection;