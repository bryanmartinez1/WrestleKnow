/*
Home Page that will display
    - On this Day Panel
    - Show the 3 Hottest Posts of the Last 7 Days
    - The 2 most Popular Posts of All Time
    - 5 recommended wrestlers, companies, titles, and factions
        - Will be recommened on based on each categories most popular/checked on figures of the last 30 days
    - Smaller News Panel displaying the biggest News of wrestling of the month
*/
export default function Home() {
  let youtube = "https://www.youtube.com/embed/";
  let vidID = "FYCCs4cpKqw";
  return (
    <div className="page">
      <iframe width="500" height="300" src={youtube + vidID} />
    </div>
  );
}
