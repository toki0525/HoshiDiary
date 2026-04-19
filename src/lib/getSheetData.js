export async function getSheetData(){
  const res = await fetch("https://docs.google.com/spreadsheets/d/1gf2X-nJdPQhrXKc_BxzP-qU1EVGyjL0h31eCaYWKIM8/gviz/tq?tqx=out:json");
  const text = await res.text();

  const json = JSON.parse(text.substring(47).slice(0, -2));

  return json.table.rows.map((row, index) => {
    return {
      slug: `diary${index + 1}`,
      date: (row.c[0]?.f || "").slice(0, 16),
      title: row.c[1]?.v,
      body: row.c[2]?.v,
      emoji: row.c[3]?.v,
    };
  });
}