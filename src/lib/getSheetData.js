export async function getSheetData(){
  const res = await fetch("https://docs.google.com/spreadsheets/d/1gf2X-nJdPQhrXKc_BxzP-qU1EVGyjL0h31eCaYWKIM8/gviz/tq?tqx=out:json");
  const text = await res.text();

  const json = JSON.parse(text.substring(47).slice(0, -2));

  return json.table.rows.map((row, index) => {
    const rawDate = row.c[0]?.f || "";
    const date = rawDate.slice(0, 16);

    const month = rawDate.slice(0, 7);

    return {
      slug: `diary${index + 1}`,
      date,
      month,
      title: row.c[1]?.v,
      body: row.c[2]?.v,
      emoji: row.c[3]?.v,
    };
  });
}

const data = await getSheetData();

const groupedData = {};

data.forEach(entry => {
  if (!groupedData[entry.month]) {
    groupedData[entry.month] = [];
  }

  groupedData[entry.month].push(entry);
});