// Named clients. Owner confirmed permission to name BMS clients (2026-09-21).
// Entries marked confirm:true must be checked by Shuaibu before launch:
// exact spelling, city, and that the client agreed to be named.

export type Client = {
  name: string;
  type: string;
  city: string;
  product: "Asyyl SMS" | "Asyyl BMS" | "Custom";
  confirm?: boolean;
};

export const clients: Client[] = [
  { name: "AFNAN I.B Medicare", type: "Pharmacy", city: "Kano", product: "Asyyl BMS" },
  { name: "A.H.A Pharma Company Ltd", type: "Pharmacy", city: "Bwari, Abuja", product: "Asyyl BMS" },
  { name: "A.H.A Agrovet & Co. Ltd", type: "Agrovet", city: "Bwari, Abuja", product: "Asyyl BMS" },
  { name: "A.H.A Agrochemical", type: "Agrochemicals", city: "Bwari, Abuja", product: "Asyyl BMS" },
  { name: "Marvet Pharma Co. Nig. Ltd", type: "Animal and poultry pharmacy", city: "Kano", product: "Asyyl BMS" },
  // SMS schools, confirmed by Shuaibu on 2026-09-21.
  { name: "Late Yusuf Memorial School", type: "School", city: "Kano", product: "Asyyl SMS" },
  { name: "Danfodio College", type: "School", city: "Kaduna", product: "Asyyl SMS" },
  { name: "Attarbiyah Community School", type: "School", city: "Kano", product: "Asyyl SMS" },
  { name: "Sa'adatu Memorial School", type: "School", city: "Kano", product: "Asyyl SMS" },
  { name: "Jamo College of Health Science and Technology", type: "College", city: "Gezawa, Kano", product: "Custom" },
];

export const clientSummary = {
  headline: "Five businesses in Kano and Abuja run their tills and ledgers on Asyyl BMS. Four schools in Kano and Kaduna run their bursary and results on Asyyl SMS.",
};
