export const dashboardStyles = {
  // Layout styles
  container: "min-h-screen p-4 md:p-6 bg-[#050E1F] text-slate-100",

  // Header styles
  headerContainer: "bg-gradient-to-r from-[#5B6EF5]/15 to-[#A78BFA]/15 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-xl border border-white/10",
  headerContent: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8",
  headerTitle: "text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#5B6EF5] via-[#A78BFA] to-[#10C986] bg-clip-text text-transparent",
  headerSubtitle: "text-slate-400 mt-2",

  // Button styles
  addButton: "flex items-center gap-2 bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] hover:opacity-90 text-white px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 font-medium",

  // Time frame selector styles
  timeFrameContainer: "flex justify-end mt-4",
  timeFrameWrapper: "flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md",
  timeFrameButton: (isActive) =>
    `px-3 py-2 text-sm rounded-lg transition-all font-medium ${isActive
      ? "bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] text-white shadow-md"
      : "text-slate-400 hover:text-white hover:bg-white/5"
    }`,

  // Summary cards grid
  summaryGrid: "grid grid-cols-1 lg:-mx-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8",

  // Financial card styles
  balanceBadge: "bg-[#10C986]/15 text-[#10C986] border border-[#10C986]/30 px-2.5 py-1 rounded-lg text-xs font-semibold",
  expenseBadge: "bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold",

  // Gauge container styles
  gaugeGrid: "grid grid-cols-1 -mx-5 xl:-mx-5 md:grid-cols-3 md:gap-13 lg:gap-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",

  // Pie chart container styles
  pieChartContainer: "bg-[#0A1628] lg:-mx-5.5 md:-mx-4 lg:p-1 xl:-mx-3 rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden mb-8",
  pieChartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  pieChartTitle: "text-xl lg:pt-3 xl:pl-3 font-bold text-white mb-5 flex items-center gap-3",
  pieChartSubtitle: "text-sm lg:text-center xl:text-start xl:pl-3 text-slate-400 mb-3",
  pieChartHeight: "h-72 md:h-80 xl:h-80",

  // Pie chart tooltip styles
  tooltipContent: {
    backgroundColor: "#0A1628",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
    padding: "12px",
    color: "#fff",
  },
  tooltipItem: { fontWeight: 400, color: "#fff" },

  // Legend styles
  legendWrapper: { paddingTop: 8 },
  legendText: "text-sm font-medium text-slate-300",

  // Income/Expense lists grid
  listsGrid: "grid grid-cols-1 gap-6",

  // List container styles
  listContainer: "bg-[#0A1628] rounded-2xl lg:p-6 md:p-6 -mx-8 md:-mx-3 shadow-xl border border-white/10 mb-8",
  listHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  listTitle: "text-xl font-bold text-white md:mt-3 mt-3 flex items-center gap-3",
  listSubtitle: "text-sm text-slate-400 font-normal",

  // Record count badges
  incomeCountBadge: "text-sm bg-[#10C986]/15 border border-[#10C986]/30 px-3 mx-2 text-[#10C986] md:mx-2 md:mt-2 py-1 rounded-full font-medium",
  expenseCountBadge: "text-sm bg-rose-500/15 border border-rose-500/30 text-rose-400 px-3 mx-2 md:mx-2 md:mt-2 py-1 rounded-full font-medium",

  // Transaction item styles
  transactionList: "space-y-3",
  incomeTransactionItem: "flex items-center px-4 py-3 mx-2 my-2 justify-between bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-xl transition-all",
  expenseTransactionItem: "flex items-center justify-between mx-1 p-3 lg:p-3 md:p-4 md:mx-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-xl transition-all",

  // Transaction icon container
  incomeIconContainer: "p-2.5 bg-[#10C986]/15 text-[#10C986] rounded-xl border border-[#10C986]/20",
  expenseIconContainer: "p-2.5 bg-rose-500/15 text-rose-400 rounded-xl border border-rose-500/20",

  // Transaction content
  transactionContent: "flex items-center lg:gap-3 md:gap-3 gap-2",
  transactionDescription: "font-medium text-white",
  transactionCategory: "text-sm text-slate-400",
  transactionAmount: "text-right",
  incomeAmount: "font-bold text-[#10C986]",
  expenseAmount: "font-bold text-rose-400",
  transactionDate: "text-sm text-slate-400",

  // Empty state styles
  emptyState: "text-center py-8",
  emptyIconContainer: (color) => `w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center`,
  emptyText: "text-slate-300 font-medium",

  // View all button styles
  viewAllContainer: "pt-4 border-t border-white/10",
  viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-[#5B6EF5] font-medium hover:bg-white/5 rounded-xl transition-colors",

  // Icon container styles
  iconContainer: (color) => `p-2.5 bg-white/5 rounded-xl border border-white/10`,

  // Specific icon colors
  walletIconContainer: "p-2.5 bg-[#5B6EF5]/15 text-[#5B6EF5] rounded-xl border border-[#5B6EF5]/20",
  arrowDownIconContainer: "p-2.5 bg-rose-500/15 text-rose-400 rounded-xl border border-rose-500/20",
  piggyBankIconContainer: "p-2.5 bg-[#A78BFA]/15 text-[#A78BFA] rounded-xl border border-[#A78BFA]/20",
};

// Additional styles for financial trends
export const trendStyles = {
  positive: "text-rose-400",
  negative: "text-[#10C986]",
  positiveRate: "bg-[#10C986]/15 text-[#10C986] border border-[#10C986]/30",
  negativeRate: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
};

// Chart specific styles
export const chartStyles = {
  pieChart: "lg:-px-5 lg:text-xs xl:text-xl",
};

export const incomeStyles = {
  // Layout
  wrapper: "space-y-4 md:space-y-6 p-3 md:p-4 max-w-7xl mx-auto text-slate-100",
  headerContainer: "bg-[#0A1628] rounded-2xl p-5 md:p-6 mb-6 shadow-xl border border-white/10",
  header: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6",
  headerTitle: "text-xl md:text-2xl lg:text-3xl font-bold text-white",
  headerSubtitle: "text-slate-400 mt-1 text-sm md:text-base",
  addButton: "flex items-center gap-2 bg-gradient-to-r from-[#10C986] to-emerald-500 hover:opacity-90 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 font-medium text-sm md:text-base",

  // Summary Cards
  summaryGrid: "grid grid-cols-1 -mx-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5",

  // Chart
  chartContainer: "hidden md:block -mx-7 bg-[#0A1628] rounded-2xl p-6 shadow-xl border border-white/10",
  chartTitle: "text-lg md:text-xl font-bold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",

  // Transaction List
  listContainer: "bg-[#0A1628] rounded-2xl -mx-7 md:rounded-2xl p-4 md:p-6 shadow-xl border border-white/10 relative overflow-hidden",
  sectionTitle: "text-lg md:text-xl font-bold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",

  // Filter Section
  filterContainer: "flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto",
  filterSelect: "appearance-none bg-white/5 border border-white/15 text-white rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10C986] w-full",
  exportButton: "flex items-center justify-center gap-1.5 bg-white/5 border border-white/15 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded-xl transition-all text-sm font-medium w-full sm:w-auto",

  // Transaction Items
  transactionList: "space-y-3 -mx-3 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-[#10C986] font-medium hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center gap-2",

  // Empty State
  emptyStateContainer: "text-center py-6 md:py-8",
  emptyStateIcon: "w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center",
  emptyStateText: "text-slate-200 font-medium text-sm md:text-base",
  emptyStateSubtext: "text-xs md:text-sm text-slate-400 mt-1 md:mt-2",
  emptyStateButton: "mt-3 md:mt-4 flex items-center gap-2 bg-gradient-to-r from-[#10C986] to-emerald-500 hover:opacity-90 text-white px-4 py-2.5 rounded-xl transition-all shadow-md mx-auto text-sm md:text-base font-medium",

  // Time Frame Selector Container
  timeFrameContainer: "flex px-10 -mx-14 justify-center lg:-mx-0 md:-mx-0 lg:justify-end md:justify-end mt-4",

  // Chart header container 
  chartHeaderContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",

  // Chart height 
  chartHeight: "h-64 md:h-80",

  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "#0A1628",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
    padding: "12px",
    backdropFilter: "blur(10px)",
    color: "#fff",
  },

  // Icon container styles for summary cards 
  iconGreen: "p-2.5 bg-[#10C986]/15 text-[#10C986] rounded-xl border border-[#10C986]/20",
  iconBlue: "p-2.5 bg-[#5B6EF5]/15 text-[#5B6EF5] rounded-xl border border-[#5B6EF5]/20",
  iconPurple: "p-2.5 bg-[#A78BFA]/15 text-[#A78BFA] rounded-xl border border-[#A78BFA]/20",

  // Icon text colors 
  textGreen: "text-[#10C986]",
  textBlue: "text-[#5B6EF5]",
  textPurple: "text-[#A78BFA]",

  // Filter icon positioning 
  filterIcon: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none",

  borderGreen: "border-l-4 border-[#10C986]",
  borderBlue: "border-l-4 border-[#5B6EF5]",
  borderPurple: "border-l-4 border-[#A78BFA]",
};

export const expensePageStyles = {
  // Main container
  container: "space-y-6 max-w-7xl text-slate-100",

  // Header card
  headerCard: "bg-[#0A1628] rounded-2xl p-5 mb-8 shadow-xl border border-white/10",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6",
  headerTitle: "text-2xl md:text-3xl font-bold text-white",
  headerSubtitle: "text-slate-400 mt-1",
  addButton: "flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 font-medium",

  // Financial cards grid
  cardsGrid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5",

  // Chart container
  chartContainer: "hidden md:block bg-[#0A1628] rounded-2xl p-6 shadow-xl border border-white/10",
  chartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",
  chartTitle: "text-xl font-bold text-white mb-5 flex items-center gap-3",
  exportButton: "flex items-center gap-1.5 bg-white/5 border border-white/15 hover:bg-white/10 text-slate-200 px-4 py-2 rounded-xl transition-all text-sm font-medium",
  chart: "h-80",

  // Transactions container
  transactionsContainer: "bg-[#0A1628] rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden",
  transactionsHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-5",
  transactionsTitle: "text-lg md:text-xl font-bold text-white mb-4 md:mb-5 flex items-center gap-2 md:gap-3",
  filterSelect: "appearance-none bg-white/5 border border-white/15 text-white rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full",

  // Transaction items
  transactionsList: "space-y-3 -mx-2 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-orange-400 font-medium hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center gap-2",
  emptyState: "text-center py-8",
  emptyStateIcon: "w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center",
  emptyStateText: "text-slate-300 font-medium",
  emptyStateSubtext: "text-sm text-slate-400 mt-2",

  // Icons
  iconOrange: "p-2.5 bg-orange-500/15 text-orange-400 rounded-xl border border-orange-500/20",
  iconAmber: "p-2.5 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/20",
  iconYellow: "p-2.5 bg-yellow-500/15 text-yellow-400 rounded-xl border border-yellow-500/20",
  textOrange: "text-orange-400",
  textAmber: "text-amber-400",
  textYellow: "text-yellow-400",

  // Borders
  borderOrange: "border-l-4 border-orange-500",
  borderAmber: "border-l-4 border-amber-500",
  borderYellow: "border-l-4 border-yellow-500",

  tooltipContent: {
    backgroundColor: "#0A1628",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
    padding: "12px",
    backdropFilter: "blur(10px)",
    color: "#fff",
  },

  chartHeight: "h-80",
  chartExportButton: "flex items-center gap-1.5 bg-white/5 border border-white/15 hover:bg-white/10 text-slate-200 px-4 py-2 rounded-xl transition-all text-sm font-medium",
  timeframePositioning: "flex px-10 -mx-14 justify-center lg:-mx-0 md:-mx-0 lg:justify-end md:justify-end mt-4",
  transactionItemContainer: "flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.07] rounded-xl transition-all duration-300 border border-white/10 cursor-pointer mb-3 group text-white",
  transactionAmount: "font-bold text-white",
  transactionIcon: "p-3 rounded-xl bg-white/5 border border-white/10",
};

export const profileStyles = {
  // Container styles
  container: "max-w-4xl mx-auto py-8 px-4 text-slate-100",
  mainContainer: "bg-[#0A1628] rounded-2xl shadow-xl border border-white/10 overflow-hidden",

  // Header styles
  header: "bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] p-8 text-center",
  avatar: "w-24 h-24 mx-auto rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mb-4 text-white text-3xl font-bold shadow-lg backdrop-blur-md",
  userName: "text-2xl font-bold text-white",
  userEmail: "text-slate-200 mt-1 opacity-90",

  // Content styles
  content: "p-8",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",

  // Card styles
  card: "bg-white/[0.03] border border-white/10 rounded-2xl p-6",
  cardTitle: "text-xl font-semibold pb-3 text-white flex items-center border-b border-white/10 mb-4",
  icon: "w-5 h-5 mr-2 text-[#5B6EF5]",

  // Form styles
  label: "text-sm text-slate-400 block mb-1.5 font-medium",
  input: "w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#5B6EF5] focus:outline-none placeholder-slate-500",
  inputWithError: "w-full px-4 py-2.5 bg-white/5 border border-rose-500 text-white rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none",

  // Button styles
  buttonPrimary: "flex-1 bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] text-white py-2.5 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all",
  buttonSecondary: "flex-1 py-2.5 border border-white/15 text-slate-300 rounded-xl font-medium hover:bg-white/5 transition-all",
  editButton: "text-[#5B6EF5] hover:text-[#A78BFA] font-semibold text-sm transition-colors",
  changeButton: "text-[#5B6EF5] hover:text-[#A78BFA] font-semibold text-sm transition-colors",

  // Security item
  securityItem: "flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 mb-3",
  securityText: "font-medium text-sm text-slate-300",

  // Modal styles
  modalContent: "bg-[#0A1628] border border-white/15 rounded-2xl p-6 lg:px-8 w-full max-w-md shadow-2xl text-white",
  modalHeader: "flex justify-between items-center mb-6 border-b border-white/10 pb-4",
  modalTitle: "text-xl font-bold text-white",

  // Password input
  passwordLabel: "block text-sm font-medium text-slate-300 mb-1.5",
  passwordContainer: "relative",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white",

  // Error text
  errorText: "mt-1.5 text-sm text-rose-400"
};

export const modalStyles = {
  // Modal container
  overlay: "fixed inset-0 bg-[#050E1F]/80 backdrop-blur-md flex items-center justify-center p-4 z-50",
  modalContainer: "bg-[#0A1628] border border-white/15 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white",

  // Header
  modalHeader: "flex justify-between items-center mb-5 border-b border-white/10 pb-3",
  modalTitle: "text-xl font-bold text-white",
  closeButton: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors",

  // Form elements
  form: "space-y-4",
  label: "block text-sm font-medium text-slate-300 mb-1.5",
  input: (ringColor) => `w-full bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${ringColor}`,

  // Type buttons
  typeButtonContainer: "flex gap-3",
  typeButton: (isSelected, color) =>
    `flex-1 py-2.5 rounded-xl font-semibold transition-all ${isSelected
      ? `${color} text-white shadow-md`
      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
    }`,

  // Submit button
  submitButton: (color) => `w-full text-white py-3 rounded-xl font-semibold mt-4 shadow-lg transition-all ${color}`,

  colorClasses: {
    teal: {
      button: "bg-gradient-to-r from-[#10C986] to-emerald-500 hover:opacity-90",
      ring: "focus:ring-[#10C986]",
      typeButtonSelected: "bg-[#10C986]",
    },
    orange: {
      button: "bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90",
      ring: "focus:ring-orange-500",
      typeButtonSelected: "bg-orange-500",
    },
  },
};

export const loginStyles = {
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-[#050E1F]",
  cardContainer: "w-full max-w-md bg-[#0A1628] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white",
  header: "bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] p-6 text-center",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4 text-white text-3xl font-bold",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-slate-200 mt-1 text-sm",
  formContainer: "p-8",
  errorContainer: "mb-6 p-3 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-xl flex items-center text-sm",
  errorIcon: "w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center mr-3 shrink-0",
  errorText: "break-words",
  label: "block text-sm font-medium text-slate-300 mb-1.5",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400",
  input: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#5B6EF5] focus:outline-none placeholder-slate-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-white/5 border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#5B6EF5] focus:outline-none placeholder-slate-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white",
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-[#5B6EF5] border-white/20 rounded accent-[#5B6EF5]",
  checkboxLabel: "ml-2 block text-sm text-slate-400",
  button: "w-full bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all flex items-center justify-center",
  buttonDisabled: "opacity-60 cursor-not-allowed",
  signUpContainer: "mt-8 text-center",
  signUpText: "text-slate-400 text-sm",
  signUpLink: "font-semibold text-[#5B6EF5] hover:underline ml-1",
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};

export const navbarStyles = {
  header: "sticky top-0 z-50 bg-[#050E1F]/90 backdrop-blur-md border-b border-white/10 text-white shadow-lg",
  container: "flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto",
  logoContainer: "flex items-center gap-3 cursor-pointer",
  logoImage: "w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#5B6EF5] to-[#A78BFA] p-0.5 flex items-center justify-center",
  logoText: "lg:text-2xl md:text-2xl text-xl text-white font-extrabold tracking-tight font-sans",
  userContainer: "relative",
  userButton: "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10",
  userAvatar: "w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#5B6EF5] to-[#A78BFA] text-white font-bold text-base shadow-md",
  statusIndicator: "absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10C986] rounded-full border-2 border-[#050E1F]",
  userTextContainer: "text-left hidden md:block",
  userName: "text-sm font-semibold text-white truncate max-w-[120px]",
  userEmail: "text-xs text-slate-400 truncate max-w-[120px]",
  chevronIcon: (isOpen) => `w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`,
  dropdownMenu: "absolute top-14 right-0 w-64 bg-[#0A1628] border border-white/15 rounded-2xl shadow-2xl z-50 p-2 text-white",
  dropdownHeader: "px-4 py-3 border-b border-white/10 mb-1",
  dropdownAvatar: "w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B6EF5] to-[#A78BFA] flex items-center justify-center text-white font-bold text-lg shadow-md",
  dropdownName: "text-sm font-semibold text-white",
  dropdownEmail: "text-xs text-slate-400 truncate",
  menuItemContainer: "p-1",
  menuItem: "w-full px-4 py-2.5 text-left hover:bg-white/5 text-sm text-slate-200 flex items-center gap-3 rounded-xl transition-colors font-medium",
  menuItemBorder: "pt-1 border-t border-white/10 mt-1",
  logoutButton: "flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-rose-500/15 text-rose-400 rounded-xl transition-colors font-medium"
};

export const signupStyles = {
  ...loginStyles,
  header: "bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] p-6 text-center relative",
  backButton: "absolute top-4 left-4 p-2 text-white rounded-xl hover:bg-white/10 transition-colors",
  apiError: "mb-4 text-center text-sm text-rose-400",
  fieldError: "mt-1 text-sm text-rose-400",
  signInContainer: "mt-8 text-center",
  signInText: "text-slate-400 text-sm",
  signInLink: "font-semibold text-[#5B6EF5] hover:underline ml-1",
};

export const transactionItemStyles = {
  container: (isEditing, classes) =>
    `flex flex-col md:flex-row items-stretch justify-between gap-3 p-4 rounded-xl border border-white/10 mb-3 last:mb-0 ${isEditing ? "bg-[#0A1628]" : "bg-white/[0.03] hover:bg-white/[0.07]"} transition-all`,
  mainContainer: "flex items-center gap-3 flex-1 min-w-0",
  actionsContainer: "flex items-center justify-between gap-3 mt-2 md:mt-0",
  amountContainer: "min-w-[100px] flex-shrink-0 flex justify-end",
  buttonsContainer: "flex gap-1 flex-shrink-0",
  iconContainer: (iconClass, classes) => `${iconClass} ${classes.iconBg || 'bg-white/5 text-white'} border border-white/10`,
  contentContainer: "min-w-0 flex-1",
  description: "font-semibold text-white truncate",
  details: "text-xs text-slate-400 mt-1 truncate",
  input: (hasError, classes) =>
    `w-full bg-white/5 border text-white rounded-xl px-3 py-2 text-sm focus:outline-none ${hasError ? "border-rose-500 ring-1 ring-rose-500" : "border-white/15 focus:ring-1 focus:ring-[#5B6EF5]"}`,
  amountInput: (hasError, classes) =>
    `w-full max-w-[120px] bg-white/5 border text-white rounded-xl px-3 py-2 text-sm focus:outline-none ${hasError ? "border-rose-500 ring-1 ring-rose-500" : "border-white/15 focus:ring-1 focus:ring-[#5B6EF5]"}`,
  errorText: "text-xs text-rose-400 mt-1",
  amountText: (amountClass, classes) => `${amountClass} ${classes.text || 'text-white'}`,
  saveButton: (classes) => `p-2 bg-[#10C986] text-white rounded-xl hover:opacity-90 transition-all`,
  cancelButton: "p-2 bg-white/10 text-slate-300 rounded-xl hover:bg-white/20 transition-all",
  editButton: (classes) => `p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all`,
  deleteButton: (classes) => `p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all`
};

export const sidebarStyles = {
  sidebarContainer: {
    base: "hidden lg:flex flex-col pt-3 fixed top-16 bottom-0 z-30"
  },
  sidebarInner: {
    base: "bg-[#0A1628] border-r border-white/10 shadow-2xl h-full flex flex-col text-white"
  },
  userProfileContainer: {
    base: "p-4 border-b pt-20 md:pt-5 lg:pt-5 xl:pt-5 border-white/10",
    collapsed: "px-3",
    expanded: "px-6"
  },
  userInitials: {
    base: "w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B6EF5] to-[#A78BFA] flex items-center justify-center text-white font-extrabold text-xl shadow-md"
  },
  menuList: {
    base: "space-y-1 px-3"
  },
  menuItem: {
    base: "relative flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200",
    active: "text-white bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] shadow-lg shadow-indigo-500/20 font-semibold",
    inactive: "text-slate-400 hover:text-white hover:bg-white/5",
    collapsed: "justify-center px-0 mx-2",
    expanded: "px-4"
  },
  menuIcon: {
    active: "text-white",
    inactive: "text-slate-400"
  },
  activeIndicator: "absolute right-3 w-2 h-2 bg-white rounded-full",
  toggleButton: {
    base: "absolute -right-3 top-12 z-20 w-6 h-6 bg-[#0A1628] border border-white/20 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:border-[#5B6EF5] transition-all shadow-md"
  },
  footerContainer: {
    base: "border-t border-white/10 p-4",
    collapsed: "px-3",
    expanded: "px-6"
  },
  footerLink: {
    base: "flex items-center gap-3 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors",
    collapsed: "justify-center"
  },
  logoutButton: {
    base: "flex items-center gap-3 py-2.5 rounded-xl font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 w-full mt-1 transition-colors",
    collapsed: "justify-center"
  },
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-[#050E1F]/80 backdrop-blur-md",
  mobileSidebar: {
    base: "absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#0A1628] border-r border-white/10 shadow-2xl rounded-r-2xl overflow-hidden text-white"
  },
  mobileHeader: "p-6 flex justify-between items-center border-b border-white/10",
  mobileUserContainer: "flex pt-28 items-center gap-3",
  mobileCloseButton: "p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white",
  mobileMenuList: "space-y-1.5 px-4",
  mobileMenuItem: {
    base: "flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium transition-all",
    active: "text-white bg-gradient-to-r from-[#5B6EF5] to-[#A78BFA] shadow-lg",
    inactive: "text-slate-400 hover:text-white hover:bg-white/5"
  },
  mobileFooter: "border-t border-white/10 p-6",
  mobileFooterLink: "flex items-center gap-4 py-2 font-medium text-slate-400 hover:text-white",
  mobileLogoutButton: "flex items-center gap-4 py-2 font-medium text-slate-400 hover:text-rose-400 w-full",
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#5B6EF5] to-[#A78BFA] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20"
};

export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const styles = {
  layout: {
    root: "min-h-screen bg-[#050E1F] text-slate-100 font-sans",
    mainContainer: (sidebarCollapsed) =>
      `p-4 pt-6 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`,
  },
  header: {
    container: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
    title: "text-2xl md:text-3xl font-extrabold text-white tracking-tight",
    subtitle: "text-slate-400 text-sm",
  },
  statCards: {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6",
    card: "bg-[#0A1628] p-5 rounded-2xl shadow-xl border border-white/10",
    cardHeader: "flex justify-between items-start",
    cardTitle: "text-xs font-semibold uppercase tracking-wider text-slate-400",
    cardValue: "text-2xl font-extrabold text-white mt-1",
    iconContainer: (color) => `p-2.5 rounded-xl bg-white/5 border border-white/10`,
    icon: (color) => `w-5 h-5 text-slate-300`,
    cardFooter: "text-xs text-slate-400 mt-3",
  },
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    rightColumn: "lg:col-span-1 lg:-mx-3 space-y-6",
  },
  cards: {
    base: "bg-[#0A1628] rounded-2xl p-6 shadow-xl border border-white/10",
    header: "flex justify-between items-center mb-6 border-b border-white/10 pb-4",
    title: "text-xl font-bold text-white flex items-center gap-3",
    titleIcon: "w-6 h-6 text-[#5B6EF5]",
  },
  transactions: {
    cardHeader: "flex justify-between items-center mb-4 border-b border-white/10 pb-3",
    cardTitle: "text-md md:text-xl lg:text-xl xl:text-xl font-bold text-white flex items-center gap-3",
    refreshButton: "p-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white",
    refreshIcon: (loading) => `w-5 h-5 ${loading ? 'animate-spin' : ''}`,
    dataStackingInfo: "flex items-center gap-2 text-xs text-slate-400 mb-4 bg-white/5 p-2.5 rounded-xl border border-white/10",
    dataStackingIcon: "w-4 h-4 text-[#5B6EF5]",
    listContainer: "space-y-4 max-h-[500px] -mx-5 overflow-y-auto pr-2",
    transactionItem: "flex items-center lg:flex-col xl:flex-row md:flex-row justify-between p-3 lg:p-4 md:p-4 hover:bg-white/[0.05] rounded-xl transition-all duration-300 border border-white/10 bg-white/[0.02]",
    iconWrapper: (type) => type === 'income' ? 'bg-[#10C986]/15 text-[#10C986]' : 'bg-rose-500/15 text-rose-400',
    icon: "w-4 h-4",
    details: "min-w-0",
    description: "font-semibold text-white truncate max-w-[120px]",
    meta: "text-xs text-slate-400 mt-1",
    amount: (type) => `font-bold ${type === 'income' ? 'text-[#10C986]' : 'text-rose-400'}`,
    emptyState: "text-center py-8",
    emptyIconContainer: "w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center",
    emptyIcon: "w-8 h-8 text-[#A78BFA]",
    emptyText: "text-slate-300 font-medium",
    viewAllContainer: "pt-4 border-t border-white/10",
    viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-[#5B6EF5] font-semibold hover:bg-white/5 rounded-xl transition-colors",
  },
  categories: {
    title: "text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-white mb-6 flex items-center gap-3",
    titleIcon: "w-6 h-6 text-[#A78BFA]",
    list: "space-y-4",
    categoryItem: "flex items-center md:text-lg lg:text-sm xl:text-lg justify-between p-2 rounded-xl hover:bg-white/5 transition-colors",
    categoryIconContainer: "bg-white/5 border border-white/10 p-2.5 rounded-xl text-slate-300",
    categoryIcon: "w-4 h-4 text-slate-300",
    categoryName: "font-semibold text-slate-200",
    categoryAmount: "font-bold text-white",
    summaryContainer: "mt-6 pt-6 border-t border-white/10",
    summaryGrid: "grid grid-cols-2 gap-4",
    summaryIncomeCard: "bg-[#10C986]/10 border border-[#10C986]/20 rounded-xl p-4",
    summaryExpenseCard: "bg-rose-500/10 border border-rose-500/20 rounded-xl p-4",
    summaryTitle: "text-xs font-semibold uppercase tracking-wider text-slate-400",
    summaryValue: "text-base font-extrabold text-white mt-1",
  },
  colors: {
    transaction: {
      text: (type) => type === 'income' ? 'text-[#10C986]' : 'text-rose-400',
      bg: (type) => type === 'income' ? 'bg-[#10C986]/15 text-[#10C986] border border-[#10C986]/20' : 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
    },
    expenseChange: (change) => change > 0 ? 'text-rose-400' : 'text-[#10C986]',
  },
};