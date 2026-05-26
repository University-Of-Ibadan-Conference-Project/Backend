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
      { name: "Dr Ayinla", role: "Chair" },
      { name: "Mr Olaleye", role: "Secretary" },
      { name: "Prof Akinkunmi", role: "Member" },
      { name: "Prof Akinola", role: "Member" },
      { name: "Dr Asoro", role: "Member" },
      { name: "Ms Akintola", role: "Member" },
    ],
  },
  {
    name: "Research Ethics & Advisory Committee",
    members: [
      { name: "Prof. Daramola", role: "Chair" },
      { name: "Mr. Obakunle", role: "Secretary" },
      { name: "Prof. Akinkunmi", role: "Member" },
      { name: "Prof. Osunade", role: "Member" },
      { name: "Prof Onifade", role: "Member" },
    ],
  },
  {
    name: "Welfare, Registration, Awards & Certification Committee",
    members: [
      { name: "Mrs Ogunseye", role: "Chair" },
      { name: "Mr. Fawale", role: "Secretary" },
      { name: "Mr. Ayetyoma", role: "Member" },
      { name: "Dr. Idyorough", role: "Member" },
      { name: "Mrs. Amoo-Onidundu", role: "Member" },
      { name: "Ms. Dahunsi", role: "Member" },
    ],
  },
  {
    name: "Technical Committee",
    members: [
      { name: "Mr. Abioye", role: "Chair" },
      { name: "Mrs. Ogundipe", role: "Secretary" },
      { name: "Mr E. A. George", role: "Member" },
      { name: "Mrs. Oladipo", role: "Member" },
      { name: "Mr. Falana", role: "Member" },
    ],
  },
  {
    name: "Logistics & Venue Committee",
    members: [
      { name: "Mr. Adeyemi", role: "Chair" },
      { name: "Mr. Abuya", role: "Secretary" },
      { name: "Mr. Omigbire", role: "Member" },
      { name: "Mr. Daodu", role: "Member" },
      { name: "Mr Akinwale", role: "Member" },
    ],
  },
  {
    name: "Program Committee",
    members: [
      { name: "Mr. Adedokun", role: "Chair" },
      { name: "Mr. Adetunji", role: "Secretary" },
      { name: "Mr. Oladipo", role: "Member" },
      { name: "Mrs. Ajiboye", role: "Member" },
      { name: "Mr. Olaleye", role: "Member" },
      { name: "Prof. Onifade", role: "Member" },
    ],
  },
  {
    name: "Finance & Budget Committee",
    members: [
      { name: "Dr Woods", role: "Chair" },
      { name: "Dr. Makolo", role: "Secretary" },
      { name: "Dr Adeleke", role: "Member" },
      { name: "Mrs Ogunseye", role: "Member" },
      { name: "Dr Sakpere", role: "Member" },
      { name: "Prof. Adeyemo", role: "Member" },
    ],
  },
  {
    name: "Sponsorship & Partnership Committee",
    members: [
      { name: "Mrs. Awoniran", role: "Chair" },
      { name: "Mr. Ayoade", role: "Secretary" },
      { name: "Mr. Falana", role: "Member" },
      { name: "Prof. Akinola", role: "Member" },
    ],
  },
  {
    name: "Publicity & Media Committee",
    members: [
      { name: "Ms. Falola", role: "Chair" },
      { name: "Mr. Ekundayo", role: "Secretary" },
      { name: "Mr. Babalola", role: "Member" },
      { name: "Mr. Okechukwu", role: "Member" },
      { name: "Mr Okunlola", role: "Member" },
    ],
  },
  {
    name: "Protocol & VIP Committee",
    members: [
      { name: "Prof. Ojo", role: "Chair" },
      { name: "Dr. Sakpere", role: "Secretary" },
      { name: "Prof. Ayorinde", role: "Member" },
      { name: "Dr. Woods", role: "Member" },
      { name: "Dr. Makolo", role: "Member" },
    ],
  },
  {
    name: "Exhibition & Industry Engagement Committee",
    members: [
      { name: "Mr. Abiola", role: "Chair" },
      { name: "Mr. Udoh", role: "Secretary" },
      { name: "Mr. Olaleye", role: "Member" },
      { name: "Mr. Titiloye", role: "Member" },
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
            Eleven committees coordinate the conference. Members are grouped by
            rank — Chair, Secretary, then Members.
          </p>
        </header>

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
