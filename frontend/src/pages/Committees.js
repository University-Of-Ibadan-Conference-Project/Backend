import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";
import styles from "./../sass/pages/Committees.module.scss";

const ROLE_GROUPS = [
  { role: "Chair", label: "Chair" },
  { role: "Secretary", label: "Secretary" },
  { role: "Member", label: "Members" },
];

const committees = [
  {
    name: "Editorial / Publications Committee",
    members: [
      { name: "Dr Babatunde Ayinla", role: "Chair" },
      { name: "Mr Isaac Olaleye", role: "Secretary" },
      { name: "Prof Babatunde Akinkunmi", role: "Member" },
      { name: "Prof Samuel Akinola", role: "Member" },
      { name: "Dr Blessing Asoro", role: "Member" },
      { name: "Ms. Mayode Akintola", role: "Member" },
    ],
  },
  {
    name: "Research Ethics & Advisory Committee",
    members: [
      { name: "Prof. Oladunni Daramola", role: "Chair" },
      { name: "Mr. Olusesan Obakunle", role: "Secretary" },
      { name: "Prof. Babatunde Akinkunmi", role: "Member" },
      { name: "Prof. Seyi Osunade", role: "Member" },
      { name: "Prof Olufade Onifade", role: "Member" },
    ],
  },
  {
    name: "Welfare, Registration, Awards & Certification Committee",
    members: [
      { name: "Mrs Elizabeth Ogunseye", role: "Chair" },
      { name: "Mr. Samuel Fawale", role: "Secretary" },
      { name: "Mr. Isaac Ayetyoma", role: "Member" },
      { name: "Dr. Prospera Idyorough", role: "Member" },
      { name: "Mrs. Adedoyin Amoo-Onidundu", role: "Member" },
      { name: "Ms. Beverly Dahunsi", role: "Member" },
    ],
  },
  {
    name: "Technical Committee",
    members: [
      { name: "Mr. Ibukun Abioye", role: "Chair" },
      { name: "Mrs. Elizabeth Ogundipe", role: "Secretary" },
      { name: "Mr Evans George", role: "Member" },
      { name: "Mrs. Olufunmi Oladipo", role: "Member" },
      { name: "Mr. Thomas Falana", role: "Member" },
    ],
  },
  {
    name: "Logistics & Venue Committee",
    members: [
      { name: "Mr. Israel Adeyemi", role: "Chair" },
      { name: "Mr. Abuya", role: "Secretary" },
      { name: "Mr. John Omigbire", role: "Member" },
      { name: "Mr. Daodu", role: "Member" },
      { name: "Mr. Akinwale", role: "Member" },
    ],
  },
  {
    name: "Program Committee",
    members: [
      { name: "Mr. Adetoye Adedokun", role: "Chair" },
      { name: "Mr. Olakunle Adetunji", role: "Secretary" },
      { name: "Mr. Olukunle Oladipo", role: "Member" },
      { name: "Mrs. Grace Ajiboye", role: "Member" },
      { name: "Mr. Isaac Olaleye", role: "Member" },
      { name: "Prof. Olufade Onifade", role: "Member" },
      { name: "Prof. Bolanle Oladejo", role: "Member" },
      { name: "Dr. Angela Makolo", role: "Member" },
      { name: "Mr. Chibueze Okechukwu", role: "Member" },
    ],
  },
  {
    name: "Finance & Budget Committee",
    members: [
      { name: "Dr Nancy Woods", role: "Chair" },
      { name: "Dr. Angela Makolo", role: "Secretary" },
      { name: "Dr. Oludele Adeleke", role: "Member" },
      { name: "Mrs. Elizabeth Ogunseye", role: "Member" },
      { name: "Dr. Aderonke Sakpere", role: "Member" },
      { name: "Prof. Adesesan Adeyemo", role: "Member" },
    ],
  },
  {
    name: "Sponsorship & Partnership Committee",
    members: [
      { name: "Mrs. Temitope Awoniran", role: "Chair" },
      { name: "Mr. Adebayo Ayoade", role: "Secretary" },
      { name: "Mr. Thomas Falana", role: "Member" },
      { name: "Prof. Samuel Akinola", role: "Member" },
    ],
  },
  {
    name: "Publicity & Media Committee",
    members: [
      { name: "Ms. Peace Falola", role: "Chair" },
      { name: "Mr. Kayode Ekundayo", role: "Secretary" },
      { name: "Mr. Olawale Babalola", role: "Member" },
      { name: "Mr. Chibueze Okechukwu", role: "Member" },
      { name: "Mr. Okunlola", role: "Member" },
    ],
  },
  {
    name: "Protocol & VIP Committee",
    members: [
      { name: "Prof. Adebola Ojo", role: "Chair" },
      { name: "Mrs. Adedoyin Amoo-Onidundu", role: "Secretary" },
      { name: "Prof. Ibiyinka Ayorinde", role: "Member" },
      { name: "Dr. Nancy Woods", role: "Member" },
      { name: "Dr. Angela Makolo", role: "Member" },
      { name: "Dr. Aderonke Sakpere", role: "Member" },
    ],
  },
  {
    name: "Exhibition & Industry Engagement Committee",
    members: [
      { name: "Mr. Oladimeji Abiola", role: "Chair" },
      { name: "Mr. Udoh", role: "Secretary" },
      { name: "Mr. Isaac Olaleye", role: "Member" },
      { name: "Mr. Samuel Titiloye", role: "Member" },
      { name: "Ms. Ogunsola", role: "Member" },
    ],
  },
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const groupByRole = (members) =>
  ROLE_GROUPS.map(({ role, label }) => ({
    role,
    label,
    people: members.filter((m) => m.role === role),
  })).filter((g) => g.people.length > 0);

export default function Committees() {
  const { hash } = useLocation();

  useEffect(() => {
    const target = hash.replace("#", "");
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  return (
    <>
      <CommonHero
        title="Committees"
        info="The teams shaping ICFC — from editorial review and ethics to logistics, publicity and protocol."
        bg="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
      />

      <section className={styles.Page}>
        <header className={styles.Head}>
          <span className={styles.Eyebrow}>Organising Structure</span>
          <h2 className={styles.Title}>Committees &amp; Leadership</h2>
          <p className={styles.Lede}>
            The Local Organising Committee (LOC) leads all conference committees.
            Members are grouped by rank — Chair, Secretary, then Members.
          </p>
        </header>

        <section className={styles.LocLeadership} aria-label="LOC leadership">
          <h3 className={styles.LocTitle}>Local Organising Committee (LOC)</h3>
          <ul className={styles.LocList}>
            <li>
              <span className={styles.LocRole}>Chair</span>
              <span className={styles.LocName}>Dr. Angela Makolo</span>
            </li>
            <li>
              <span className={styles.LocRole}>Co-Chair</span>
              <span className={styles.LocName}>Dr. Babatunde I. Ayinla</span>
            </li>
          </ul>
        </section>

        <nav className={styles.Quicknav} aria-label="Jump to committee">
          {committees.map((c, i) => (
            <a key={c.name} href={`#${slugify(c.name)}`}>
              <span className={styles.QuicknavIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.QuicknavLabel}>{c.name}</span>
            </a>
          ))}
        </nav>

        <ol className={styles.CommitteeList}>
          {committees.map((c, i) => {
            const groups = groupByRole(c.members);
            return (
              <li
                id={slugify(c.name)}
                key={c.name}
                className={styles.Committee}
              >
                <header className={styles.CommitteeHead}>
                  <span className={styles.CommitteeIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.CommitteeRule} aria-hidden="true" />
                  <h3 className={styles.CommitteeName}>{c.name}</h3>
                </header>

                <div className={styles.CommitteeBody}>
                  {groups.map((g) => (
                    <div key={g.role} className={styles.RoleGroup}>
                      <h4
                        className={`${styles.RoleGroupTitle} ${
                          g.role === "Chair"
                            ? styles.RoleChair
                            : g.role === "Secretary"
                              ? styles.RoleSecretary
                              : styles.RoleMember
                        }`}
                      >
                        {g.label}
                      </h4>
                      <ul className={styles.RoleGroupList}>
                        {g.people.map((m) => (
                          <li key={`${m.name}-${m.role}`}>{m.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
