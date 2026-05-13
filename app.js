const today = new Date().toISOString().split('T')[0];
const defaultLoanPackages = [
  { name: 'Paket 1', amount: '$500', monthly: '$200', duration: '3 bulan', margin: '15%' },
  { name: 'Paket 2', amount: '$1,000', monthly: '$350', duration: '3 bulan', margin: '14%' },
  { name: 'Paket 3', amount: '$1,500', monthly: '$550', duration: '3 bulan', margin: '13%' },
  { name: 'Paket 4', amount: '$2,000', monthly: '$750', duration: '3 bulan', margin: '12.5%' },
  { name: 'Paket 5', amount: '$5,000 ke atas', monthly: '$1,000', duration: '3 bulan', margin: '10%' }
];

const currentPage = location.pathname.split('/').pop() || 'index.html';
const isLoginPage = currentPage === 'login.html';
const currentUser = localStorage.getItem('currentUser');

if (!isLoginPage && !currentUser) {
  window.location.href = 'login.html';
}

if (isLoginPage && currentUser) {
  window.location.href = 'index.html';
}

const loanDateInput = document.getElementById('loanDate');
if (loanDateInput) loanDateInput.value = today;
const appraisalDateInput = document.getElementById('appraisalDate');
if (appraisalDateInput) appraisalDateInput.value = today;
const createdByInput = document.getElementById('createdBy');
if (createdByInput) createdByInput.value = currentUser || '';
const appraiserInput = document.getElementById('appraiser');
if (appraiserInput) appraiserInput.value = currentUser || '';
syncDueDate();
loadSettings();
populateLoanPackageSelect();

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 860px)').matches) {
      document.getElementById('sidebar')?.classList.remove('show');
    }
  });
});

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('show');
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('loginUser')?.value.trim();
  if (!username) {
    showToast('Isi email atau username terlebih dahulu.');
    return;
  }

  localStorage.setItem('currentUser', username);
  showToast('Login berhasil.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

function logout(event) {
  event?.preventDefault();
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function openModal() {
  const loanForm = document.getElementById('loanForm');
  if (loanForm) {
    loanForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('clientName')?.focus();
    return;
  }

  window.location.href = 'index.html#loanForm';
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('show');
  document.getElementById('clientName')?.focus();
}

function syncDueDate() {
  const loanDate = document.getElementById('loanDate');
  const dueDate = document.getElementById('dueDate');
  const duration = Number(document.getElementById('duration')?.value) || 3;
  if (!loanDate || !dueDate || !loanDate.value) return;

  const date = new Date(loanDate.value);
  date.setMonth(date.getMonth() + duration);
  dueDate.value = date.toISOString().split('T')[0];
}

function calculateLoan() {
  const amount = Number(document.getElementById('loanAmount')?.value) || 0;
  const margin = Number(document.getElementById('margin')?.value) || 0;
  const duration = Number(document.getElementById('duration')?.value) || 3;
  const total = amount * (1 + margin / 100);
  const monthly = duration > 0 ? total / duration : 0;
  const monthlyPayment = document.getElementById('monthlyPayment');
  const totalPayable = document.getElementById('totalPayable');
  if (monthlyPayment) monthlyPayment.textContent = `$${monthly.toFixed(2)}`;
  if (totalPayable) totalPayable.textContent = `$${total.toFixed(2)}`;
  syncDueDate();
  return monthly;
}

function parseMoney(value) {
  const match = String(value || '').replaceAll(',', '').match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function parseDuration(value) {
  const match = String(value || '').match(/\d+/);
  return match ? Number(match[0]) : 3;
}

function parsePercent(value) {
  const match = String(value || '').match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function getStoredLoanPackages() {
  const saved = localStorage.getItem('loanPackages');
  if (!saved) return defaultLoanPackages;

  try {
    const packages = JSON.parse(saved);
    return Array.isArray(packages) && packages.length ? packages : defaultLoanPackages;
  } catch {
    localStorage.removeItem('loanPackages');
    return defaultLoanPackages;
  }
}

function getSelectedLoanPackage() {
  const select = document.getElementById('loanPackage');
  if (!select || !select.value) return null;
  return getStoredLoanPackages()[Number(select.value)] || null;
}

function populateLoanPackageSelect() {
  const select = document.getElementById('loanPackage');
  if (!select) return;

  const packages = getStoredLoanPackages();
  select.innerHTML = '<option value="">Pilih paket pinjaman</option>';
  packages.forEach((item, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${item.name} - ${item.amount} / ${item.duration} / ${item.margin}`;
    select.appendChild(option);
  });
}

function applyLoanPackage() {
  const select = document.getElementById('loanPackage');
  if (!select || !select.value) return;

  const selectedPackage = getStoredLoanPackages()[Number(select.value)];
  if (!selectedPackage) return;

  const loanAmount = document.getElementById('loanAmount');
  const margin = document.getElementById('margin');
  const duration = document.getElementById('duration');
  const monthlyPayment = document.getElementById('monthlyPayment');

  if (loanAmount) loanAmount.value = parseMoney(selectedPackage.amount);
  if (margin) margin.value = parsePercent(selectedPackage.margin);

  const packageDuration = parseDuration(selectedPackage.duration);
  if (duration) {
    const existingOption = [...duration.options].find(option => Number(option.value) === packageDuration);
    if (!existingOption) duration.add(new Option(`${packageDuration} bulan`, String(packageDuration)));
    duration.value = String(packageDuration);
  }

  if (monthlyPayment && selectedPackage.monthly) {
    monthlyPayment.textContent = `$${parseMoney(selectedPackage.monthly).toFixed(2)}`;
    const totalPayable = document.getElementById('totalPayable');
    const amount = parseMoney(selectedPackage.amount);
    const packageMargin = parsePercent(selectedPackage.margin);
    if (totalPayable) totalPayable.textContent = `$${(amount * (1 + packageMargin / 100)).toFixed(2)}`;
  } else {
    calculateLoan();
  }

  syncDueDate();
}

const defaultLoans = [
  {
    code: 'PN-2026-001',
    client: 'Jo\u00e3o Pereira',
    contact: '7721 4401',
    address: 'Bairo Pite',
    idNumber: 'BI-00123',
    identityType: 'BI',
    birthDate: '',
    gender: 'Pria',
    jobStatus: 'Karyawan',
    emergencyContact: '-',
    packageName: 'Paket 1',
    collateralType: 'Motor',
    collateralName: 'Honda Beat 2022',
    appraisalValue: 900,
    condition: 'Baik',
    documentNumber: 'STNK-7788',
    storageLocation: 'Brankas Utama',
    appraiser: 'Staff',
    appraisalDate: '2026-05-13',
    collateralPhoto: '',
    loanDate: '2026-05-13',
    amount: 500,
    margin: 15,
    duration: 3,
    dueDate: '2026-08-13',
    monthlyPayment: 200,
    disbursementMethod: 'Tunai',
    disbursementStatus: 'Dicairkan',
    penaltyRate: 0,
    createdBy: 'Staff',
    note: '',
    status: 'Aktif'
  },
  {
    code: 'PN-2026-002',
    client: 'Maria Soares',
    contact: '7721 4402',
    address: 'Dom Aleixo',
    idNumber: 'BI-00124',
    identityType: 'BI',
    birthDate: '',
    gender: 'Wanita',
    jobStatus: 'Wirausaha',
    emergencyContact: '-',
    packageName: 'Paket 2',
    collateralType: 'Emas',
    collateralName: 'Emas 20 gram',
    appraisalValue: 1250,
    condition: 'Baik',
    documentNumber: '-',
    storageLocation: 'Brankas Utama',
    appraiser: 'Staff',
    appraisalDate: '2026-05-12',
    collateralPhoto: '',
    loanDate: '2026-05-12',
    amount: 1000,
    margin: 14,
    duration: 3,
    dueDate: '2026-08-12',
    monthlyPayment: 350,
    disbursementMethod: 'Tunai',
    disbursementStatus: 'Dicairkan',
    penaltyRate: 0,
    createdBy: 'Staff',
    note: '',
    status: 'Lunas'
  },
  {
    code: 'PN-2026-003',
    client: 'Carlos Ximenes',
    contact: '7721 4403',
    address: 'Comoro',
    idNumber: 'BI-00125',
    identityType: 'BI',
    birthDate: '',
    gender: 'Pria',
    jobStatus: 'Wirausaha',
    emergencyContact: '-',
    packageName: 'Paket 4',
    collateralType: 'Mobil',
    collateralName: 'Toyota Hilux',
    appraisalValue: 4500,
    condition: 'Baik',
    documentNumber: 'BPKB-4501',
    storageLocation: 'Gudang Aset',
    appraiser: 'Staff',
    appraisalDate: '2026-05-11',
    collateralPhoto: '',
    loanDate: '2026-05-11',
    amount: 2000,
    margin: 12.5,
    duration: 3,
    dueDate: '2026-08-11',
    monthlyPayment: 750,
    disbursementMethod: 'Tunai',
    disbursementStatus: 'Dicairkan',
    penaltyRate: 0,
    createdBy: 'Staff',
    note: '',
    status: 'Terlambat'
  },
  {
    code: 'PN-2026-004',
    client: 'Ana Martins',
    contact: '7721 4404',
    address: 'Bidau',
    idNumber: 'BI-00126',
    identityType: 'BI',
    birthDate: '',
    gender: 'Wanita',
    jobStatus: 'Karyawan',
    emergencyContact: '-',
    packageName: '',
    collateralType: 'Laptop',
    collateralName: 'Asus VivoBook',
    appraisalValue: 500,
    condition: 'Baik',
    documentNumber: '-',
    storageLocation: 'Brankas Utama',
    appraiser: 'Staff',
    appraisalDate: '2026-05-10',
    collateralPhoto: '',
    loanDate: '2026-05-10',
    amount: 300,
    margin: 15,
    duration: 3,
    dueDate: '2026-08-10',
    monthlyPayment: 115,
    disbursementMethod: 'Tunai',
    disbursementStatus: 'Proses',
    penaltyRate: 0,
    createdBy: 'Staff',
    note: '',
    status: 'Proses'
  }
];

const storageKeys = {
  loans: 'tempLoans',
  clients: 'tempClients',
  collaterals: 'tempCollaterals',
  payments: 'tempPayments',
  auctions: 'tempAuctions',
  cashIn: 'tempCashIn',
  cashOut: 'tempCashOut',
  contracts: 'tempContracts',
  users: 'tempUsers'
};

let currentSharePayload = null;

const defaultPayments = [
  {
    code: 'BY-001',
    loanCode: 'PN-2026-001',
    client: 'Jo\u00e3o Pereira',
    installmentNo: '1',
    paymentType: 'Cicilan',
    method: 'Tunai',
    paymentDate: '2026-06-13',
    amount: 200,
    penalty: 0,
    remainingBalance: 375,
    createdBy: 'Staff',
    status: 'Diterima'
  },
  {
    code: 'BY-002',
    loanCode: 'PN-2026-002',
    client: 'Maria Soares',
    installmentNo: '1',
    paymentType: 'Cicilan',
    method: 'Tunai',
    paymentDate: '2026-06-12',
    amount: 350,
    penalty: 0,
    remainingBalance: 790,
    createdBy: 'Staff',
    status: 'Diterima'
  }
];

const defaultAuctions = [
  {
    code: 'LG-001',
    loanCode: 'PN-2026-003',
    collateral: 'Toyota Hilux',
    openingPrice: 4000,
    auctionDate: '2026-08-20',
    status: 'Persiapan'
  }
];

const defaultCashIn = [
  {
    code: 'KM-001',
    source: 'Cicilan',
    category: 'Cicilan',
    method: 'Tunai',
    description: 'PN-2026-001 Jo\u00e3o Pereira',
    cashDate: '2026-06-13',
    amount: 200,
    createdBy: 'Staff',
    attachment: ''
  },
  {
    code: 'KM-002',
    source: 'Pelunasan',
    category: 'Pelunasan',
    method: 'Tunai',
    description: 'PN-2026-002 Maria Soares',
    cashDate: '2026-06-12',
    amount: 350,
    createdBy: 'Staff',
    attachment: ''
  }
];

const defaultUsers = [
  {
    name: 'Direktur',
    email: 'director@hireichiba.local',
    role: 'Direktur',
    accessArea: 'Semua modul',
    status: 'Aktif'
  },
  {
    name: 'Finance Staff',
    email: 'finance@hireichiba.local',
    role: 'Administrasi & Finance',
    accessArea: 'Pinjaman, Kas, Laporan',
    status: 'Aktif'
  }
];

function getLoans() {
  const saved = localStorage.getItem(storageKeys.loans);
  if (!saved) return [...defaultLoans];

  try {
    const loans = JSON.parse(saved);
    return Array.isArray(loans) ? loans : [...defaultLoans];
  } catch {
    localStorage.removeItem('tempLoans');
    return [...defaultLoans];
  }
}

function saveLoans(loans) {
  localStorage.setItem(storageKeys.loans, JSON.stringify(loans));
}

function cloneDefaults(defaults) {
  return JSON.parse(JSON.stringify(defaults));
}

function getRecords(key, defaults = []) {
  const saved = localStorage.getItem(key);
  if (!saved) return cloneDefaults(defaults);

  try {
    const records = JSON.parse(saved);
    return Array.isArray(records) ? records : cloneDefaults(defaults);
  } catch {
    localStorage.removeItem(key);
    return cloneDefaults(defaults);
  }
}

function saveRecords(key, records) {
  localStorage.setItem(key, JSON.stringify(records));
}

function money(value) {
  return `$${Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function getTotalPayable(loan) {
  const amount = Number(loan.amount || 0);
  const margin = Number(loan.margin || 0);
  const penalty = Number(loan.penaltyAmount || 0);
  return amount * (1 + margin / 100) + penalty;
}

function getPaymentsForLoan(loanCode) {
  return getRecords(storageKeys.payments, defaultPayments).filter(payment => payment.loanCode === loanCode);
}

function getPaidAmount(loanCode) {
  return getPaymentsForLoan(loanCode).reduce((sum, payment) => {
    return sum + Number(payment.amount || 0) + Number(payment.penalty || 0);
  }, 0);
}

function getRemainingBalance(loan) {
  if (loan.status === 'Lunas') return 0;
  return Math.max(getTotalPayable(loan) - getPaidAmount(loan.code), 0);
}

function getCurrentStaff() {
  return localStorage.getItem('currentUser') || 'Staff';
}

function statusBadge(status) {
  const normalized = String(status || '').toLowerCase();
  let className = 'badge-info';
  if (['aktif', 'selesai', 'ditandatangani', 'disimpan', 'diterima', 'lunas', 'ditebus'].includes(normalized)) className = 'badge-success';
  if (['proses', 'draft', 'persiapan', 'segera jatuh tempo', 'pending', 'verifikasi', 'tercatat'].includes(normalized)) className = 'badge-warning';
  if (['terlambat', 'lelang', 'ditolak', 'blacklist', 'nonaktif', 'proses lelang'].includes(normalized)) className = 'badge-danger';
  return `<span class="badge ${className}">${escapeHTML(status || 'Proses')}</span>`;
}

function renderRows(selector, rows) {
  const tableBody = document.querySelector(selector);
  if (!tableBody) return;
  tableBody.innerHTML = rows.join('');
}

function renderTemporaryDatabase() {
  const loans = getLoans();
  renderDashboardLoans(loans);
  renderLoanPage(loans);
  renderClientPage(loans);
  renderCollateralPage(loans);
  renderPaymentPage();
  renderDueDatePage(loans);
  renderAuctionPage();
  renderCashInPage();
  renderCashOutPage(loans);
  renderReportPage(loans);
  renderContractPage(loans);
  renderUserPage();
}

function renderDashboardLoans(loans) {
  renderRows('#loanTable', loans.map(loan => `
    <tr>
      <td>${escapeHTML(loan.code)}</td>
      <td>${escapeHTML(loan.client)}</td>
      <td>${escapeHTML(loan.collateralType)}</td>
      <td>${formatDate(loan.loanDate)}</td>
      <td>${money(loan.amount)}</td>
      <td>${money(getRemainingBalance(loan))}</td>
      <td>${formatDate(loan.dueDate)}</td>
      <td>${statusBadge(loan.status)}</td>
      <td><button class="btn btn-light" onclick="viewDetail('${escapeHTML(loan.code)}')">Detail</button></td>
    </tr>
  `));
}

function renderLoanPage(loans) {
  if (!location.pathname.endsWith('pinjaman.html')) return;
  renderRows('.data-table tbody', loans.map(loan => `
    <tr>
      <td>${escapeHTML(loan.code)}</td>
      <td>${escapeHTML(loan.client)}</td>
      <td>${money(loan.amount)}</td>
      <td>${money(loan.monthlyPayment)}</td>
      <td>${money(getTotalPayable(loan))}</td>
      <td>${money(getRemainingBalance(loan))}</td>
      <td>${formatDate(loan.dueDate)}</td>
      <td>${escapeHTML(loan.disbursementMethod || 'Tunai')}</td>
      <td>${statusBadge(loan.status)}</td>
    </tr>
  `));
}

function renderClientPage(loans) {
  if (!location.pathname.endsWith('klien.html')) return;
  const loanClients = loans.map(loan => ({
    name: loan.client,
    contact: loan.contact,
    address: loan.address,
    idNumber: loan.idNumber,
    identityType: loan.identityType,
    jobStatus: loan.jobStatus,
    emergencyContact: loan.emergencyContact,
    status: loan.status
  }));
  const clients = [...loanClients, ...getRecords(storageKeys.clients)];
  const uniqueClients = [...new Map(clients.map(client => [client.name, client])).values()];

  renderRows('.data-table tbody', uniqueClients.map(client => `
    <tr>
      <td>${escapeHTML(client.name)}</td>
      <td>${escapeHTML(client.contact || '-')}</td>
      <td>${escapeHTML(client.identityType || 'BI')} - ${escapeHTML(client.idNumber || '-')}</td>
      <td>${escapeHTML(client.jobStatus || '-')}</td>
      <td>${escapeHTML(client.emergencyContact || '-')}</td>
      <td>${statusBadge(client.status || 'Aktif')}</td>
    </tr>
  `));
}

function renderCollateralPage(loans) {
  if (!location.pathname.endsWith('jaminan.html')) return;
  const loanCollaterals = loans.map(loan => ({
    type: loan.collateralType,
    name: loan.collateralName,
    appraisalValue: loan.appraisalValue,
    condition: loan.condition,
    documentNumber: loan.documentNumber,
    storageLocation: loan.storageLocation,
    appraiser: loan.appraiser,
    appraisalDate: loan.appraisalDate,
    status: loan.status === 'Lunas' ? 'Ditebus' : loan.status === 'Terlambat' ? 'Proses Lelang' : 'Disimpan'
  }));
  const collaterals = [...loanCollaterals, ...getRecords(storageKeys.collaterals)];

  renderRows('.data-table tbody', collaterals.map(item => `
    <tr>
      <td>${escapeHTML(item.type)}</td>
      <td>${escapeHTML(item.name || '-')}</td>
      <td>${money(item.appraisalValue)}</td>
      <td>${escapeHTML(item.storageLocation || 'Brankas Utama')}</td>
      <td>${escapeHTML(item.appraiser || '-')}</td>
      <td>${formatDate(item.appraisalDate)}</td>
      <td>${statusBadge(item.status || 'Disimpan')}</td>
    </tr>
  `));
}

function renderPaymentPage() {
  if (!location.pathname.endsWith('pembayaran.html')) return;
  const payments = getRecords(storageKeys.payments, defaultPayments);

  renderRows('.data-table tbody', payments.map(payment => `
    <tr>
      <td>${escapeHTML(payment.code)}</td>
      <td>${escapeHTML(payment.loanCode)}</td>
      <td>${escapeHTML(payment.client)}</td>
      <td>${escapeHTML(payment.installmentNo || '-')}</td>
      <td>${escapeHTML(payment.paymentType || 'Cicilan')}</td>
      <td>${escapeHTML(payment.method || 'Tunai')}</td>
      <td>${formatDate(payment.paymentDate)}</td>
      <td>${money(payment.amount)}</td>
      <td>${money(payment.penalty)}</td>
      <td>${money(payment.remainingBalance)}</td>
      <td>${statusBadge(payment.status || 'Diterima')}</td>
    </tr>
  `));
}

function renderDueDatePage(loans) {
  if (!location.pathname.endsWith('jatuh-tempo.html')) return;
  const now = new Date(today);
  renderRows('.data-table tbody', loans.map(loan => {
    const due = new Date(loan.dueDate);
    const remainingDays = Math.ceil((due - now) / 86400000);
    const status = remainingDays < 0 ? 'Terlambat' : remainingDays <= 7 ? 'Segera Jatuh Tempo' : 'Aktif';
    return `
      <tr>
        <td>${escapeHTML(loan.code)}</td>
        <td>${escapeHTML(loan.client)}</td>
        <td>${formatDate(loan.dueDate)}</td>
        <td>${money(getRemainingBalance(loan))}</td>
        <td>${remainingDays}</td>
        <td>${statusBadge(status)}</td>
      </tr>
    `;
  }));
}

function renderCashOutPage(loans) {
  if (!location.pathname.endsWith('kas-keluar.html')) return;
  const loanCashOut = loans.map(loan => ({
    code: `KK-${loan.code.replace('PN-', '')}`,
    recipient: loan.client,
    purpose: `Pencairan pinjaman ${loan.code}`,
    cashDate: loan.loanDate,
    amount: loan.amount,
    category: 'Pencairan Pinjaman',
    method: loan.disbursementMethod || 'Tunai',
    createdBy: getCurrentStaff(),
    status: 'Selesai'
  }));
  const cashOut = [...loanCashOut, ...getRecords(storageKeys.cashOut)];

  renderRows('.data-table tbody', cashOut.map(item => `
    <tr>
      <td>${escapeHTML(item.code)}</td>
      <td>${escapeHTML(item.category || 'Operasional')}</td>
      <td>${escapeHTML(item.recipient)}</td>
      <td>${escapeHTML(item.purpose)}</td>
      <td>${escapeHTML(item.method || 'Tunai')}</td>
      <td>${formatDate(item.cashDate)}</td>
      <td>${money(item.amount)}</td>
      <td>${escapeHTML(item.createdBy || '-')}</td>
      <td>${statusBadge(item.status || 'Tercatat')}</td>
    </tr>
  `));
}

function renderContractPage(loans) {
  if (!location.pathname.endsWith('kontrak.html')) return;
  const loanContracts = loans.map(loan => ({
    contractNo: `KT-${loan.code.replace('PN-', '')}`,
    loanCode: loan.code,
    client: loan.client,
    contractDate: loan.loanDate,
    duration: `${Number(loan.duration || 0)} bulan`,
    amount: loan.amount,
    collateral: `${loan.collateralType} - ${loan.collateralName}`,
    dueDate: loan.dueDate,
    witness: loan.witness || '-',
    status: loan.status === 'Proses' ? 'Draft' : 'Ditandatangani'
  }));
  const contracts = [...loanContracts, ...getRecords(storageKeys.contracts)];

  renderRows('.data-table tbody', contracts.map(contract => `
    <tr>
      <td>${escapeHTML(contract.contractNo)}</td>
      <td>${escapeHTML(contract.loanCode)}</td>
      <td>${escapeHTML(contract.client)}</td>
      <td>${money(contract.amount)}</td>
      <td>${escapeHTML(contract.collateral || '-')}</td>
      <td>${formatDate(contract.dueDate || contract.contractDate)}</td>
      <td>${escapeHTML(contract.witness || '-')}</td>
      <td>${statusBadge(contract.status || 'Draft')}</td>
    </tr>
  `));
}

function renderAuctionPage() {
  if (!location.pathname.endsWith('lelang.html')) return;
  const auctions = getRecords(storageKeys.auctions, defaultAuctions);

  renderRows('.data-table tbody', auctions.map(auction => `
    <tr>
      <td>${escapeHTML(auction.code)}</td>
      <td>${escapeHTML(auction.loanCode)}</td>
      <td>${escapeHTML(auction.collateral)}</td>
      <td>${money(auction.openingPrice)}</td>
      <td>${formatDate(auction.auctionDate)}</td>
      <td>${statusBadge(auction.status || 'Persiapan')}</td>
    </tr>
  `));
}

function renderCashInPage() {
  if (!location.pathname.endsWith('kas-masuk.html')) return;
  const cashIn = getRecords(storageKeys.cashIn, defaultCashIn);

  renderRows('.data-table tbody', cashIn.map(item => `
    <tr>
      <td>${escapeHTML(item.code)}</td>
      <td>${escapeHTML(item.category || item.source || '-')}</td>
      <td>${escapeHTML(item.method || 'Tunai')}</td>
      <td>${escapeHTML(item.description)}</td>
      <td>${formatDate(item.cashDate)}</td>
      <td>${money(item.amount)}</td>
      <td>${escapeHTML(item.createdBy || '-')}</td>
    </tr>
  `));
}

function renderUserPage() {
  if (!location.pathname.endsWith('user-role.html')) return;
  const users = getRecords(storageKeys.users, defaultUsers);

  renderRows('.data-table tbody', users.map(user => `
    <tr>
      <td>${escapeHTML(user.name)}</td>
      <td>${escapeHTML(user.email)}</td>
      <td>${escapeHTML(user.role)}</td>
      <td>${escapeHTML(user.accessArea)}</td>
      <td>${statusBadge(user.status || 'Aktif')}</td>
    </tr>
  `));
}

function renderReportPage(loans) {
  if (!location.pathname.endsWith('laporan-keuangan.html')) return;

  const cashIn = getRecords(storageKeys.cashIn, defaultCashIn);
  const cashOut = [
    ...loans.map(loan => ({ amount: Number(loan.amount || 0) })),
    ...getRecords(storageKeys.cashOut)
  ];
  const totalCashIn = cashIn.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalCashOut = cashOut.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalMargin = loans.reduce((sum, loan) => sum + (Number(loan.amount || 0) * Number(loan.margin || 0) / 100), 0);
  const activeLoans = loans.filter(loan => !['Lunas', 'Ditolak'].includes(loan.status)).length;

  const reportCashIn = document.getElementById('reportCashIn');
  const reportCashOut = document.getElementById('reportCashOut');
  const reportMargin = document.getElementById('reportMargin');
  if (reportCashIn) reportCashIn.textContent = money(totalCashIn);
  if (reportCashOut) reportCashOut.textContent = money(totalCashOut);
  if (reportMargin) reportMargin.textContent = money(totalMargin);

  renderRows('#financialReportTable', [
    `<tr><td>Kas Masuk</td><td>${money(totalCashIn)}</td><td>Total pembayaran, pelunasan, margin, dan pendapatan lain.</td></tr>`,
    `<tr><td>Kas Keluar</td><td>${money(totalCashOut)}</td><td>Total pencairan pinjaman dan biaya operasional.</td></tr>`,
    `<tr><td>Estimasi Margin</td><td>${money(totalMargin)}</td><td>Potensi margin dari seluruh pinjaman tercatat.</td></tr>`,
    `<tr><td>Pinjaman Aktif</td><td>${activeLoans}</td><td>Kontrak yang masih berjalan atau dalam proses.</td></tr>`
  ]);
}

function nextCode(prefix, records) {
  const number = records.length + 1;
  return `${prefix}-${String(number).padStart(3, '0')}`;
}

function buildLoanOptions() {
  return getLoans().map(loan => `
    <option value="${escapeHTML(loan.code)}">${escapeHTML(loan.code)} - ${escapeHTML(loan.client)}</option>
  `).join('');
}

function getLoanByCode(code) {
  return getLoans().find(loan => loan.code === code);
}

function fillLoanData(loanCode, clientFieldId, collateralFieldId) {
  const loan = getLoanByCode(loanCode);
  if (!loan) return;

  const clientField = clientFieldId ? document.getElementById(clientFieldId) : null;
  const collateralField = collateralFieldId ? document.getElementById(collateralFieldId) : null;
  if (clientField) clientField.value = loan.client;
  if (collateralField) collateralField.value = loan.collateralName || loan.collateralType || '';
}

function fillPaymentLoanData(loanCode) {
  const loan = getLoanByCode(loanCode);
  if (!loan) return;

  const clientField = document.getElementById('paymentFormClient');
  const amountField = document.getElementById('paymentFormAmount');
  const remainingField = document.getElementById('paymentFormRemaining');
  if (clientField) clientField.value = loan.client;
  if (amountField && !amountField.value) amountField.value = Number(loan.monthlyPayment || 0).toFixed(2);
  if (remainingField) remainingField.value = getRemainingBalance(loan).toFixed(2);
}

function fillContractLoanData(loanCode) {
  const loan = getLoanByCode(loanCode);
  if (!loan) return;

  const clientField = document.getElementById('contractFormClient');
  const amountField = document.getElementById('contractFormAmount');
  const collateralField = document.getElementById('contractFormCollateral');
  const dueDateField = document.getElementById('contractFormDueDate');
  const marginField = document.getElementById('contractFormMargin');
  const durationField = document.getElementById('contractFormDuration');

  if (clientField) clientField.value = loan.client;
  if (amountField) amountField.value = Number(loan.amount || 0).toFixed(2);
  if (collateralField) collateralField.value = `${loan.collateralType} - ${loan.collateralName}`;
  if (dueDateField) dueDateField.value = loan.dueDate || '';
  if (marginField) marginField.value = Number(loan.margin || 0);
  if (durationField) durationField.value = `${Number(loan.duration || 0)} bulan`;
}

function openDataModal(title, subtitle, bodyHtml) {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = modalOverlay?.querySelector('.modal-header h3');
  const modalSubtitle = modalOverlay?.querySelector('.modal-header p');
  const modalBody = modalOverlay?.querySelector('.modal-body');

  if (!modalOverlay || !modalTitle || !modalBody) {
    showToast('Modal belum tersedia di halaman ini.');
    return;
  }

  modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = subtitle;
  modalBody.innerHTML = bodyHtml;
  modalOverlay.classList.add('show');
  modalBody.querySelector('input, select, textarea')?.focus();
}

function modalActions(primaryLabel) {
  return `
    <div class="action-buttons">
      <button type="button" class="btn btn-light" onclick="closeModal()">Batal</button>
      <button type="submit" class="btn btn-primary">${primaryLabel}</button>
    </div>
  `;
}

function buildRecordSummary(title, fields) {
  const lines = fields
    .filter(item => item.value !== undefined && item.value !== null && item.value !== '')
    .map(item => `${item.label}: ${item.value}`);
  return `${title}\n${lines.join('\n')}`;
}

function showShareOptions(title, summary, phone = '') {
  currentSharePayload = { title, summary, phone };
  openDataModal('Data Berhasil Disimpan', 'Pilih aksi lanjutan untuk arsip atau kirim ke klien.', `
    <div class="share-box">
      <label>Ringkasan Data</label>
      <textarea class="share-summary" readonly>${escapeHTML(summary)}</textarea>
      <div class="share-actions">
        <button type="button" class="btn btn-light" onclick="printSharedRecord()">Print</button>
        <button type="button" class="btn btn-light" onclick="emailSharedRecord()">Email</button>
        <button type="button" class="btn btn-primary" onclick="whatsappSharedRecord()">WhatsApp</button>
      </div>
    </div>
  `);
}

function getSharePayload() {
  if (!currentSharePayload) {
    showToast('Belum ada data untuk dikirim.');
    return null;
  }

  return currentSharePayload;
}

function printSharedRecord() {
  const payload = getSharePayload();
  if (!payload) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Browser memblokir popup print.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <title>${escapeHTML(payload.title)}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111827; padding: 32px; line-height: 1.6; }
        h1 { font-size: 20px; margin-bottom: 18px; }
        pre { white-space: pre-wrap; font-size: 14px; border: 1px solid #e5e7eb; padding: 18px; border-radius: 12px; }
      </style>
    </head>
    <body>
      <h1>${escapeHTML(payload.title)}</h1>
      <pre>${escapeHTML(payload.summary)}</pre>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function emailSharedRecord() {
  const payload = getSharePayload();
  if (!payload) return;

  const subject = encodeURIComponent(payload.title);
  const body = encodeURIComponent(payload.summary);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function normalizeWhatsappNumber(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('670')) return digits;
  if (digits.startsWith('0')) return `670${digits.slice(1)}`;
  if (digits.length <= 8) return `670${digits}`;
  return digits;
}

function whatsappSharedRecord() {
  const payload = getSharePayload();
  if (!payload) return;

  const text = encodeURIComponent(payload.summary);
  const phone = normalizeWhatsappNumber(payload.phone);
  const url = phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
  window.open(url, '_blank');
}

function openClientForm() {
  openDataModal('Tambah Klien', 'Input data klien baru untuk penhoria.', `
    <form class="form-panel" onsubmit="submitClient(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Nama Klien</label>
          <input type="text" id="clientFormName" required />
        </div>
        <div class="form-group">
          <label>Nomor Kontak</label>
          <input type="text" id="clientFormContact" required />
        </div>
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <input type="text" id="clientFormAddress" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Jenis Identitas</label>
          <select id="clientFormIdentityType">
            <option>BI</option>
            <option>Passport</option>
            <option>KTP</option>
            <option>Dokumen Lain</option>
          </select>
        </div>
        <div class="form-group">
          <label>No. Identitas</label>
          <input type="text" id="clientFormIdNumber" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tanggal Lahir</label>
          <input type="date" id="clientFormBirthDate" />
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select id="clientFormGender">
            <option>Pria</option>
            <option>Wanita</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Pekerjaan</label>
          <input type="text" id="clientFormJobStatus" placeholder="Karyawan, wirausaha, petani..." />
        </div>
        <div class="form-group">
          <label>Kontak Darurat</label>
          <input type="text" id="clientFormEmergency" placeholder="Nama / nomor keluarga" />
        </div>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="clientFormStatus">
          <option>Aktif</option>
          <option>Verifikasi</option>
          <option>Blacklist</option>
        </select>
      </div>
      ${modalActions('Simpan Klien')}
    </form>
  `);
}

function submitClient(event) {
  event.preventDefault();
  const clients = getRecords(storageKeys.clients);
  const client = {
    name: document.getElementById('clientFormName')?.value.trim(),
    contact: document.getElementById('clientFormContact')?.value.trim(),
    address: document.getElementById('clientFormAddress')?.value.trim(),
    identityType: document.getElementById('clientFormIdentityType')?.value,
    idNumber: document.getElementById('clientFormIdNumber')?.value.trim(),
    birthDate: document.getElementById('clientFormBirthDate')?.value,
    gender: document.getElementById('clientFormGender')?.value,
    jobStatus: document.getElementById('clientFormJobStatus')?.value.trim(),
    emergencyContact: document.getElementById('clientFormEmergency')?.value.trim(),
    status: document.getElementById('clientFormStatus')?.value || 'Aktif'
  };
  clients.unshift(client);

  saveRecords(storageKeys.clients, clients);
  renderTemporaryDatabase();
  showShareOptions(`Data Klien - ${client.name}`, buildRecordSummary('Data Klien', [
    { label: 'Nama Klien', value: client.name },
    { label: 'Kontak', value: client.contact },
    { label: 'Alamat', value: client.address },
    { label: 'Identitas', value: `${client.identityType} - ${client.idNumber}` },
    { label: 'Tanggal Lahir', value: formatDate(client.birthDate) },
    { label: 'Gender', value: client.gender },
    { label: 'Pekerjaan', value: client.jobStatus },
    { label: 'Kontak Darurat', value: client.emergencyContact },
    { label: 'Status', value: client.status }
  ]), client.contact);
}

function openCollateralForm() {
  openDataModal('Tambah Jaminan', 'Catat barang atau dokumen aset yang menjadi jaminan.', `
    <form class="form-panel" onsubmit="submitCollateral(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Jenis Jaminan</label>
          <select id="collateralFormType" required>
            <option value="">Pilih jenis</option>
            <option>Emas</option>
            <option>Motor</option>
            <option>Mobil</option>
            <option>Laptop</option>
            <option>Telepon</option>
            <option>Tanah</option>
            <option>Rumah</option>
            <option>Dokumen Aset</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nama Barang</label>
          <input type="text" id="collateralFormName" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nilai Taksiran</label>
          <input type="number" id="collateralFormValue" min="0" required />
        </div>
        <div class="form-group">
          <label>Kondisi</label>
          <select id="collateralFormCondition">
            <option>Baik</option>
            <option>Rusak ringan</option>
            <option>Rusak berat</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nomor Dokumen</label>
          <input type="text" id="collateralFormDocument" placeholder="STNK/BPKB/Sertifikat atau -" />
        </div>
        <div class="form-group">
          <label>Lokasi Penyimpanan</label>
          <input type="text" id="collateralFormStorage" value="Brankas Utama" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Penaksir</label>
          <input type="text" id="collateralFormAppraiser" value="${escapeHTML(getCurrentStaff())}" />
        </div>
        <div class="form-group">
          <label>Tanggal Taksir</label>
          <input type="date" id="collateralFormAppraisalDate" value="${today}" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Referensi Foto</label>
          <input type="text" id="collateralFormPhoto" placeholder="Nama file / URL foto barang" />
        </div>
        <div class="form-group">
          <label>Status Jaminan</label>
          <select id="collateralFormStatus">
            <option>Disimpan</option>
            <option>Ditebus</option>
            <option>Proses Lelang</option>
            <option>Dilelang</option>
          </select>
        </div>
      </div>
      ${modalActions('Simpan Jaminan')}
    </form>
  `);
}

function submitCollateral(event) {
  event.preventDefault();
  const collaterals = getRecords(storageKeys.collaterals);
  const collateral = {
    type: document.getElementById('collateralFormType')?.value,
    name: document.getElementById('collateralFormName')?.value.trim(),
    appraisalValue: Number(document.getElementById('collateralFormValue')?.value) || 0,
    condition: document.getElementById('collateralFormCondition')?.value,
    documentNumber: document.getElementById('collateralFormDocument')?.value.trim() || '-',
    storageLocation: document.getElementById('collateralFormStorage')?.value.trim(),
    appraiser: document.getElementById('collateralFormAppraiser')?.value.trim(),
    appraisalDate: document.getElementById('collateralFormAppraisalDate')?.value,
    photoReference: document.getElementById('collateralFormPhoto')?.value.trim(),
    status: document.getElementById('collateralFormStatus')?.value || 'Disimpan'
  };
  collaterals.unshift(collateral);

  saveRecords(storageKeys.collaterals, collaterals);
  renderTemporaryDatabase();
  showShareOptions(`Data Jaminan - ${collateral.name}`, buildRecordSummary('Data Jaminan', [
    { label: 'Jenis Jaminan', value: collateral.type },
    { label: 'Nama Barang', value: collateral.name },
    { label: 'Nilai Taksiran', value: money(collateral.appraisalValue) },
    { label: 'Kondisi', value: collateral.condition },
    { label: 'Nomor Dokumen', value: collateral.documentNumber },
    { label: 'Lokasi Penyimpanan', value: collateral.storageLocation },
    { label: 'Penaksir', value: collateral.appraiser },
    { label: 'Tanggal Taksir', value: formatDate(collateral.appraisalDate) },
    { label: 'Referensi Foto', value: collateral.photoReference },
    { label: 'Status', value: collateral.status }
  ]));
}

function openPaymentForm() {
  const payments = getRecords(storageKeys.payments, defaultPayments);
  openDataModal('Catat Pembayaran', 'Input cicilan, margin, atau pelunasan klien.', `
    <form class="form-panel" onsubmit="submitPayment(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Kode Bayar</label>
          <input type="text" id="paymentFormCode" value="${nextCode('BY', payments)}" required />
        </div>
        <div class="form-group">
          <label>Kode Pinjaman</label>
          <select id="paymentFormLoanCode" onchange="fillPaymentLoanData(this.value)" required>
            <option value="">Pilih pinjaman</option>
            ${buildLoanOptions()}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nama Klien</label>
          <input type="text" id="paymentFormClient" required />
        </div>
        <div class="form-group">
          <label>Angsuran Ke</label>
          <input type="number" id="paymentFormInstallment" min="1" value="1" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Jenis Pembayaran</label>
          <select id="paymentFormType">
            <option>Cicilan</option>
            <option>Margin</option>
            <option>Pelunasan</option>
            <option>Denda</option>
            <option>Biaya Administrasi</option>
          </select>
        </div>
        <div class="form-group">
          <label>Metode Bayar</label>
          <select id="paymentFormMethod">
            <option>Tunai</option>
            <option>Transfer Bank</option>
            <option>Mobile Banking</option>
            <option>POS</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tanggal Bayar</label>
          <input type="date" id="paymentFormDate" value="${today}" required />
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <input type="number" id="paymentFormAmount" min="1" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Denda</label>
          <input type="number" id="paymentFormPenalty" min="0" value="0" />
        </div>
        <div class="form-group">
          <label>Sisa Saldo Setelah Bayar</label>
          <input type="number" id="paymentFormRemaining" min="0" value="0" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Status</label>
          <select id="paymentFormStatus">
            <option>Diterima</option>
            <option>Pending</option>
            <option>Ditolak</option>
          </select>
        </div>
        <div class="form-group">
          <label>Petugas</label>
          <input type="text" id="paymentFormCreatedBy" value="${escapeHTML(getCurrentStaff())}" />
        </div>
      </div>
      ${modalActions('Simpan Pembayaran')}
    </form>
  `);
}

function submitPayment(event) {
  event.preventDefault();
  const payments = getRecords(storageKeys.payments, defaultPayments);
  const payment = {
    code: document.getElementById('paymentFormCode')?.value.trim(),
    loanCode: document.getElementById('paymentFormLoanCode')?.value,
    client: document.getElementById('paymentFormClient')?.value.trim(),
    installmentNo: document.getElementById('paymentFormInstallment')?.value,
    paymentType: document.getElementById('paymentFormType')?.value,
    method: document.getElementById('paymentFormMethod')?.value,
    paymentDate: document.getElementById('paymentFormDate')?.value,
    amount: Number(document.getElementById('paymentFormAmount')?.value) || 0,
    penalty: Number(document.getElementById('paymentFormPenalty')?.value) || 0,
    remainingBalance: Number(document.getElementById('paymentFormRemaining')?.value) || 0,
    createdBy: document.getElementById('paymentFormCreatedBy')?.value.trim(),
    status: document.getElementById('paymentFormStatus')?.value || 'Diterima'
  };
  payments.unshift(payment);
  saveRecords(storageKeys.payments, payments);

  const cashIn = getRecords(storageKeys.cashIn, defaultCashIn);
  cashIn.unshift({
    code: `KM-${payment.code.replace(/\D/g, '').padStart(3, '0')}`,
    source: 'Pembayaran',
    category: payment.paymentType,
    method: payment.method,
    description: `${payment.loanCode} ${payment.client}`,
    cashDate: payment.paymentDate,
    amount: payment.amount + payment.penalty,
    createdBy: payment.createdBy
  });
  saveRecords(storageKeys.cashIn, cashIn);

  renderTemporaryDatabase();
  const loan = getLoanByCode(payment.loanCode);
  showShareOptions(`Pembayaran - ${payment.code}`, buildRecordSummary('Catatan Pembayaran', [
    { label: 'Kode Bayar', value: payment.code },
    { label: 'Kode Pinjaman', value: payment.loanCode },
    { label: 'Nama Klien', value: payment.client },
    { label: 'Angsuran Ke', value: payment.installmentNo },
    { label: 'Jenis Pembayaran', value: payment.paymentType },
    { label: 'Metode Bayar', value: payment.method },
    { label: 'Tanggal Bayar', value: formatDate(payment.paymentDate) },
    { label: 'Jumlah', value: money(payment.amount) },
    { label: 'Denda', value: money(payment.penalty) },
    { label: 'Sisa Saldo', value: money(payment.remainingBalance) },
    { label: 'Petugas', value: payment.createdBy },
    { label: 'Status', value: payment.status }
  ]), loan?.contact || '');
}

function openAuctionForm() {
  const auctions = getRecords(storageKeys.auctions, defaultAuctions);
  openDataModal('Proses Lelang', 'Catat jaminan dari pinjaman macet yang akan dilelang.', `
    <form class="form-panel" onsubmit="submitAuction(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Kode Lelang</label>
          <input type="text" id="auctionFormCode" value="${nextCode('LG', auctions)}" required />
        </div>
        <div class="form-group">
          <label>Kode Pinjaman</label>
          <select id="auctionFormLoanCode" onchange="fillLoanData(this.value, null, 'auctionFormCollateral')" required>
            <option value="">Pilih pinjaman</option>
            ${buildLoanOptions()}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Jaminan</label>
          <input type="text" id="auctionFormCollateral" required />
        </div>
        <div class="form-group">
          <label>Harga Buka</label>
          <input type="number" id="auctionFormPrice" min="1" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tanggal Lelang</label>
          <input type="date" id="auctionFormDate" value="${today}" required />
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="auctionFormStatus">
            <option>Persiapan</option>
            <option>Berjalan</option>
            <option>Selesai</option>
            <option>Batal</option>
          </select>
        </div>
      </div>
      ${modalActions('Simpan Lelang')}
    </form>
  `);
}

function submitAuction(event) {
  event.preventDefault();
  const auctions = getRecords(storageKeys.auctions, defaultAuctions);
  const auction = {
    code: document.getElementById('auctionFormCode')?.value.trim(),
    loanCode: document.getElementById('auctionFormLoanCode')?.value,
    collateral: document.getElementById('auctionFormCollateral')?.value.trim(),
    openingPrice: Number(document.getElementById('auctionFormPrice')?.value) || 0,
    auctionDate: document.getElementById('auctionFormDate')?.value,
    status: document.getElementById('auctionFormStatus')?.value || 'Persiapan'
  };
  auctions.unshift(auction);

  saveRecords(storageKeys.auctions, auctions);
  renderTemporaryDatabase();
  showShareOptions(`Lelang - ${auction.code}`, buildRecordSummary('Proses Lelang', [
    { label: 'Kode Lelang', value: auction.code },
    { label: 'Kode Pinjaman', value: auction.loanCode },
    { label: 'Jaminan', value: auction.collateral },
    { label: 'Harga Buka', value: money(auction.openingPrice) },
    { label: 'Tanggal', value: formatDate(auction.auctionDate) },
    { label: 'Status', value: auction.status }
  ]));
}

function openCashInForm() {
  const cashIn = getRecords(storageKeys.cashIn, defaultCashIn);
  openDataModal('Catat Kas Masuk', 'Input pemasukan dari pembayaran, margin, atau biaya administrasi.', `
    <form class="form-panel" onsubmit="submitCashIn(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Kode</label>
          <input type="text" id="cashInFormCode" value="${nextCode('KM', cashIn)}" required />
        </div>
        <div class="form-group">
          <label>Kategori</label>
          <select id="cashInFormCategory">
            <option>Cicilan</option>
            <option>Pelunasan</option>
            <option>Margin</option>
            <option>Biaya Administrasi</option>
            <option>Hasil Lelang</option>
            <option>Lainnya</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Metode Kas</label>
          <select id="cashInFormMethod">
            <option>Tunai</option>
            <option>Transfer Bank</option>
            <option>Mobile Banking</option>
            <option>POS</option>
          </select>
        </div>
        <div class="form-group">
          <label>Petugas</label>
          <input type="text" id="cashInFormCreatedBy" value="${escapeHTML(getCurrentStaff())}" />
        </div>
      </div>
      <div class="form-group">
        <label>Keterangan</label>
        <input type="text" id="cashInFormDescription" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tanggal</label>
          <input type="date" id="cashInFormDate" value="${today}" required />
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <input type="number" id="cashInFormAmount" min="1" required />
        </div>
      </div>
      <div class="form-group">
        <label>Lampiran / Bukti</label>
        <input type="text" id="cashInFormAttachment" placeholder="Nomor bukti, nama file, atau URL" />
      </div>
      ${modalActions('Simpan Kas Masuk')}
    </form>
  `);
}

function submitCashIn(event) {
  event.preventDefault();
  const cashIn = getRecords(storageKeys.cashIn, defaultCashIn);
  const cashRecord = {
    code: document.getElementById('cashInFormCode')?.value.trim(),
    source: document.getElementById('cashInFormCategory')?.value,
    category: document.getElementById('cashInFormCategory')?.value,
    method: document.getElementById('cashInFormMethod')?.value,
    description: document.getElementById('cashInFormDescription')?.value.trim(),
    cashDate: document.getElementById('cashInFormDate')?.value,
    amount: Number(document.getElementById('cashInFormAmount')?.value) || 0,
    createdBy: document.getElementById('cashInFormCreatedBy')?.value.trim(),
    attachment: document.getElementById('cashInFormAttachment')?.value.trim()
  };
  cashIn.unshift(cashRecord);

  saveRecords(storageKeys.cashIn, cashIn);
  renderTemporaryDatabase();
  showShareOptions(`Kas Masuk - ${cashRecord.code}`, buildRecordSummary('Catatan Kas Masuk', [
    { label: 'Kode', value: cashRecord.code },
    { label: 'Kategori', value: cashRecord.category },
    { label: 'Metode', value: cashRecord.method },
    { label: 'Keterangan', value: cashRecord.description },
    { label: 'Tanggal', value: formatDate(cashRecord.cashDate) },
    { label: 'Jumlah', value: money(cashRecord.amount) },
    { label: 'Petugas', value: cashRecord.createdBy },
    { label: 'Lampiran', value: cashRecord.attachment }
  ]));
}

function openCashOutForm() {
  const cashOut = getRecords(storageKeys.cashOut);
  openDataModal('Catat Kas Keluar', 'Input pencairan dana atau biaya operasional.', `
    <form class="form-panel" onsubmit="submitCashOut(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Kode</label>
          <input type="text" id="cashOutFormCode" value="${nextCode('KK', cashOut)}" required />
        </div>
        <div class="form-group">
          <label>Penerima</label>
          <input type="text" id="cashOutFormRecipient" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Kategori</label>
          <select id="cashOutFormCategory">
            <option>Pencairan Pinjaman</option>
            <option>Operasional Kantor</option>
            <option>Gaji Staff</option>
            <option>Transportasi</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div class="form-group">
          <label>Metode Kas</label>
          <select id="cashOutFormMethod">
            <option>Tunai</option>
            <option>Transfer Bank</option>
            <option>Mobile Banking</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Keperluan</label>
        <input type="text" id="cashOutFormPurpose" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tanggal</label>
          <input type="date" id="cashOutFormDate" value="${today}" required />
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <input type="number" id="cashOutFormAmount" min="1" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Petugas</label>
          <input type="text" id="cashOutFormCreatedBy" value="${escapeHTML(getCurrentStaff())}" />
        </div>
        <div class="form-group">
          <label>Lampiran / Bukti</label>
          <input type="text" id="cashOutFormAttachment" placeholder="Nomor bukti, nama file, atau URL" />
        </div>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="cashOutFormStatus">
          <option>Tercatat</option>
          <option>Selesai</option>
          <option>Pending</option>
        </select>
      </div>
      ${modalActions('Simpan Kas Keluar')}
    </form>
  `);
}

function submitCashOut(event) {
  event.preventDefault();
  const cashOut = getRecords(storageKeys.cashOut);
  const cashRecord = {
    code: document.getElementById('cashOutFormCode')?.value.trim(),
    recipient: document.getElementById('cashOutFormRecipient')?.value.trim(),
    category: document.getElementById('cashOutFormCategory')?.value,
    method: document.getElementById('cashOutFormMethod')?.value,
    purpose: document.getElementById('cashOutFormPurpose')?.value.trim(),
    cashDate: document.getElementById('cashOutFormDate')?.value,
    amount: Number(document.getElementById('cashOutFormAmount')?.value) || 0,
    createdBy: document.getElementById('cashOutFormCreatedBy')?.value.trim(),
    attachment: document.getElementById('cashOutFormAttachment')?.value.trim(),
    status: document.getElementById('cashOutFormStatus')?.value || 'Tercatat'
  };
  cashOut.unshift(cashRecord);

  saveRecords(storageKeys.cashOut, cashOut);
  renderTemporaryDatabase();
  showShareOptions(`Kas Keluar - ${cashRecord.code}`, buildRecordSummary('Catatan Kas Keluar', [
    { label: 'Kode', value: cashRecord.code },
    { label: 'Kategori', value: cashRecord.category },
    { label: 'Penerima', value: cashRecord.recipient },
    { label: 'Keperluan', value: cashRecord.purpose },
    { label: 'Metode', value: cashRecord.method },
    { label: 'Tanggal', value: formatDate(cashRecord.cashDate) },
    { label: 'Jumlah', value: money(cashRecord.amount) },
    { label: 'Petugas', value: cashRecord.createdBy },
    { label: 'Lampiran', value: cashRecord.attachment },
    { label: 'Status', value: cashRecord.status }
  ]));
}

function openContractForm() {
  const contracts = getRecords(storageKeys.contracts);
  openDataModal('Buat Kontrak', 'Buat data kontrak pinjaman dengan jaminan.', `
    <form class="form-panel" onsubmit="submitContract(event)">
      <div class="form-row">
        <div class="form-group">
          <label>No. Kontrak</label>
          <input type="text" id="contractFormNo" value="${nextCode('KT', contracts)}" required />
        </div>
        <div class="form-group">
          <label>Kode Pinjaman</label>
          <select id="contractFormLoanCode" onchange="fillContractLoanData(this.value)" required>
            <option value="">Pilih pinjaman</option>
            ${buildLoanOptions()}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nama Klien</label>
          <input type="text" id="contractFormClient" required />
        </div>
        <div class="form-group">
          <label>Tanggal Kontrak</label>
          <input type="date" id="contractFormDate" value="${today}" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nilai Pinjaman</label>
          <input type="number" id="contractFormAmount" min="0" required />
        </div>
        <div class="form-group">
          <label>Margin (%)</label>
          <input type="number" id="contractFormMargin" min="0" step="0.1" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Durasi</label>
          <input type="text" id="contractFormDuration" value="3 bulan" required />
        </div>
        <div class="form-group">
          <label>Jatuh Tempo</label>
          <input type="date" id="contractFormDueDate" required />
        </div>
      </div>
      <div class="form-group">
        <label>Jaminan</label>
        <input type="text" id="contractFormCollateral" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Saksi</label>
          <input type="text" id="contractFormWitness" placeholder="Nama saksi / staff" />
        </div>
        <div class="form-group">
          <label>File Kontrak</label>
          <input type="text" id="contractFormFile" placeholder="Nomor file, nama file, atau URL" />
        </div>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="contractFormStatus">
          <option>Draft</option>
          <option>Ditandatangani</option>
          <option>Berakhir</option>
        </select>
      </div>
      ${modalActions('Simpan Kontrak')}
    </form>
  `);
}

function submitContract(event) {
  event.preventDefault();
  const contracts = getRecords(storageKeys.contracts);
  const contract = {
    contractNo: document.getElementById('contractFormNo')?.value.trim(),
    loanCode: document.getElementById('contractFormLoanCode')?.value,
    client: document.getElementById('contractFormClient')?.value.trim(),
    contractDate: document.getElementById('contractFormDate')?.value,
    amount: Number(document.getElementById('contractFormAmount')?.value) || 0,
    margin: Number(document.getElementById('contractFormMargin')?.value) || 0,
    duration: document.getElementById('contractFormDuration')?.value.trim(),
    dueDate: document.getElementById('contractFormDueDate')?.value,
    collateral: document.getElementById('contractFormCollateral')?.value.trim(),
    witness: document.getElementById('contractFormWitness')?.value.trim(),
    contractFile: document.getElementById('contractFormFile')?.value.trim(),
    status: document.getElementById('contractFormStatus')?.value || 'Draft'
  };
  contracts.unshift(contract);

  saveRecords(storageKeys.contracts, contracts);
  renderTemporaryDatabase();
  const loan = getLoanByCode(contract.loanCode);
  showShareOptions(`Kontrak - ${contract.contractNo}`, buildRecordSummary('Kontrak Pinjaman', [
    { label: 'No. Kontrak', value: contract.contractNo },
    { label: 'Kode Pinjaman', value: contract.loanCode },
    { label: 'Nama Klien', value: contract.client },
    { label: 'Nilai Pinjaman', value: money(contract.amount) },
    { label: 'Margin', value: `${contract.margin}%` },
    { label: 'Tanggal', value: formatDate(contract.contractDate) },
    { label: 'Durasi', value: contract.duration },
    { label: 'Jatuh Tempo', value: formatDate(contract.dueDate) },
    { label: 'Jaminan', value: contract.collateral },
    { label: 'Saksi', value: contract.witness },
    { label: 'File Kontrak', value: contract.contractFile },
    { label: 'Status', value: contract.status }
  ]), loan?.contact || '');
}

function openUserForm() {
  openDataModal('Tambah User', 'Input user staff dan role akses sistem.', `
    <form class="form-panel" onsubmit="submitUser(event)">
      <div class="form-row">
        <div class="form-group">
          <label>Nama</label>
          <input type="text" id="userFormName" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="userFormEmail" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Role</label>
          <select id="userFormRole">
            <option>Direktur</option>
            <option>Administrasi & Finance</option>
            <option>Treasury</option>
            <option>Accounting</option>
            <option>Operasional</option>
            <option>IT</option>
            <option>Receptionist</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="userFormStatus">
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Area Akses</label>
        <input type="text" id="userFormAccess" placeholder="Contoh: Pinjaman, Kas, Laporan" required />
      </div>
      ${modalActions('Simpan User')}
    </form>
  `);
}

function submitUser(event) {
  event.preventDefault();
  const users = getRecords(storageKeys.users, defaultUsers);
  const user = {
    name: document.getElementById('userFormName')?.value.trim(),
    email: document.getElementById('userFormEmail')?.value.trim(),
    role: document.getElementById('userFormRole')?.value,
    accessArea: document.getElementById('userFormAccess')?.value.trim(),
    status: document.getElementById('userFormStatus')?.value || 'Aktif'
  };
  users.unshift(user);

  saveRecords(storageKeys.users, users);
  renderTemporaryDatabase();
  showShareOptions(`User - ${user.name}`, buildRecordSummary('Data User', [
    { label: 'Nama', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Role', value: user.role },
    { label: 'Area Akses', value: user.accessArea },
    { label: 'Status', value: user.status }
  ]));
}

function resetLoanForm() {
  setTimeout(() => {
    const monthlyPayment = document.getElementById('monthlyPayment');
    if (monthlyPayment) monthlyPayment.textContent = '$0.00';
    const totalPayable = document.getElementById('totalPayable');
    if (totalPayable) totalPayable.textContent = '$0.00';

    const loanPackage = document.getElementById('loanPackage');
    if (loanPackage) loanPackage.value = '';

    const loanDate = document.getElementById('loanDate');
    if (loanDate) loanDate.value = today;
    const appraisalDate = document.getElementById('appraisalDate');
    if (appraisalDate) appraisalDate.value = today;
    const createdBy = document.getElementById('createdBy');
    if (createdBy) createdBy.value = getCurrentStaff();
    const appraiser = document.getElementById('appraiser');
    if (appraiser) appraiser.value = getCurrentStaff();
    syncDueDate();
  }, 50);
}

function submitLoan(event) {
  event.preventDefault();

  const code = document.getElementById('loanCode')?.value.trim();
  const client = document.getElementById('clientName')?.value.trim();
  const contact = document.getElementById('contact')?.value.trim();
  const address = document.getElementById('address')?.value.trim();
  const identityType = document.getElementById('identityType')?.value;
  const idNumber = document.getElementById('idNumber')?.value.trim();
  const birthDate = document.getElementById('birthDate')?.value;
  const gender = document.getElementById('gender')?.value;
  const jobStatus = document.getElementById('jobStatus')?.value;
  const emergencyContact = document.getElementById('emergencyContact')?.value.trim();
  const selectedPackage = getSelectedLoanPackage();
  const collateralType = document.getElementById('collateralType')?.value;
  const collateralName = document.getElementById('collateralName')?.value.trim();
  const appraisalValue = Number(document.getElementById('appraisalValue')?.value) || 0;
  const condition = document.getElementById('condition')?.value;
  const documentNumber = document.getElementById('documentNumber')?.value.trim();
  const storageLocation = document.getElementById('storageLocation')?.value.trim();
  const appraiser = document.getElementById('appraiser')?.value.trim();
  const appraisalDate = document.getElementById('appraisalDate')?.value;
  const collateralPhoto = document.getElementById('collateralPhoto')?.value.trim();
  const loanDate = document.getElementById('loanDate')?.value;
  const amount = Number(document.getElementById('loanAmount')?.value) || 0;
  const margin = Number(document.getElementById('margin')?.value) || 0;
  const duration = Number(document.getElementById('duration')?.value) || 3;
  const dueDate = document.getElementById('dueDate')?.value;
  const monthlyPayment = selectedPackage ? parseMoney(selectedPackage.monthly) : calculateLoan();
  const disbursementMethod = document.getElementById('disbursementMethod')?.value;
  const disbursementStatus = document.getElementById('disbursementStatus')?.value;
  const penaltyRate = Number(document.getElementById('penaltyRate')?.value) || 0;
  const createdBy = document.getElementById('createdBy')?.value.trim() || getCurrentStaff();
  const note = document.getElementById('note')?.value.trim();

  if (!code || !client || !collateralType || !collateralName || amount <= 0 || !dueDate) {
    showToast('Lengkapi data klien, jaminan, dan jumlah pinjaman lebih dari $0.');
    return;
  }

  const loans = getLoans();
  const existingIndex = loans.findIndex(item => item.code === code);
  const loan = {
    code,
    client,
    contact,
    address,
    identityType,
    idNumber,
    birthDate,
    gender,
    jobStatus,
    emergencyContact,
    packageName: selectedPackage?.name || '',
    collateralType,
    collateralName,
    appraisalValue,
    condition,
    documentNumber,
    storageLocation,
    appraiser,
    appraisalDate,
    collateralPhoto,
    loanDate,
    amount,
    margin,
    duration,
    dueDate,
    monthlyPayment,
    disbursementMethod,
    disbursementStatus,
    penaltyRate,
    createdBy,
    note,
    status: 'Proses'
  };

  if (existingIndex >= 0) loans[existingIndex] = loan;
  else loans.unshift(loan);

  saveLoans(loans);
  renderTemporaryDatabase();

  document.getElementById('loanForm')?.reset();
  resetLoanForm();
  showShareOptions(`Pinjaman - ${loan.code}`, buildRecordSummary('Pinjaman / Penhoria', [
    { label: 'Kode Pinjaman', value: loan.code },
    { label: 'Nama Klien', value: loan.client },
    { label: 'Kontak', value: loan.contact },
    { label: 'Alamat', value: loan.address },
    { label: 'Identitas', value: `${loan.identityType} - ${loan.idNumber}` },
    { label: 'Tanggal Lahir', value: formatDate(loan.birthDate) },
    { label: 'Gender', value: loan.gender },
    { label: 'Pekerjaan', value: loan.jobStatus },
    { label: 'Kontak Darurat', value: loan.emergencyContact },
    { label: 'Paket', value: loan.packageName || '-' },
    { label: 'Jumlah Pinjaman', value: money(loan.amount) },
    { label: 'Margin', value: `${loan.margin}%` },
    { label: 'Durasi', value: `${loan.duration} bulan` },
    { label: 'Total Harus Dibayar', value: money(getTotalPayable(loan)) },
    { label: 'Cicilan Bulanan', value: money(loan.monthlyPayment) },
    { label: 'Tanggal Pinjam', value: formatDate(loan.loanDate) },
    { label: 'Jatuh Tempo', value: formatDate(loan.dueDate) },
    { label: 'Metode Pencairan', value: loan.disbursementMethod },
    { label: 'Status Pencairan', value: loan.disbursementStatus },
    { label: 'Denda Keterlambatan', value: `${loan.penaltyRate}%` },
    { label: 'Jenis Jaminan', value: loan.collateralType },
    { label: 'Nama Barang', value: loan.collateralName },
    { label: 'Nilai Taksiran', value: money(loan.appraisalValue) },
    { label: 'Kondisi', value: loan.condition },
    { label: 'Nomor Dokumen', value: loan.documentNumber || '-' },
    { label: 'Lokasi Penyimpanan', value: loan.storageLocation },
    { label: 'Penaksir', value: loan.appraiser },
    { label: 'Tanggal Taksir', value: formatDate(loan.appraisalDate) },
    { label: 'Referensi Foto', value: loan.collateralPhoto },
    { label: 'Petugas', value: loan.createdBy },
    { label: 'Status', value: loan.status },
    { label: 'Catatan', value: loan.note }
  ]), loan.contact);
}

function searchTable() {
  const keyword = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const rows = document.querySelectorAll('.data-table tbody tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(keyword) ? '' : 'none';
  });
}

function viewDetail(code) {
  const loan = getLoans().find(item => item.code === code);
  if (!loan) {
    showToast(`Data ${code} tidak ditemukan.`);
    return;
  }

  showShareOptions(`Detail Pinjaman - ${loan.code}`, buildRecordSummary('Detail Pinjaman / Penhoria', [
    { label: 'Kode Pinjaman', value: loan.code },
    { label: 'Nama Klien', value: loan.client },
    { label: 'Kontak', value: loan.contact },
    { label: 'Jumlah Pinjaman', value: money(loan.amount) },
    { label: 'Cicilan Bulanan', value: money(loan.monthlyPayment) },
    { label: 'Tanggal Pinjam', value: formatDate(loan.loanDate) },
    { label: 'Jatuh Tempo', value: formatDate(loan.dueDate) },
    { label: 'Jaminan', value: `${loan.collateralType} - ${loan.collateralName}` },
    { label: 'Nilai Taksiran', value: money(loan.appraisalValue) },
    { label: 'Status', value: loan.status }
  ]), loan.contact);
}

function exportData() {
  const table = document.querySelector('.data-table');
  if (!table) {
    showToast('Belum ada tabel untuk diexport di halaman ini.');
    return;
  }

  const headers = [...table.querySelectorAll('thead th')].map(th => th.innerText);
  const rows = [...table.querySelectorAll('tbody tr')].filter(row => row.style.display !== 'none');
  const csvRows = [headers.join(',')];

  rows.forEach(row => {
    const values = [...row.querySelectorAll('td')].map(cell => `"${cell.innerText.replaceAll('"', '""')}"`);
    csvRows.push(values.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'hirei-chiba-penor-data.csv';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Data berhasil diexport ke CSV.');
}

function addLoanPackage(packageData = {}) {
  const table = document.getElementById('loanPackageTable');
  if (!table) return;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" value="${escapeHTML(packageData.name || '')}" placeholder="Paket baru" /></td>
    <td><input type="text" value="${escapeHTML(packageData.amount || '')}" placeholder="$0" /></td>
    <td><input type="text" value="${escapeHTML(packageData.monthly || '')}" placeholder="$0" /></td>
    <td><input type="text" value="${escapeHTML(packageData.duration || '3 bulan')}" /></td>
    <td><input type="text" value="${escapeHTML(packageData.margin || '')}" placeholder="0%" /></td>
    <td><button class="btn btn-danger" onclick="removeLoanPackage(this)">Hapus</button></td>
  `;
  table.appendChild(row);
}

function removeLoanPackage(button) {
  const rows = document.querySelectorAll('#loanPackageTable tr');
  if (rows.length === 1) {
    showToast('Minimal harus ada 1 paket pinjaman.');
    return;
  }

  button.closest('tr')?.remove();
}

function collectLoanPackages() {
  return [...document.querySelectorAll('#loanPackageTable tr')].map(row => {
    const inputs = row.querySelectorAll('input');
    return {
      name: inputs[0]?.value.trim() || '',
      amount: inputs[1]?.value.trim() || '',
      monthly: inputs[2]?.value.trim() || '',
      duration: inputs[3]?.value.trim() || '',
      margin: inputs[4]?.value.trim() || ''
    };
  }).filter(item => item.name || item.amount || item.monthly || item.duration || item.margin);
}

function saveLoanPackages() {
  const packages = collectLoanPackages();
  if (!packages.length) {
    showToast('Isi minimal 1 paket pinjaman.');
    return;
  }

  localStorage.setItem('loanPackages', JSON.stringify(packages));
  populateLoanPackageSelect();
  showToast('Paket pinjaman disimpan.');
}

function loadLoanPackages() {
  const table = document.getElementById('loanPackageTable');
  const saved = localStorage.getItem('loanPackages');
  if (!table || !saved) return;

  let packages = [];
  try {
    packages = JSON.parse(saved);
  } catch {
    localStorage.removeItem('loanPackages');
    return;
  }

  if (!Array.isArray(packages) || !packages.length) return;

  table.innerHTML = '';
  packages.forEach(addLoanPackage);
}

function saveSettings() {
  const settings = {
    businessName: document.getElementById('businessName')?.value.trim() || '',
    initialCapital: document.getElementById('initialCapital')?.value || '',
    defaultDuration: document.getElementById('defaultDuration')?.value || '',
    defaultMargin: document.getElementById('defaultMargin')?.value || '',
    businessAddress: document.getElementById('businessAddress')?.value.trim() || ''
  };

  localStorage.setItem('businessSettings', JSON.stringify(settings));
  saveLoanPackages();
  showToast('Pengaturan disimpan.');
}

function loadSettings() {
  const savedSettings = localStorage.getItem('businessSettings');
  if (savedSettings) {
    let settings = {};
    try {
      settings = JSON.parse(savedSettings);
    } catch {
      localStorage.removeItem('businessSettings');
      settings = {};
    }

    Object.entries(settings).forEach(([key, value]) => {
      const field = document.getElementById(key);
      if (field) field.value = value;
    });
  }

  loadLoanPackages();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!dateString || Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

document.getElementById('loanDate')?.addEventListener('change', syncDueDate);
document.getElementById('duration')?.addEventListener('change', calculateLoan);
document.getElementById('modalOverlay')?.addEventListener('click', function(event) {
  if (event.target === this) closeModal();
});

renderTemporaryDatabase();
