import Link from "next/link";
import styles from "./styles/home.module.css";

export const metadata = {
  title: "Billions",
  description: "Billions",
};

interface Person {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

async function getPersons() {
  const res = await fetch("https://billions-api.nomadcoders.workers.dev/");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const persons = await getPersons();

  return (
    <div>
      <ul className={styles.personList}>
        {persons.map((person: Person, index: number) => (
          <li key={person.id} className={styles.personCard}>
            <div className={styles.personRank}>{index + 1}</div>
            <Link href={`/person/${person.id}`}>
              <div className={styles.personImage}>
                <img src={person.squareImage} alt={person.name} />
              </div>
              <div className={styles.personName}>
                <h2>{person.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
