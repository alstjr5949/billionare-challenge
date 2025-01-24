import styles from "@/app/styles/person.module.css";

async function getPerson(id: string) {
  const res = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  );
  const data = await res.json();
  return data;
}

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number; // Optional, as not all assets have this field
}

interface Person {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const person: Person = await getPerson((await params).id);

  return (
    <div className={styles.personContainer}>
      <section className={styles.personHeader}>
        <img
          className={styles.personImage}
          src={person.squareImage}
          alt={person.name}
        />
        <div className={styles.personInfo}>
          <h1 className={styles.personName}>{person.name}</h1>
          <p className={styles.personNetWorth}>
            {`$${person.netWorth.toFixed(0).toLocaleString()} Million`}
          </p>
        </div>
      </section>
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Person Info</h2>
        <p className={styles.personInfoItem}>{`Country: ${person.country}`}</p>
        <p className={styles.personInfoItem}>{`City: ${person.city}`}</p>
        <p className={styles.personInfoItem}>{`State: ${person.state}`}</p>
      </section>
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Financial Assets</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2">Company</th>
              <th className="pb-2">Shares</th>
              <th className="pb-2">Current Price</th>
              <th className="pb-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {person.financialAssets.map((asset, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">{asset.companyName}</td>
                <td className="py-2">
                  {asset.numberOfShares.toLocaleString()}
                </td>
                <td className="py-2">${asset.sharePrice.toFixed(2)}</td>
                <td className="py-2">
                  $
                  {(
                    (asset.numberOfShares * asset.sharePrice) /
                    1000000
                  ).toFixed(2)}
                  M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Bio</h2>
        <div className={styles.bioContainer}>
          {person.bio.map((line, index) => (
            <p key={index} className={styles.bioLine}>
              {line}
            </p>
          ))}
        </div>
      </section>
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Additional Info</h2>
        <ul className={styles.additionalInfoContainer}>
          {person.about.map((line, index) => (
            <li key={index} className={styles.additionalInfoLine}>
              {line}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
