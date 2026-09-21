// Product pages. One template (ProductPage) renders both from this data.
// Facts are sourced from each product's repo docs; do not invent numbers.

export type Shot = { base: string; alt: string; width: number; height: number };

export type Product = {
  id: "sms" | "bms";
  name: string;
  kicker: string;
  hero: { headline: string; lead: string; shot: Shot };
  moments: { title: string; body: string; shot: Shot }[];
  modules: { title: string; items: string[] }[];
  delivery: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta: { headline: string; body: string };
};

export const products: Record<Product["id"], Product> = {
  sms: {
    id: "sms",
    name: "Asyyl SMS",
    kicker: "School management, offline",
    hero: {
      headline: "The whole school office. One computer.",
      lead:
        "Students, fees, results, report sheets, payroll. Installed on your own PC, working with no internet, printing on the printer you already have.",
      shot: { base: "/screens/sms/dashboard", alt: "Asyyl SMS dashboard", width: 1440, height: 900 },
    },
    moments: [
      {
        title: "Find any student in a second.",
        body: "Type a name or admission number. Search covers 1,120 students without a pause.",
        shot: { base: "/screens/sms/search", alt: "Student directory search finding Habibu in a second", width: 1440, height: 900 },
      },
      {
        title: "A receipt the parent trusts.",
        body: "A5 for the file, 80mm thermal for the counter. Numbered, signed, with a real naira sign.",
        shot: { base: "/screens/sms/receipt-a5", alt: "A5 school fee receipt", width: 700, height: 993 },
      },
      {
        title: "Report sheets that fit 14 subjects on one A4.",
        body: "Watermarked DRAFT until every subject is approved. Then issued, once, correctly.",
        shot: { base: "/screens/sms/report-sheet", alt: "Approved student report sheet", width: 1440, height: 900 },
      },
      {
        title: "Promotion you can review before it happens.",
        body: "Preview the whole class, mark exceptions, confirm. Restore if a mistake slips through.",
        shot: { base: "/screens/sms/promotion", alt: "Class promotion preview for Primary 6 into JSS 1", width: 1440, height: 900 },
      },
    ],
    modules: [
      { title: "School office", items: ["Students, guardians, sections and classes", "Sessions and terms", "Excel import with preview before anything is saved", "Templates built from your own class and subject lists"] },
      { title: "Academics", items: ["Exam setup: score limits, grade scale, comments", "Manual entry or Excel result upload", "Per-subject approval before a sheet is issued", "Report sheets as A4 PDF", "Class promotion with preview and exceptions", "WAEC and NECO payments"] },
      { title: "Fees and finance", items: ["Per-class term charges, scholarships, exemptions", "School fees, PTA, WAEC/NECO, other income", "A5 and 80mm thermal receipts", "Student statements and outstanding balances", "Expenses and daily close: a sealed day blocks new payments", "Finance-only mode for a separate bursary"] },
      { title: "HRM", items: ["Employees and staff groups", "Payroll posted straight to finance", "Loans and advances with schedules"] },
      { title: "Control", items: ["Users and roles: the exam officer cannot see finance", "School identity: crest, signature, accent colour", "Modules on or off", "Backup and restore", "Dark mode, phone and tablet layouts"] },
    ],
    delivery: [
      { title: "One installer", body: "A single Windows file installs and upgrades in place. Your records live outside the program folder and survive every update." },
      { title: "No internet", body: "Everything runs on the computer in your office. The browser opens to the app on its own." },
      { title: "One computer or a whole office", body: "Run it on one PC, or host it on one and let the bursary and exam office connect over the school LAN." },
      { title: "Licensed to your machine", body: "Send me the Installation ID from the activation screen. I send back your licence file. That is the whole process." },
    ],
    faq: [
      { q: "Does it need internet?", a: "No. It installs on your computer and works with none. Nothing about your school leaves the building." },
      { q: "What about the records we already have in Excel?", a: "They come in through an import with a preview. You see exactly what will be saved before it is saved. The import templates are built from your own class and subject lists." },
      { q: "Can several offices use it at once?", a: "Yes. One PC hosts, the others connect over the school network. Or run separate offices with printed handoffs if there is no network." },
      { q: "Which printers work?", a: "Any printer for A4 report sheets and A5 receipts. Any 80mm thermal printer for counter receipts." },
      { q: "What computer do we need?", a: "A Windows 10 or 11 PC, 64-bit. No admin rights, no Java, no setup beyond the installer." },
      { q: "What happens to our data if the computer dies?", a: "Backups are one click from the maintenance panel and restore is the same. I show your admin how to keep a copy on a USB drive during training." },
      { q: "How is it licensed?", a: "One licence per computer, bound to that machine. There is no subscription that can lapse." },
    ],
    cta: { headline: "See it on your own school's data.", body: "Send me one term's Excel sheets and I will show you the school running before you decide." },
  },

  bms: {
    id: "bms",
    name: "Asyyl BMS",
    kicker: "Point of sale and accounting, offline",
    hero: {
      headline: "A shop system whose books balance.",
      lead:
        "Sales, stock, customers and a full double-entry ledger in one offline installer. Built for pharmacies, agrovets and shops that close the day properly.",
      shot: { base: "/screens/bms/dashboard-light", alt: "Asyyl BMS dashboard", width: 1440, height: 900 },
    },
    moments: [
      {
        title: "The ledger reconciles. Every day. To the naira.",
        body: "Six months of simulated trading, 376 invoices: debits equalled credits at ₦427,763,462.00 across 4,275 entries. Not once off. Every month.",
        shot: { base: "/screens/bms/ledger-light", alt: "Main ledger with daily cash, transfer, POS and purchase columns", width: 1440, height: 900 },
      },
      {
        title: "Sell in three taps. Print, or send by WhatsApp.",
        body: "Cash, transfer, POS, or split. Walk-in or customer account. Thermal receipt, or a receipt sent to the customer's phone.",
        shot: { base: "/screens/bms/pos-cart-light", alt: "New sale with a cart of items", width: 1440, height: 900 },
      },
      {
        title: "Trial balance with the verdict first.",
        body: "Balanced or not, in the first line. Then the detail.",
        shot: { base: "/screens/bms/trial-balance-light", alt: "Trial balance page", width: 1440, height: 900 },
      },
      {
        title: "Backed up at 22:00 every night. Verified.",
        body: "If the PC was off, it catches up on the next launch. Copy to USB is one button.",
        shot: { base: "/screens/bms/products-light", alt: "Products list with a low-stock item", width: 1440, height: 900 },
      },
    ],
    modules: [
      { title: "Sales", items: ["Cash, transfer, POS and split payments", "Walk-in or customer account", "Discounts, returns, void with reason", "Thermal receipt and WhatsApp share"] },
      { title: "Inventory", items: ["Cost, price, reorder level, expiry, batch, NAFDAC number", "Restock and purchase records", "Low-stock alerts the moment they happen", "Excel import, products PDF", "Credit and debit notes, returns to supplier"] },
      { title: "Customers", items: ["Accounts, deposits and payments", "Statements and debtors list", "Opening balances from Excel"] },
      { title: "Accounting", items: ["Main ledger: daily cash, transfer, POS, purchases", "Monthly summaries, gross and net profit", "Double-entry trial balance", "Expenses, suspense for unidentified payments", "Supplier payables"] },
      { title: "Staff and control", items: ["Staff records, loans and advances, salaries with deductions", "Users, roles and permissions", "Reports to PDF and Excel", "Developer panel: backup now, copy to USB, verify backup, ledger rebuild"] },
    ],
    delivery: [
      { title: "One installer, 155 MB", body: "Installs and updates from the same file. No admin rights, no Java, no internet." },
      { title: "Install day, done properly", body: "Business details, your admin password, the first backup, and a printed recovery sheet you keep in the drawer." },
      { title: "Your shop stays yours", body: "The vendor account is claimed on install day and cannot be locked out. Your data lives on your computer." },
      { title: "Licensed to your machine", body: "One licence per PC. Send the Installation ID, receive the licence file." },
    ],
    faq: [
      { q: "Does it need internet?", a: "No. Everything runs on the shop computer. Email and WhatsApp receipts use the internet only when you choose to send one." },
      { q: "We already have stock in Excel.", a: "Import it with a preview. Opening balances for customers come in the same way." },
      { q: "Can it run on more than one till?", a: "Today it runs on one computer per shop. Multi-PC LAN mode is in testing with a client in Kaduna." },
      { q: "What if the PC is off for a month?", a: "The ledger catches up with no day limit, and the missed backups run on the next launch." },
      { q: "What computer do we need?", a: "Windows 10 or 11, 64-bit. A thermal printer if you want counter receipts." },
      { q: "How is it licensed?", a: "One licence per computer, bound to that machine. No subscription." },
    ],
    cta: { headline: "Bring one month of your books.", body: "I will enter a week of it in front of you and show the ledger balance. Then you decide." },
  },
};
