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
const supportedLanguages = ['id', 'en', 'zh'];
const languageNames = {
  id: 'Indonesia',
  en: 'English',
  zh: '中文'
};
const originalTextValues = new WeakMap();
const originalPlaceholderValues = new WeakMap();
const originalOptionLabels = new WeakMap();
const originalDocumentTitle = document.title;

const i18n = {
  en: {
    'Dashboard': 'Dashboard',
    'Klien': 'Clients',
    'Pinjaman': 'Loans',
    'Jaminan': 'Collateral',
    'Pembayaran': 'Payments',
    'Jatuh Tempo': 'Due Dates',
    'Lelang': 'Auction',
    'Kas Masuk': 'Cash In',
    'Kas Keluar': 'Cash Out',
    'Laporan Keuangan': 'Financial Reports',
    'Kontrak': 'Contracts',
    'User & Role': 'Users & Roles',
    'Pengaturan': 'Settings',
    'Logout': 'Logout',
    'Operasional': 'Operations',
    'Keuangan': 'Finance',
    'Dokumen & Sistem': 'Documents & System',
    'Akun': 'Account',
    'Pawn & Loan Management': 'Pawn & Loan Management',
    'Ringkasan pinjaman, jaminan, kas, dan aktivitas penhoria.': 'Summary of loans, collateral, cash, and pawn activity.',
    'Data klien yang mengajukan pinjaman dengan jaminan aset.': 'Client data for asset-backed loan applications.',
    'Kelola kontrak pinjaman, margin, durasi, dan cicilan.': 'Manage loan contracts, margin, duration, and installments.',
    'Kelola barang atau dokumen aset yang menjadi jaminan pinjaman.': 'Manage goods or asset documents used as loan collateral.',
    'Catatan cicilan, bunga, dan pelunasan klien.': 'Client installment, margin, and settlement records.',
    'Pinjaman yang mendekati atau melewati tanggal jatuh tempo.': 'Loans approaching or past their due date.',
    'Jaminan dari pinjaman macet yang siap diproses untuk lelang.': 'Collateral from defaulted loans ready for auction processing.',
    'Pemasukan dari pembayaran klien dan aktivitas keuangan lain.': 'Income from client payments and other financial activities.',
    'Pengeluaran untuk pencairan dana dan operasional perusahaan.': 'Expenses for fund disbursement and company operations.',
    'Ringkasan modal, pencairan, pembayaran, margin, dan kas.': 'Summary of capital, disbursement, payments, margin, and cash.',
    'Dokumen perjanjian pinjaman dengan jaminan.': 'Asset-backed loan agreement documents.',
    'Akses staff seperti Direktur, Finance, Treasury, Accounting, IT, dan Receptionist.': 'Staff access such as Director, Finance, Treasury, Accounting, IT, and Receptionist.',
    'Konfigurasi profil usaha, modal, dan paket pinjaman.': 'Configure business profile, capital, and loan packages.',
    'Cari klien, pinjaman, jaminan...': 'Search clients, loans, collateral...',
    '+ Pinjaman Baru': '+ New Loan',
    'Pinjaman Baru': 'New Loan',
    'Daftar Pinjaman': 'Loan List',
    'Input data klien, pinjaman, dan jaminan dalam satu alur kerja.': 'Enter client, loan, and collateral data in one workflow.',
    '+ Tambah Klien': '+ Add Client',
    '+ Tambah Jaminan': '+ Add Collateral',
    '+ Catat Pembayaran': '+ Record Payment',
    'Cek Jatuh Tempo': 'Check Due Dates',
    '+ Proses Lelang': '+ Process Auction',
    '+ Catat Kas Masuk': '+ Record Cash In',
    '+ Catat Kas Keluar': '+ Record Cash Out',
    'Export Laporan': 'Export Report',
    '+ Buat Kontrak': '+ Create Contract',
    '+ Tambah User': '+ Add User',
    'Simpan': 'Save',
    'Export': 'Export',
    'Export CSV': 'Export CSV',
    'Buka Dashboard': 'Open Dashboard',
    'Daftar Pinjaman Terbaru': 'Latest Loans',
    'Monitoring pinjaman, jaminan, jatuh tempo, dan status pembayaran.': 'Monitor loans, collateral, due dates, and payment status.',
    'Form Pinjaman / Penhoria': 'Loan / Pawn Form',
    'Input data klien, pinjaman, dan jaminan.': 'Enter client, loan, and collateral data.',
    'Total Klien': 'Total Clients',
    'Pinjaman Aktif': 'Active Loans',
    'Jaminan Disimpan': 'Stored Collateral',
    'Modal Awal': 'Initial Capital',
    'Kode Pinjaman': 'Loan Code',
    'Nama Klien': 'Client Name',
    'Jenis Jaminan': 'Collateral Type',
    'Tanggal Pinjam': 'Loan Date',
    'Jumlah Pinjaman': 'Loan Amount',
    'Sisa Tagihan': 'Remaining Balance',
    'Jatuh Tempo': 'Due Date',
    'Status': 'Status',
    'Aksi': 'Action',
    'Detail': 'Detail',
    'Nomor Kontak': 'Contact Number',
    'Alamat': 'Address',
    'Jenis Identitas': 'Identity Type',
    'No. Kartu Identitas': 'Identity Number',
    'Tanggal Lahir': 'Date of Birth',
    'Gender': 'Gender',
    'Status Pekerjaan': 'Job Status',
    'Kontak Darurat': 'Emergency Contact',
    'Paket Pinjaman': 'Loan Package',
    'Margin / Bunga (%)': 'Margin / Interest (%)',
    'Durasi': 'Duration',
    'Tanggal Jatuh Tempo': 'Due Date',
    'Metode Pencairan': 'Disbursement Method',
    'Status Pencairan': 'Disbursement Status',
    'Denda Keterlambatan (%)': 'Late Penalty (%)',
    'Petugas': 'Officer',
    'Nama Barang': 'Item Name',
    'Nilai Taksiran': 'Appraisal Value',
    'Kondisi Barang': 'Item Condition',
    'Nomor Dokumen': 'Document Number',
    'Lokasi Penyimpanan': 'Storage Location',
    'Penaksir': 'Appraiser',
    'Tanggal Taksir': 'Appraisal Date',
    'Referensi Foto Jaminan': 'Collateral Photo Reference',
    'Total Harus Dibayar': 'Total Payable',
    'Cicilan per Bulan': 'Monthly Installment',
    'Catatan': 'Notes',
    'Reset': 'Reset',
    'Simpan Pinjaman': 'Save Loan',
    'Data Klien': 'Client Data',
    'Profil klien penhoria dan kontak aktif.': 'Pawn client profile and active contact.',
    'Kontak': 'Contact',
    'Identitas': 'Identity',
    'Pekerjaan': 'Occupation',
    'Data Jaminan': 'Collateral Data',
    'Barang dan dokumen aset yang ditahan sebagai jaminan.': 'Goods and asset documents held as collateral.',
    'Lokasi Simpan': 'Storage Location',
    'Status Jaminan': 'Collateral Status',
    'Kode Bayar': 'Payment Code',
    'Angsuran': 'Installment',
    'Jenis': 'Type',
    'Metode': 'Method',
    'Tanggal Bayar': 'Payment Date',
    'Jumlah': 'Amount',
    'Denda': 'Penalty',
    'Sisa Saldo': 'Remaining Balance',
    'Hari': 'Days',
    'Kode Lelang': 'Auction Code',
    'Harga Buka': 'Opening Price',
    'Tanggal': 'Date',
    'Kode': 'Code',
    'Kategori': 'Category',
    'Keterangan': 'Description',
    'Penerima': 'Recipient',
    'Keperluan': 'Purpose',
    'No. Kontrak': 'Contract No.',
    'Nilai Pinjaman': 'Loan Value',
    'Saksi': 'Witness',
    'Nama': 'Name',
    'Email': 'Email',
    'Role': 'Role',
    'Area Akses': 'Access Area',
    'Pengaturan Sistem': 'System Settings',
    'Profil dasar perusahaan dan aturan pinjaman.': 'Basic company profile and loan rules.',
    'Nama Usaha': 'Business Name',
    'Modal Awal (USD)': 'Initial Capital (USD)',
    'Durasi Default': 'Default Duration',
    'Margin Default (%)': 'Default Margin (%)',
    'Alamat Usaha': 'Business Address',
    'Simpan Pengaturan': 'Save Settings',
    'Produk pinjaman sesuai proposal bisnis.': 'Loan products based on the business proposal.',
    'Paket': 'Package',
    'Pembayaran per Bulan': 'Monthly Payment',
    'Margin': 'Margin',
    '+ Tambah Paket': '+ Add Package',
    'Simpan Paket Pinjaman': 'Save Loan Packages',
    'Periode': 'Period',
    'Jenis Laporan': 'Report Type',
    'Komponen': 'Component',
    'Nilai': 'Value',
    'Kas Masuk Bulan Ini': 'Cash In This Month',
    'Kas Keluar Bulan Ini': 'Cash Out This Month',
    'Estimasi Margin': 'Estimated Margin',
    'Ringkasan Keuangan': 'Financial Summary',
    'Jaminan': 'Collateral',
    'Login': 'Login',
    'Email / Username': 'Email / Username',
    'Password': 'Password',
    'Masukkan password': 'Enter password',
    'Nama lengkap klien': 'Client full name',
    'Nomor telepon': 'Phone number',
    'Alamat klien': 'Client address',
    'Nama / nomor keluarga': 'Family name / number',
    'Nama staff': 'Staff name',
    'Contoh: Yamaha NMAX, Emas 20 gram': 'Example: Yamaha NMAX, 20 gram gold',
    'Nomor STNK/BPKB/sertifikat jika ada': 'STNK/BPKB/certificate number if any',
    'Nama penaksir': 'Appraiser name',
    'Nama file / URL foto barang': 'File name / item photo URL',
    'Catatan taksiran, risiko, atau kondisi jaminan...': 'Appraisal, risk, or collateral condition notes...',
    'Pilih paket pinjaman': 'Select loan package',
    'Pilih jenis': 'Select type',
    'Batal': 'Cancel',
    'Print': 'Print',
    'Email': 'Email',
    'WhatsApp': 'WhatsApp',
    'Aktif': 'Active',
    'Proses': 'In Process',
    'Lunas': 'Paid Off',
    'Terlambat': 'Overdue',
    'Diterima': 'Received',
    'Pending': 'Pending',
    'Ditolak': 'Rejected',
    'Selesai': 'Completed',
    'Tercatat': 'Recorded',
    'Draft': 'Draft',
    'Ditandatangani': 'Signed',
    'Berakhir': 'Ended',
    'Disimpan': 'Stored',
    'Ditebus': 'Redeemed',
    'Proses Lelang': 'Auction Process',
    'Persiapan': 'Preparation',
    'Berjalan': 'Running',
    'Batal': 'Cancelled',
    'Pria': 'Male',
    'Wanita': 'Female',
    'Karyawan': 'Employee',
    'Wirausaha': 'Entrepreneur',
    'Petani': 'Farmer',
    'Belum bekerja': 'Unemployed',
    'Tunai': 'Cash',
    'Transfer Bank': 'Bank Transfer',
    'Mobile Banking': 'Mobile Banking',
    'Dicairkan': 'Disbursed',
    'Ditahan': 'Held',
    'Baik': 'Good',
    'Rusak ringan': 'Minor Damage',
    'Rusak berat': 'Severe Damage',
    'Emas': 'Gold',
    'Motor': 'Motorcycle',
    'Mobil': 'Car',
    'Laptop': 'Laptop',
    'Telepon': 'Phone',
    'Rumah': 'House',
    'Tanah': 'Land',
    'Dokumen Kendaraan': 'Vehicle Document',
    'Dokumen Aset': 'Asset Document',
    'Cicilan': 'Installment',
    'Pelunasan': 'Settlement',
    'Biaya Administrasi': 'Administration Fee',
    'Hasil Lelang': 'Auction Proceeds',
    'Lainnya': 'Other',
    'Pencairan Pinjaman': 'Loan Disbursement',
    'Operasional Kantor': 'Office Operations',
    'Gaji Staff': 'Staff Salary',
    'Transportasi': 'Transportation',
    'Semua Periode': 'All Periods'
  },
  zh: {
    'Dashboard': '仪表盘',
    'Klien': '客户',
    'Pinjaman': '贷款',
    'Jaminan': '抵押品',
    'Pembayaran': '还款',
    'Jatuh Tempo': '到期',
    'Lelang': '拍卖',
    'Kas Masuk': '现金收入',
    'Kas Keluar': '现金支出',
    'Laporan Keuangan': '财务报表',
    'Kontrak': '合同',
    'User & Role': '用户与角色',
    'Pengaturan': '设置',
    'Logout': '退出',
    'Operasional': '运营',
    'Keuangan': '财务',
    'Dokumen & Sistem': '文件与系统',
    'Akun': '账户',
    'Pawn & Loan Management': '典当与贷款管理',
    'Ringkasan pinjaman, jaminan, kas, dan aktivitas penhoria.': '贷款、抵押品、现金和典当活动概览。',
    'Data klien yang mengajukan pinjaman dengan jaminan aset.': '申请资产抵押贷款的客户资料。',
    'Kelola kontrak pinjaman, margin, durasi, dan cicilan.': '管理贷款合同、利率、期限和分期付款。',
    'Kelola barang atau dokumen aset yang menjadi jaminan pinjaman.': '管理作为贷款抵押的物品或资产文件。',
    'Catatan cicilan, bunga, dan pelunasan klien.': '客户分期、利息和结清记录。',
    'Pinjaman yang mendekati atau melewati tanggal jatuh tempo.': '即将到期或已逾期的贷款。',
    'Jaminan dari pinjaman macet yang siap diproses untuk lelang.': '可进入拍卖流程的逾期贷款抵押品。',
    'Pemasukan dari pembayaran klien dan aktivitas keuangan lain.': '客户付款和其他财务活动收入。',
    'Pengeluaran untuk pencairan dana dan operasional perusahaan.': '放款和公司运营支出。',
    'Ringkasan modal, pencairan, pembayaran, margin, dan kas.': '资本、放款、还款、利润和现金概览。',
    'Dokumen perjanjian pinjaman dengan jaminan.': '抵押贷款协议文件。',
    'Akses staff seperti Direktur, Finance, Treasury, Accounting, IT, dan Receptionist.': '员工访问权限，如董事、财务、出纳、会计、IT和前台。',
    'Konfigurasi profil usaha, modal, dan paket pinjaman.': '配置企业资料、资本和贷款套餐。',
    'Cari klien, pinjaman, jaminan...': '搜索客户、贷款、抵押品...',
    '+ Pinjaman Baru': '+ 新贷款',
    'Pinjaman Baru': '新贷款',
    'Daftar Pinjaman': '贷款列表',
    'Input data klien, pinjaman, dan jaminan dalam satu alur kerja.': '在一个流程中输入客户、贷款和抵押品资料。',
    '+ Tambah Klien': '+ 添加客户',
    '+ Tambah Jaminan': '+ 添加抵押品',
    '+ Catat Pembayaran': '+ 记录还款',
    'Cek Jatuh Tempo': '检查到期',
    '+ Proses Lelang': '+ 处理拍卖',
    '+ Catat Kas Masuk': '+ 记录收入',
    '+ Catat Kas Keluar': '+ 记录支出',
    'Export Laporan': '导出报表',
    '+ Buat Kontrak': '+ 创建合同',
    '+ Tambah User': '+ 添加用户',
    'Simpan': '保存',
    'Export': '导出',
    'Export CSV': '导出CSV',
    'Buka Dashboard': '打开仪表盘',
    'Daftar Pinjaman Terbaru': '最新贷款',
    'Monitoring pinjaman, jaminan, jatuh tempo, dan status pembayaran.': '监控贷款、抵押品、到期日和还款状态。',
    'Form Pinjaman / Penhoria': '贷款/典当表单',
    'Input data klien, pinjaman, dan jaminan.': '输入客户、贷款和抵押品资料。',
    'Total Klien': '客户总数',
    'Pinjaman Aktif': '活跃贷款',
    'Jaminan Disimpan': '已保管抵押品',
    'Modal Awal': '初始资本',
    'Kode Pinjaman': '贷款编号',
    'Nama Klien': '客户姓名',
    'Jenis Jaminan': '抵押品类型',
    'Tanggal Pinjam': '贷款日期',
    'Jumlah Pinjaman': '贷款金额',
    'Sisa Tagihan': '剩余应收',
    'Jatuh Tempo': '到期日',
    'Status': '状态',
    'Aksi': '操作',
    'Detail': '详情',
    'Nomor Kontak': '联系电话',
    'Alamat': '地址',
    'Jenis Identitas': '证件类型',
    'No. Kartu Identitas': '证件号码',
    'Tanggal Lahir': '出生日期',
    'Gender': '性别',
    'Status Pekerjaan': '职业状态',
    'Kontak Darurat': '紧急联系人',
    'Paket Pinjaman': '贷款套餐',
    'Margin / Bunga (%)': '利润/利息(%)',
    'Durasi': '期限',
    'Tanggal Jatuh Tempo': '到期日期',
    'Metode Pencairan': '放款方式',
    'Status Pencairan': '放款状态',
    'Denda Keterlambatan (%)': '逾期罚金(%)',
    'Petugas': '经办人',
    'Nama Barang': '物品名称',
    'Nilai Taksiran': '估值',
    'Kondisi Barang': '物品状况',
    'Nomor Dokumen': '文件编号',
    'Lokasi Penyimpanan': '保管位置',
    'Penaksir': '估价人',
    'Tanggal Taksir': '估价日期',
    'Referensi Foto Jaminan': '抵押品照片参考',
    'Total Harus Dibayar': '应还总额',
    'Cicilan per Bulan': '每月分期',
    'Catatan': '备注',
    'Reset': '重置',
    'Simpan Pinjaman': '保存贷款',
    'Data Klien': '客户资料',
    'Profil klien penhoria dan kontak aktif.': '典当客户资料和有效联系方式。',
    'Kontak': '联系方式',
    'Identitas': '身份',
    'Pekerjaan': '职业',
    'Data Jaminan': '抵押品资料',
    'Barang dan dokumen aset yang ditahan sebagai jaminan.': '作为抵押保管的物品和资产文件。',
    'Lokasi Simpan': '保管位置',
    'Status Jaminan': '抵押品状态',
    'Kode Bayar': '付款编号',
    'Angsuran': '期数',
    'Jenis': '类型',
    'Metode': '方式',
    'Tanggal Bayar': '付款日期',
    'Jumlah': '金额',
    'Denda': '罚金',
    'Sisa Saldo': '剩余余额',
    'Hari': '天数',
    'Kode Lelang': '拍卖编号',
    'Harga Buka': '起拍价',
    'Tanggal': '日期',
    'Kode': '编号',
    'Kategori': '类别',
    'Keterangan': '说明',
    'Penerima': '收款人',
    'Keperluan': '用途',
    'No. Kontrak': '合同号',
    'Nilai Pinjaman': '贷款价值',
    'Saksi': '见证人',
    'Nama': '姓名',
    'Email': '邮箱',
    'Role': '角色',
    'Area Akses': '访问范围',
    'Pengaturan Sistem': '系统设置',
    'Profil dasar perusahaan dan aturan pinjaman.': '公司基本资料和贷款规则。',
    'Nama Usaha': '企业名称',
    'Modal Awal (USD)': '初始资本(USD)',
    'Durasi Default': '默认期限',
    'Margin Default (%)': '默认利润(%)',
    'Alamat Usaha': '企业地址',
    'Simpan Pengaturan': '保存设置',
    'Produk pinjaman sesuai proposal bisnis.': '根据商业计划的贷款产品。',
    'Paket': '套餐',
    'Pembayaran per Bulan': '每月付款',
    'Margin': '利润',
    '+ Tambah Paket': '+ 添加套餐',
    'Simpan Paket Pinjaman': '保存贷款套餐',
    'Periode': '期间',
    'Jenis Laporan': '报表类型',
    'Komponen': '项目',
    'Nilai': '数值',
    'Kas Masuk Bulan Ini': '本月收入',
    'Kas Keluar Bulan Ini': '本月支出',
    'Estimasi Margin': '预计利润',
    'Ringkasan Keuangan': '财务摘要',
    'Jaminan': '抵押品',
    'Login': '登录',
    'Email / Username': '邮箱/用户名',
    'Password': '密码',
    'Masukkan password': '输入密码',
    'Nama lengkap klien': '客户全名',
    'Nomor telepon': '电话号码',
    'Alamat klien': '客户地址',
    'Nama / nomor keluarga': '家属姓名/电话',
    'Nama staff': '员工姓名',
    'Contoh: Yamaha NMAX, Emas 20 gram': '例如：Yamaha NMAX，20克黄金',
    'Nomor STNK/BPKB/sertifikat jika ada': '如有，填写车辆/产权文件编号',
    'Nama penaksir': '估价人姓名',
    'Nama file / URL foto barang': '文件名/物品照片URL',
    'Catatan taksiran, risiko, atau kondisi jaminan...': '估值、风险或抵押品状况备注...',
    'Pilih paket pinjaman': '选择贷款套餐',
    'Pilih jenis': '选择类型',
    'Batal': '取消',
    'Print': '打印',
    'Email': '邮箱',
    'WhatsApp': 'WhatsApp',
    'Aktif': '活跃',
    'Proses': '处理中',
    'Lunas': '已结清',
    'Terlambat': '逾期',
    'Diterima': '已收到',
    'Pending': '待处理',
    'Ditolak': '已拒绝',
    'Selesai': '完成',
    'Tercatat': '已记录',
    'Draft': '草稿',
    'Ditandatangani': '已签署',
    'Berakhir': '已结束',
    'Disimpan': '已保管',
    'Ditebus': '已赎回',
    'Proses Lelang': '拍卖处理中',
    'Persiapan': '准备中',
    'Berjalan': '进行中',
    'Batal': '取消',
    'Pria': '男',
    'Wanita': '女',
    'Karyawan': '员工',
    'Wirausaha': '个体经营',
    'Petani': '农民',
    'Belum bekerja': '未就业',
    'Tunai': '现金',
    'Transfer Bank': '银行转账',
    'Mobile Banking': '手机银行',
    'Dicairkan': '已放款',
    'Ditahan': '已保留',
    'Baik': '良好',
    'Rusak ringan': '轻微损坏',
    'Rusak berat': '严重损坏',
    'Emas': '黄金',
    'Motor': '摩托车',
    'Mobil': '汽车',
    'Laptop': '笔记本电脑',
    'Telepon': '手机',
    'Rumah': '房屋',
    'Tanah': '土地',
    'Dokumen Kendaraan': '车辆文件',
    'Dokumen Aset': '资产文件',
    'Cicilan': '分期',
    'Pelunasan': '结清',
    'Biaya Administrasi': '管理费',
    'Hasil Lelang': '拍卖收入',
    'Lainnya': '其他',
    'Pencairan Pinjaman': '贷款放款',
    'Operasional Kantor': '办公室运营',
    'Gaji Staff': '员工工资',
    'Transportasi': '交通',
    'Semua Periode': '所有期间'
  }
};

const extraTranslations = {
  en: {
    'Buat Pinjaman Baru': 'Create New Loan',
    'Input data klien, pinjaman, dan jaminan dari Dashboard.': 'Enter client, loan, and collateral data from the Dashboard.',
    'Gunakan form Pinjaman / Penhoria untuk mencatat kontrak pinjaman, margin, tanggal jatuh tempo, dan barang jaminan.': 'Use the Loan / Pawn form to record the loan contract, margin, due date, and collateral item.',
    'Daftar kontrak pinjaman aktif dan historinya.': 'List of active loan contracts and their history.',
    'Catat cicilan, bunga, dan pelunasan pinjaman.': 'Record installments, interest, and loan settlements.',
    'Pantau pinjaman yang segera jatuh tempo atau terlambat.': 'Monitor loans that are nearly due or overdue.',
    'Kelola jaminan yang masuk proses lelang karena pinjaman macet.': 'Manage collateral entering auction because of defaulted loans.',
    'Pemasukan dari cicilan, pelunasan, margin, dan biaya admin.': 'Income from installments, settlements, margins, and admin fees.',
    'Pemasukan dari cicilan, pelunasan, margin, dan biaya administrasi.': 'Income from installments, settlements, margins, and administration fees.',
    'Dana pencairan pinjaman dan biaya operasional perusahaan.': 'Loan disbursement funds and company operating expenses.',
    'Dana yang dicairkan kepada klien dan biaya operasional kantor.': 'Funds disbursed to clients and office operating expenses.',
    'Ringkasan modal, arus kas, pinjaman, margin, dan jaminan.': 'Summary of capital, cash flow, loans, margin, and collateral.',
    'Dokumen perjanjian pinjaman dan serah terima jaminan.': 'Loan agreement and collateral handover documents.',
    'Kelola akses staff berdasarkan fungsi organisasi perusahaan.': 'Manage staff access based on company organizational functions.',
    'Profil perusahaan, paket pinjaman, margin, dan aturan jatuh tempo.': 'Company profile, loan packages, margin, and due-date rules.',
    'Atur profil perusahaan, paket pinjaman, dan aturan margin.': 'Configure company profile, loan packages, and margin rules.',
    'Master data paket pinjaman yang bisa diedit sesuai kebijakan bisnis.': 'Loan package master data that can be edited according to business policy.',
    'Kelola barang dan dokumen aset yang dijadikan jaminan.': 'Manage goods and asset documents used as collateral.',
    'Jaminan dari pinjaman macet yang siap dijual.': 'Collateral from defaulted loans ready for sale.',
    'Kontrak Pinjaman': 'Loan Contract',
    'Metode Cair': 'Disbursement Method',
    'Total Bayar': 'Total Payable',
    'Cicilan Bulanan': 'Monthly Installment',
    'Potensi margin dari pinjaman': 'Potential margin from loans',
    'Total pemasukan tercatat': 'Total recorded income',
    'Total pencairan dan operasional': 'Total disbursement and operations',
    'Total pembayaran, pelunasan, margin, dan pendapatan lain.': 'Total payments, settlements, margins, and other income.',
    'Total pencairan pinjaman dan biaya operasional.': 'Total loan disbursements and operating expenses.',
    'Potensi margin dari seluruh pinjaman tercatat.': 'Potential margin from all recorded loans.',
    'Kontrak yang masih berjalan atau dalam proses.': 'Contracts that are active or still in process.',
    'Data berhasil disimpan.': 'Data saved successfully.',
    'Data Berhasil Disimpan': 'Data Saved Successfully',
    'Pilih aksi lanjutan untuk arsip atau kirim ke klien.': 'Choose the next action for archiving or sending to the client.',
    'Ringkasan Data': 'Data Summary',
    'Belum ada data untuk dikirim.': 'No data is available to send.',
    'Browser memblokir popup print.': 'The browser blocked the print popup.',
    'Isi email atau username terlebih dahulu.': 'Enter an email or username first.',
    'Login berhasil.': 'Login successful.',
    'Modal belum tersedia di halaman ini.': 'The modal is not available on this page.',
    'Lengkapi data klien, jaminan, dan jumlah pinjaman lebih dari $0.': 'Complete the client data, collateral, and loan amount above $0.',
    'Belum ada tabel untuk diexport di halaman ini.': 'There is no table to export on this page.',
    'Data berhasil diexport ke CSV.': 'Data exported to CSV successfully.',
    'Minimal harus ada 1 paket pinjaman.': 'At least 1 loan package is required.',
    'Isi minimal 1 paket pinjaman.': 'Enter at least 1 loan package.',
    'Paket pinjaman disimpan.': 'Loan packages saved.',
    'Pengaturan disimpan.': 'Settings saved.',
    'Tambah Klien': 'Add Client',
    'Input data klien baru untuk penhoria.': 'Enter a new pawn client record.',
    'Simpan Klien': 'Save Client',
    'Tambah Jaminan': 'Add Collateral',
    'Catat barang atau dokumen aset yang menjadi jaminan.': 'Record goods or asset documents used as collateral.',
    'Simpan Jaminan': 'Save Collateral',
    'Catat Pembayaran': 'Record Payment',
    'Input cicilan, margin, atau pelunasan klien.': 'Enter a client installment, margin payment, or settlement.',
    'Simpan Pembayaran': 'Save Payment',
    'Proses Lelang': 'Process Auction',
    'Catat jaminan dari pinjaman macet yang akan dilelang.': 'Record collateral from a defaulted loan to be auctioned.',
    'Simpan Lelang': 'Save Auction',
    'Catat Kas Masuk': 'Record Cash In',
    'Input pemasukan dari pembayaran, margin, atau biaya administrasi.': 'Enter income from payments, margins, or administration fees.',
    'Simpan Kas Masuk': 'Save Cash In',
    'Catat Kas Keluar': 'Record Cash Out',
    'Input pencairan dana atau biaya operasional.': 'Enter fund disbursement or operating expenses.',
    'Simpan Kas Keluar': 'Save Cash Out',
    'Buat Kontrak': 'Create Contract',
    'Buat data kontrak pinjaman dengan jaminan.': 'Create a secured loan contract record.',
    'Simpan Kontrak': 'Save Contract',
    'Tambah User': 'Add User',
    'Input user staff dan role akses sistem.': 'Enter staff user and system access role.',
    'Simpan User': 'Save User',
    'No. Identitas': 'Identity No.',
    'Pekerjaan': 'Occupation',
    'Kondisi': 'Condition',
    'Referensi Foto': 'Photo Reference',
    'Jenis Pembayaran': 'Payment Type',
    'Metode Bayar': 'Payment Method',
    'Angsuran Ke': 'Installment No.',
    'Sisa Saldo Setelah Bayar': 'Remaining Balance After Payment',
    'Tanggal Lelang': 'Auction Date',
    'Metode Kas': 'Cash Method',
    'Lampiran / Bukti': 'Attachment / Proof',
    'Lampiran': 'Attachment',
    'File Kontrak': 'Contract File',
    'Tanggal Kontrak': 'Contract Date',
    'Margin (%)': 'Margin (%)',
    'Nama saksi / staff': 'Witness / staff name',
    'Nomor file, nama file, atau URL': 'File number, file name, or URL',
    'Nomor bukti, nama file, atau URL': 'Proof number, file name, or URL',
    'STNK/BPKB/Sertifikat atau -': 'STNK/BPKB/certificate or -',
    'Karyawan, wirausaha, petani...': 'Employee, entrepreneur, farmer...',
    'Contoh: Pinjaman, Kas, Laporan': 'Example: Loans, Cash, Reports',
    'Paket baru': 'New package',
    'Hapus': 'Delete',
    'Pilih pinjaman': 'Select loan',
    'Dokumen Lain': 'Other Document',
    'Verifikasi': 'Verification',
    'Blacklist': 'Blacklist',
    'Dilelang': 'Auctioned',
    'Pembayaran': 'Payment',
    'Pembayaran -': 'Payment -',
    'Catatan Pembayaran': 'Payment Record',
    'Catatan Kas Masuk': 'Cash In Record',
    'Catatan Kas Keluar': 'Cash Out Record',
    'Data User': 'User Data',
    'Pinjaman / Penhoria': 'Loan / Pawn',
    'Detail Pinjaman / Penhoria': 'Loan / Pawn Detail',
    'Denda Keterlambatan': 'Late Penalty',
    'Nonaktif': 'Inactive',
    'Semua modul': 'All modules',
    'Pinjaman, Kas, Laporan': 'Loans, Cash, Reports',
    'Administrasi & Finance': 'Administration & Finance',
    'Direktur': 'Director',
    'Finance Staff': 'Finance Staff',
    'Treasury': 'Treasury',
    'Accounting': 'Accounting',
    'IT': 'IT',
    'Receptionist': 'Receptionist',
    'BI': 'BI',
    'Eleitoral': 'Eleitoral',
    'Passport': 'Passport',
    'POS': 'POS',
    'Segera Jatuh Tempo': 'Due Soon',
    'Biaya administrasi kantor': 'Office administration fee',
    '3 bulan': '3 months',
    '6 bulan': '6 months',
    '12 bulan': '12 months',
    '$5,000 ke atas': '$5,000 and above'
  },
  zh: {
    'Buat Pinjaman Baru': '创建新贷款',
    'Input data klien, pinjaman, dan jaminan dari Dashboard.': '从仪表盘输入客户、贷款和抵押品资料。',
    'Gunakan form Pinjaman / Penhoria untuk mencatat kontrak pinjaman, margin, tanggal jatuh tempo, dan barang jaminan.': '使用贷款/典当表单记录贷款合同、利率、到期日和抵押品。',
    'Daftar kontrak pinjaman aktif dan historinya.': '有效贷款合同及历史记录列表。',
    'Catat cicilan, bunga, dan pelunasan pinjaman.': '记录贷款分期、利息和结清。',
    'Pantau pinjaman yang segera jatuh tempo atau terlambat.': '监控即将到期或已逾期的贷款。',
    'Kelola jaminan yang masuk proses lelang karena pinjaman macet.': '管理因坏账进入拍卖流程的抵押品。',
    'Pemasukan dari cicilan, pelunasan, margin, dan biaya admin.': '来自分期、结清、利率和管理费的收入。',
    'Pemasukan dari cicilan, pelunasan, margin, dan biaya administrasi.': '来自分期、结清、利率和管理费的收入。',
    'Dana pencairan pinjaman dan biaya operasional perusahaan.': '贷款放款资金和公司运营费用。',
    'Dana yang dicairkan kepada klien dan biaya operasional kantor.': '发放给客户的资金和办公室运营费用。',
    'Ringkasan modal, arus kas, pinjaman, margin, dan jaminan.': '资本、现金流、贷款、利率和抵押品概览。',
    'Dokumen perjanjian pinjaman dan serah terima jaminan.': '贷款协议和抵押品交接文件。',
    'Kelola akses staff berdasarkan fungsi organisasi perusahaan.': '根据公司组织职能管理员工访问权限。',
    'Profil perusahaan, paket pinjaman, margin, dan aturan jatuh tempo.': '公司资料、贷款套餐、利率和到期规则。',
    'Atur profil perusahaan, paket pinjaman, dan aturan margin.': '配置公司资料、贷款套餐和利率规则。',
    'Master data paket pinjaman yang bisa diedit sesuai kebijakan bisnis.': '可按业务政策编辑的贷款套餐主数据。',
    'Kelola barang dan dokumen aset yang dijadikan jaminan.': '管理作为抵押品的物品和资产文件。',
    'Jaminan dari pinjaman macet yang siap dijual.': '准备出售的坏账贷款抵押品。',
    'Kontrak Pinjaman': '贷款合同',
    'Metode Cair': '放款方式',
    'Total Bayar': '应还总额',
    'Cicilan Bulanan': '每月分期',
    'Potensi margin dari pinjaman': '贷款潜在收益',
    'Total pemasukan tercatat': '已记录总收入',
    'Total pencairan dan operasional': '放款和运营总额',
    'Total pembayaran, pelunasan, margin, dan pendapatan lain.': '还款、结清、利率收益和其他收入总计。',
    'Total pencairan pinjaman dan biaya operasional.': '贷款放款和运营费用总计。',
    'Potensi margin dari seluruh pinjaman tercatat.': '所有已记录贷款的潜在收益。',
    'Kontrak yang masih berjalan atau dalam proses.': '仍在执行或处理中 的合同。',
    'Data berhasil disimpan.': '数据保存成功。',
    'Data Berhasil Disimpan': '数据保存成功',
    'Pilih aksi lanjutan untuk arsip atau kirim ke klien.': '选择下一步操作：归档或发送给客户。',
    'Ringkasan Data': '数据摘要',
    'Belum ada data untuk dikirim.': '没有可发送的数据。',
    'Browser memblokir popup print.': '浏览器阻止了打印弹窗。',
    'Isi email atau username terlebih dahulu.': '请先输入邮箱或用户名。',
    'Login berhasil.': '登录成功。',
    'Modal belum tersedia di halaman ini.': '此页面没有可用的弹窗。',
    'Lengkapi data klien, jaminan, dan jumlah pinjaman lebih dari $0.': '请完整填写客户、抵押品资料，并确保贷款金额大于 $0。',
    'Belum ada tabel untuk diexport di halaman ini.': '此页面没有可导出的表格。',
    'Data berhasil diexport ke CSV.': '数据已成功导出为 CSV。',
    'Minimal harus ada 1 paket pinjaman.': '至少需要 1 个贷款套餐。',
    'Isi minimal 1 paket pinjaman.': '请至少填写 1 个贷款套餐。',
    'Paket pinjaman disimpan.': '贷款套餐已保存。',
    'Pengaturan disimpan.': '设置已保存。',
    'Tambah Klien': '添加客户',
    'Input data klien baru untuk penhoria.': '输入新的典当客户资料。',
    'Simpan Klien': '保存客户',
    'Tambah Jaminan': '添加抵押品',
    'Catat barang atau dokumen aset yang menjadi jaminan.': '记录作为抵押品的物品或资产文件。',
    'Simpan Jaminan': '保存抵押品',
    'Catat Pembayaran': '记录还款',
    'Input cicilan, margin, atau pelunasan klien.': '输入客户分期、利率付款或结清。',
    'Simpan Pembayaran': '保存还款',
    'Proses Lelang': '处理拍卖',
    'Catat jaminan dari pinjaman macet yang akan dilelang.': '记录将要拍卖的坏账贷款抵押品。',
    'Simpan Lelang': '保存拍卖',
    'Catat Kas Masuk': '记录现金收入',
    'Input pemasukan dari pembayaran, margin, atau biaya administrasi.': '输入来自还款、利率或管理费的收入。',
    'Simpan Kas Masuk': '保存现金收入',
    'Catat Kas Keluar': '记录现金支出',
    'Input pencairan dana atau biaya operasional.': '输入放款或运营费用。',
    'Simpan Kas Keluar': '保存现金支出',
    'Buat Kontrak': '创建合同',
    'Buat data kontrak pinjaman dengan jaminan.': '创建有抵押贷款合同记录。',
    'Simpan Kontrak': '保存合同',
    'Tambah User': '添加用户',
    'Input user staff dan role akses sistem.': '输入员工用户和系统访问角色。',
    'Simpan User': '保存用户',
    'No. Identitas': '证件号',
    'Pekerjaan': '职业',
    'Kondisi': '状态',
    'Referensi Foto': '照片参考',
    'Jenis Pembayaran': '付款类型',
    'Metode Bayar': '付款方式',
    'Angsuran Ke': '第几期',
    'Sisa Saldo Setelah Bayar': '付款后剩余余额',
    'Tanggal Lelang': '拍卖日期',
    'Metode Kas': '现金方式',
    'Lampiran / Bukti': '附件/凭证',
    'Lampiran': '附件',
    'File Kontrak': '合同文件',
    'Tanggal Kontrak': '合同日期',
    'Margin (%)': '利率 (%)',
    'Nama saksi / staff': '见证人/员工姓名',
    'Nomor file, nama file, atau URL': '文件编号、文件名或 URL',
    'Nomor bukti, nama file, atau URL': '凭证编号、文件名或 URL',
    'STNK/BPKB/Sertifikat atau -': '车辆/产权证书编号或 -',
    'Karyawan, wirausaha, petani...': '员工、个体经营者、农民...',
    'Contoh: Pinjaman, Kas, Laporan': '示例：贷款、现金、报表',
    'Paket baru': '新套餐',
    'Hapus': '删除',
    'Pilih pinjaman': '选择贷款',
    'Dokumen Lain': '其他文件',
    'Verifikasi': '核验',
    'Blacklist': '黑名单',
    'Dilelang': '已拍卖',
    'Pembayaran': '还款',
    'Pembayaran -': '还款 -',
    'Catatan Pembayaran': '还款记录',
    'Catatan Kas Masuk': '现金收入记录',
    'Catatan Kas Keluar': '现金支出记录',
    'Data User': '用户资料',
    'Pinjaman / Penhoria': '贷款/典当',
    'Detail Pinjaman / Penhoria': '贷款/典当详情',
    'Denda Keterlambatan': '逾期罚金',
    'Nonaktif': '停用',
    'Semua modul': '所有模块',
    'Pinjaman, Kas, Laporan': '贷款、现金、报表',
    'Administrasi & Finance': '行政与财务',
    'Direktur': '董事',
    'Finance Staff': '财务员工',
    'Treasury': '出纳',
    'Accounting': '会计',
    'IT': 'IT',
    'Receptionist': '前台',
    'BI': 'BI',
    'Eleitoral': 'Eleitoral',
    'Passport': '护照',
    'POS': 'POS',
    'Segera Jatuh Tempo': '即将到期',
    'Biaya administrasi kantor': '办公室行政费用',
    '3 bulan': '3个月',
    '6 bulan': '6个月',
    '12 bulan': '12个月',
    '$5,000 ke atas': '$5,000 以上'
  }
};

Object.assign(i18n.en, extraTranslations.en);
Object.assign(i18n.zh, extraTranslations.zh);

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

  window.location.href = 'pinjaman-baru.html';
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
  applyLanguage();
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
  applyLanguage();
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
    .map(item => `${translateText(item.label)}: ${translateText(item.value)}`);
  return `${translateText(title)}\n${lines.join('\n')}`;
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
            <option>Eleitoral</option>
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

  toast.textContent = translateText(message);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!dateString || Number.isNaN(date.getTime())) return '-';
  const locale = getLanguage() === 'en' ? 'en-US' : getLanguage() === 'zh' ? 'zh-CN' : 'id-ID';
  return date.toLocaleDateString(locale, {
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

function getLanguage() {
  const savedLanguage = localStorage.getItem('appLanguage') || 'id';
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'id';
}

function setLanguage(language) {
  localStorage.setItem('appLanguage', language);
  applyLanguage();
}

function translateText(text) {
  const language = getLanguage();
  const cleanText = String(text || '').trim();
  if (language === 'id' || !cleanText) return text;
  const exact = i18n[language]?.[cleanText];
  if (exact) return exact;

  const packageMatch = cleanText.match(/^Paket\s+(\d+)$/i);
  if (packageMatch) return language === 'zh' ? `套餐 ${packageMatch[1]}` : `Package ${packageMatch[1]}`;

  const monthsMatch = cleanText.match(/^(\d+)\s+bulan$/i);
  if (monthsMatch) return language === 'zh' ? `${monthsMatch[1]}个月` : `${monthsMatch[1]} months`;

  const loanDisbursementMatch = cleanText.match(/^Pencairan pinjaman\s+(.+)$/i);
  if (loanDisbursementMatch) {
    return language === 'zh'
      ? `贷款放款 ${loanDisbursementMatch[1]}`
      : `Loan disbursement ${loanDisbursementMatch[1]}`;
  }

  const notFoundMatch = cleanText.match(/^Data\s+(.+)\s+tidak ditemukan\.$/i);
  if (notFoundMatch) {
    return language === 'zh'
      ? `未找到数据 ${notFoundMatch[1]}。`
      : `Data ${notFoundMatch[1]} was not found.`;
  }

  const dynamicPrefixMatch = cleanText.match(/^(Data Klien|Data Jaminan|Pembayaran|Lelang|Kas Masuk|Kas Keluar|Kontrak|User|Pinjaman|Detail Pinjaman)\s+-\s+(.+)$/);
  if (dynamicPrefixMatch) {
    return `${translateText(dynamicPrefixMatch[1])} - ${dynamicPrefixMatch[2]}`;
  }

  if (cleanText.includes(' - ')) {
    const translatedParts = cleanText.split(' - ').map(part => translateText(part));
    if (translatedParts.some((part, index) => part !== cleanText.split(' - ')[index])) {
      return translatedParts.join(' - ');
    }
  }

  return text;
}

function preserveSpacing(original, translated) {
  const start = String(original).match(/^\s*/)?.[0] || '';
  const end = String(original).match(/\s*$/)?.[0] || '';
  return `${start}${translated}${end}`;
}

function injectLanguageSelector() {
  if (document.getElementById('languageSelect')) return;

  const wrapper = document.createElement('label');
  wrapper.className = 'language-switcher';
  wrapper.setAttribute('data-no-i18n', 'true');
  wrapper.innerHTML = `
    <span>Language</span>
    <select id="languageSelect" aria-label="Language">
      ${supportedLanguages.map(language => `<option value="${language}">${languageNames[language]}</option>`).join('')}
    </select>
  `;

  const target = document.querySelector('.topbar-actions') || document.querySelector('.login-card');
  if (!target) return;

  target.appendChild(wrapper);
  const select = document.getElementById('languageSelect');
  select.value = getLanguage();
  select.addEventListener('change', event => setLanguage(event.target.value));
}

function translateOptions() {
  document.querySelectorAll('option').forEach(option => {
    if (option.closest('[data-no-i18n]')) return;
    if (!originalOptionLabels.has(option)) {
      const originalLabel = option.textContent.trim();
      originalOptionLabels.set(option, originalLabel);
      if (!option.hasAttribute('value')) option.value = originalLabel;
    }

    const originalLabel = originalOptionLabels.get(option);
    option.textContent = translateText(originalLabel);
  });
}

function translatePlaceholders() {
  document.querySelectorAll('[placeholder]').forEach(element => {
    if (element.closest('[data-no-i18n]')) return;
    if (!originalPlaceholderValues.has(element)) {
      originalPlaceholderValues.set(element, element.getAttribute('placeholder'));
    }

    const originalPlaceholder = originalPlaceholderValues.get(element);
    element.setAttribute('placeholder', translateText(originalPlaceholder));
  });
}

function translateTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE', 'TEXTAREA', 'OPTION'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    if (!originalTextValues.has(node)) originalTextValues.set(node, node.nodeValue);
    const originalValue = originalTextValues.get(node);
    const translated = translateText(originalValue.trim());
    node.nodeValue = preserveSpacing(originalValue, translated);
  });
}

function applyLanguage() {
  const language = getLanguage();
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  const titleParts = originalDocumentTitle.split(' - ');
  if (titleParts.length > 1) {
    document.title = `${titleParts[0]} - ${translateText(titleParts.slice(1).join(' - '))}`;
  }

  const select = document.getElementById('languageSelect');
  if (select && select.value !== language) select.value = language;
  const languageLabel = document.querySelector('.language-switcher span');
  if (languageLabel) {
    languageLabel.textContent = language === 'zh' ? '语言' : language === 'id' ? 'Bahasa' : 'Language';
  }

  translateOptions();
  translatePlaceholders();
  translateTextNodes();
}

document.getElementById('loanDate')?.addEventListener('change', syncDueDate);
document.getElementById('duration')?.addEventListener('change', calculateLoan);
document.getElementById('modalOverlay')?.addEventListener('click', function(event) {
  if (event.target === this) closeModal();
});

injectLanguageSelector();
renderTemporaryDatabase();
