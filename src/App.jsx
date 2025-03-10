import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Improved UI components with better Tailwind styling
function Card(props) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md mb-4 p-6 overflow-hidden loan-card ${props.className || ''}`} 
      {...props}
    >
      {props.children}
    </div>
  );
}

function CardContent(props) {
  return <div className="space-y-3" {...props}>{props.children}</div>;
}

function Button(props) {
  const baseStyle = props.variant === 'primary' 
    ? 'btn-primary' 
    : props.variant === 'danger' 
      ? 'btn-danger' 
      : 'btn-secondary';

  return (
    <button
      className={`${baseStyle} ${props.className || ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      className="input-field mb-3"
      {...props}
    />
  );
}

function Label(props) {
  return (
    <label className="block mb-1 text-sm font-medium text-gray-700" {...props}>
      {props.children}
    </label>
  );
}

function UiSelect(props) {
  const { value, onChange, onValueChange } = props;
  return (
    <div className="mb-4">
      {props.children}
      <select 
        className="input-field"
        value={value} 
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          if (onValueChange) onValueChange(e.target.value);
        }}
        style={{display: 'none'}}
      >
        <option value="Spitzer">Spitzer</option>
        <option value="EqualPrincipal">Equal Principal</option>
        <option value="Balloon">Balloon</option>
      </select>
    </div>
  );
}

function SelectTrigger(props) {
  return (
    <div
      className="flex items-center justify-between p-3 mb-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
      {...props}
    >
      {props.children}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

function SelectValue(props) {
  return <span className="text-gray-700" {...props}>{props.placeholder}</span>;
}

function SelectContent(props) {
  return (
    <div className="absolute z-10 w-full mt-1 border border-gray-300 p-2 rounded-md bg-white shadow-lg" {...props}>
      {props.children}
    </div>
  );
}

function SelectItem(props) {
  return (
    <div 
      className="py-2 px-3 cursor-pointer hover:bg-blue-50 rounded-md transition-colors"
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}

// Translations
const translations = {
  en: {
    languageLabel: 'Language',
    appTitle: 'Loan Management Application',
    loanNameLabel: 'Loan Name',
    loanAmountLabel: 'Loan Amount',
    fixedInterestLabel: 'Fixed Annual Interest Rate',
    primeRateLabel: 'Prime Rate (Variable)',
    loanMonthsLabel: 'Number of Months',
    startDateLabel: 'Start Date',
    amortMethodLabel: 'Amortization Method',
    addLoan: 'Add Loan',
    saveLoan: 'Save Loan',
    noLoans: 'No loans added yet.',
    comparison: 'Loan Comparison',
    showSchedule: 'Show Schedule',
    hideSchedule: 'Hide Schedule',
    edit: 'Edit',
    remove: 'Remove',
    nextPayment: 'Next Payment',
    dueDate: 'Due Date',
    interest: 'Interest',
    principal: 'Principal',
    total: 'Total',
    fullyPaid: 'Loan is fully paid or no future payments.',
    monthsLeft: 'Months Left (approx)',
    method: 'Method',
    totalInterest: 'Total Interest',
    interestPaid: 'Interest Paid So Far',
    interestRemaining: 'Interest Remaining',
    totalPrincipal: 'Total Principal',
    principalPaid: 'Principal Paid So Far',
    principalRemaining: 'Principal Remaining',
    name: 'Name',
    loanId: 'Loan ID',
    amount: 'Amount',
    fixed: 'Fixed Interest',
    prime: 'Prime Rate',
    months: 'Months',
    chartComparison: 'Comparison Chart'
  },
  // ... he, ar, etc. omitted for brevity—same as your original
};

function isRTL(lang) {
  return lang === 'he' || lang === 'ar';
}

export default function LoanManagementApp() {
  const [loans, setLoans] = useState([]);
  const [lang, setLang] = useState('en');
  const [loanName, setLoanName] = useState('');

  // Detect user's country and set appropriate language
  useEffect(() => {
    async function detectCountry() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;

        // Set language based on country
        if (country === 'IL') {
          setLang('he');
        } else if (['AE', 'SA', 'EG', 'IQ', 'JO', 'KW', 'LB', 'OM', 'QA', 'SY'].includes(country)) {
          setLang('ar');
        }
        // Default is already 'en'
      } catch (error) {
        console.log("Could not detect country, using default language");
      }
    }

    detectCountry();
  }, []);
  const [loanAmount, setLoanAmount] = useState(0);
  const [fixedInterest, setFixedInterest] = useState(0);
  const [primeRate, setPrimeRate] = useState(0);
  const [amortizationMethod, setAmortizationMethod] = useState('Spitzer');
  const [loanMonths, setLoanMonths] = useState(12);
  const [startDate, setStartDate] = useState('');
  const [editingLoanId, setEditingLoanId] = useState(null);
  const [expandedLoanIds, setExpandedLoanIds] = useState([]);

  function toggleExpanded(loanId) {
    if (expandedLoanIds.includes(loanId)) {
      setExpandedLoanIds(expandedLoanIds.filter((id) => id !== loanId));
    } else {
      setExpandedLoanIds([...expandedLoanIds, loanId]);
    }
  }

  function addMonthsToDate(date, months) {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  function calculateAmortizationSchedule(loan) {
    const { loanAmount, fixedInterest, primeRate, amortizationMethod, loanMonths, startDate } = loan;
    const monthlyRate = (fixedInterest + primeRate) / 100 / 12;
    const schedule = [];
    let balance = loanAmount;
    let baseDate = null;
    const parsedStart = new Date(startDate);
    if (!isNaN(parsedStart.getTime())) {
      baseDate = parsedStart;
    }
    if (loanMonths <= 0) {
      return schedule;
    }
    let monthlyPayment = 0;
    if (amortizationMethod === 'Spitzer' && monthlyRate !== 0) {
      monthlyPayment =
        (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanMonths));
    } else if (amortizationMethod === 'Spitzer' && monthlyRate === 0) {
      monthlyPayment = balance / loanMonths;
    }
    for (let m = 1; m <= loanMonths; m++) {
      let interest = 0;
      let principal = 0;
      if (amortizationMethod === 'Spitzer') {
        interest = balance * monthlyRate;
        principal = monthlyPayment - interest;
      } else if (amortizationMethod === 'EqualPrincipal') {
        const principalPayment = loanAmount / loanMonths;
        interest = balance * monthlyRate;
        principal = Math.min(principalPayment, balance);
      } else {
        interest = balance * monthlyRate;
        principal = m === loanMonths ? balance : 0;
      }
      balance = Math.max(balance - principal, 0);
      let paymentDate;
      if (baseDate) {
        paymentDate = addMonthsToDate(baseDate, m);
      }
      schedule.push({ month: m, interest, principal, balance, paymentDate });
      if (balance <= 0) {
        break;
      }
    }
    return schedule;
  }

  function monthsPassed(loan) {
    if (!loan.startDate) return 0;
    const start = new Date(loan.startDate);
    const now = new Date();
    if (isNaN(start.getTime())) return 0;
    const totalMonthsPassed =
      now.getFullYear() * 12 +
      now.getMonth() -
      (start.getFullYear() * 12 + start.getMonth());
    return Math.min(Math.max(0, totalMonthsPassed), loan.loanMonths);
  }

  function monthsLeft(loan) {
    return loan.loanMonths - monthsPassed(loan);
  }

  function computePartialSums(loan) {
    const schedule = calculateAmortizationSchedule(loan);
    const totalInterest = schedule.reduce((acc, s) => acc + s.interest, 0);
    const totalPrincipal = schedule.reduce((acc, s) => acc + s.principal, 0);
    const paidMonths = monthsPassed(loan);
    const paidSchedule = schedule.slice(0, paidMonths);
    const interestPaidSoFar = paidSchedule.reduce((acc, s) => acc + s.interest, 0);
    const principalPaidSoFar = paidSchedule.reduce((acc, s) => acc + s.principal, 0);
    const interestRemaining = totalInterest - interestPaidSoFar;
    const principalRemaining = totalPrincipal - principalPaidSoFar;
    return {
      totalInterest,
      totalPrincipal,
      interestPaidSoFar,
      interestRemaining,
      principalPaidSoFar,
      principalRemaining,
      schedule,
      paidMonths
    };
  }

  function handleSubmit() {
    if (editingLoanId) {
      setLoans((prev) =>
        prev.map((loan) => {
          if (loan.id === editingLoanId) {
            return {
              ...loan,
              name: loanName.trim() || loan.name,
              loanAmount,
              fixedInterest,
              primeRate,
              amortizationMethod,
              loanMonths,
              startDate
            };
          }
          return loan;
        })
      );
      setEditingLoanId(null);
    } else {
      const newLoan = {
        id: Date.now(),
        name: loanName.trim() || `Loan #${Date.now()}`,
        loanAmount,
        fixedInterest,
        primeRate,
        amortizationMethod,
        loanMonths,
        startDate
      };
      setLoans((prev) => [...prev, newLoan]);
    }
    setLoanName('');
    setLoanAmount(0);
    setFixedInterest(0);
    setPrimeRate(0);
    setAmortizationMethod('Spitzer');
    setLoanMonths(12);
    setStartDate('');
  }

  function handleRemoveLoan(loanId) {
    setLoans((prev) => prev.filter((loan) => loan.id !== loanId));
    if (loanId === editingLoanId) {
      setEditingLoanId(null);
    }
  }

  function handleEditLoan(loan) {
    setEditingLoanId(loan.id);
    setLoanName(loan.name);
    setLoanAmount(loan.loanAmount);
    setFixedInterest(loan.fixedInterest);
    setPrimeRate(loan.primeRate);
    setAmortizationMethod(loan.amortizationMethod);
    setLoanMonths(loan.loanMonths);
    setStartDate(loan.startDate);
  }

  const chartData = loans.map((loan) => {
    const schedule = calculateAmortizationSchedule(loan);
    const totalInterest = schedule.reduce((acc, item) => acc + item.interest, 0);
    return {
      name: loan.name || `Loan #${loan.id}`,
      interest: totalInterest
    };
  });

  function formatDate(d) {
    if (!d) return '-';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function t(key) {
    if (!translations[lang] || !translations[lang][key]) {
      return translations['en'][key] || key;
    }
    return translations[lang][key];
  }
  const direction = isRTL(lang) ? 'rtl' : 'ltr';

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      style={{ direction }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header section with gradient */}
      <div className="header-gradient text-white p-6 mb-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('appTitle')}</h1>

          {/* Language selector */}
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-2">
            <Label htmlFor="languageSelect" className="mr-2 text-white">
              {t('languageLabel')}:
            </Label>
            <select
              id="languageSelect"
              className="bg-white bg-opacity-20 border border-white border-opacity-40 rounded p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en" className="text-gray-800 bg-white">English</option>
              <option value="he" className="text-gray-800 bg-white">עברית</option>
              <option value="ar" className="text-gray-800 bg-white">العربية</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan Form */}
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingLoanId ? t('saveLoan') : t('addLoan')}
              </h2>
              {editingLoanId && (
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setEditingLoanId(null);
                    setLoanName('');
                    setLoanAmount(0);
                    setFixedInterest(0);
                    setPrimeRate(0);
                    setAmortizationMethod('Spitzer');
                    setLoanMonths(12);
                    setStartDate('');
                  }}
                  className="text-sm"
                >
                  Cancel
                </Button>
              )}
            </div>

            <CardContent>
              <Label htmlFor="loanName">{t('loanNameLabel')}</Label>
              <Input
                id="loanName"
                type="text"
                placeholder="My Mortgage"
                value={loanName}
                onChange={(e) => setLoanName(e.target.value)}
              />

              <Label htmlFor="loanAmount">{t('loanAmountLabel')}</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fixedInterest">{t('fixedInterestLabel')}</Label>
                  <Input
                    id="fixedInterest"
                    type="number"
                    step="0.01"
                    value={fixedInterest}
                    onChange={(e) => setFixedInterest(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="primeRate">{t('primeRateLabel')}</Label>
                  <Input
                    id="primeRate"
                    type="number"
                    step="0.01"
                    value={primeRate}
                    onChange={(e) => setPrimeRate(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loanMonths">{t('loanMonthsLabel')}</Label>
                  <Input
                    id="loanMonths"
                    type="number"
                    value={loanMonths}
                    onChange={(e) => setLoanMonths(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">{t('startDateLabel')}</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <Label>{t('amortMethodLabel')}</Label>
              <div className="relative">
                <select
                  id="amortSelect"
                  className="input-field appearance-none pr-10"
                  value={amortizationMethod}
                  onChange={(e) => setAmortizationMethod(e.target.value)}
                >
                  <option value="Spitzer">Spitzer</option>
                  <option value="EqualPrincipal">Equal Principal</option>
                  <option value="Balloon">Balloon</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full mt-4" 
                onClick={handleSubmit}
              >
                {editingLoanId ? t('saveLoan') : t('addLoan')}
              </Button>
            </CardContent>
          </Card>

      {/* Loan Comparison Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">{t('comparison')}</h2>

              {loans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-gray-500 text-lg">{t('noLoans')}</p>
                  <p className="text-gray-400 mt-2">Add your first loan using the form on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loans.map((loan) => {
                    const {
                      totalInterest,
                      totalPrincipal,
                      interestPaidSoFar,
                      interestRemaining,
                      principalPaidSoFar,
                      principalRemaining,
                      schedule,
                      paidMonths
                    } = computePartialSums(loan);

                    const nextPaymentIndex = paidMonths;
                    const nextPayment =
                      nextPaymentIndex < schedule.length ? schedule[nextPaymentIndex] : undefined;

                    // Calculate progress percentages for visual indicators
                    const interestPaidPercent = totalInterest > 0 
                      ? (interestPaidSoFar / totalInterest) * 100 
                      : 0;

                    const principalPaidPercent = totalPrincipal > 0 
                      ? (principalPaidSoFar / totalPrincipal) * 100 
                      : 0;

                    const monthsPassedPercent = loan.loanMonths > 0 
                      ? (paidMonths / loan.loanMonths) * 100 
                      : 0;

                    // Data for mini donut chart
                    const paymentBreakdown = [
                      { name: 'Principal', value: totalPrincipal },
                      { name: 'Interest', value: totalInterest }
                    ];

                    const COLORS = ['#4f46e5', '#ef4444'];

                    return (
                      <Card key={loan.id} className="flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{loan.name}</h3>
                            <p className="text-gray-500 text-sm">{loan.amortizationMethod}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="secondary" 
                              className="p-2 h-8 w-8 flex items-center justify-center" 
                              onClick={() => handleEditLoan(loan)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </Button>
                            <Button 
                              variant="danger" 
                              className="p-2 h-8 w-8 flex items-center justify-center" 
                              onClick={() => handleRemoveLoan(loan.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </Button>
                          </div>
                        </div>

                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="stat-card">
                              <p className="text-xs text-gray-500 uppercase">{t('amount')}</p>
                              <p className="text-xl font-bold">{loan.loanAmount.toLocaleString()}</p>
                            </div>
                            <div className="stat-card">
                              <p className="text-xs text-gray-500 uppercase">{t('totalInterest')}</p>
                              <p className="text-xl font-bold text-blue-600">{totalInterest.toFixed(2)}</p>
                            </div>
                            <div className="stat-card">
                              <p className="text-xs text-gray-500 uppercase">{t('fixed')} + {t('prime')}</p>
                              <p className="text-xl font-bold">{loan.fixedInterest + loan.primeRate}%</p>
                              <div className="flex text-xs text-gray-500 mt-1">
                                <span className="mr-2">{loan.fixedInterest}% {t('fixed')}</span>
                                <span>{loan.primeRate}% {t('prime')}</span>
                              </div>
                            </div>
                            <div className="stat-card">
                              <p className="text-xs text-gray-500 uppercase">{t('months')}</p>
                              <p className="text-xl font-bold">{loan.loanMonths}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t('startDateLabel')}: {loan.startDate || 'Not set'}
                              </p>
                            </div>
                          </div>

                          {/* Progress bars */}
                          <div className="mb-4 space-y-3">
                            <div>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{t('monthsLeft')}: {monthsLeft(loan)}</span>
                                <span>{Math.round(monthsPassedPercent)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${monthsPassedPercent}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{t('principalPaid')}</span>
                                <span>{Math.round(principalPaidPercent)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${principalPaidPercent}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{t('interestPaid')}</span>
                                <span>{Math.round(interestPaidPercent)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${interestPaidPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Next payment card */}
                          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-blue-800">{t('nextPayment')}</h4>
                              {nextPayment && nextPayment.paymentDate && (
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {formatDate(nextPayment.paymentDate)}
                                </span>
                              )}
                            </div>

                            {nextPayment ? (
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white p-2 rounded-md">
                                  <p className="text-xs text-gray-500">{t('interest')}</p>
                                  <p className="font-semibold text-red-500">{nextPayment.interest.toFixed(2)}</p>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                  <p className="text-xs text-gray-500">{t('principal')}</p>
                                  <p className="font-semibold text-green-500">{nextPayment.principal.toFixed(2)}</p>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                  <p className="text-xs text-gray-500">{t('total')}</p>
                                  <p className="font-semibold">{(nextPayment.interest + nextPayment.principal).toFixed(2)}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-center text-blue-800">{t('fullyPaid')}</p>
                            )}
                          </div>

                          <Button 
                            variant="secondary"
                            className="w-full flex items-center justify-center"
                            onClick={() => toggleExpanded(loan.id)}
                          >
                            {expandedLoanIds.includes(loan.id) ? t('hideSchedule') : t('showSchedule')}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ml-2 transition-transform duration-200 ${expandedLoanIds.includes(loan.id) ? 'rotate-180' : ''}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Button>

                          {expandedLoanIds.includes(loan.id) && (
                            <div className="overflow-auto mt-4 bg-gray-50 rounded-lg p-4">
                              <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="p-2 text-left">{t('months')}</th>
                                    <th className="p-2 text-left">{t('dueDate')}</th>
                                    <th className="p-2 text-right">{t('interest')}</th>
                                    <th className="p-2 text-right">{t('principal')}}</th>
                                    <th className="p-2 text-right">{t('total')}</th>
                                    <th className="p-2 text-right">{t('principalRemaining')}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {schedule.map((entry, index) => (
                                    <tr 
                                      key={entry.month} 
                                      className={`border-t border-gray-100 ${index === nextPaymentIndex - 1 ? 'bg-blue-50' : ''}`}
                                    >
                                      <td className="p-2">{entry.month}</td>
                                      <td className="p-2">
                                        {entry.paymentDate ? formatDate(entry.paymentDate) : '-'}
                                      </td>
                                      <td className="p-2 text-right text-red-500">
                                        {entry.interest.toFixed(2)}
                                      </td>
                                      <td className="p-2 text-right text-green-500">
                                        {entry.principal.toFixed(2)}
                                      </td>
                                      <td className="p-2 text-right font-medium">
                                        {(entry.interest + entry.principal).toFixed(2)}
                                      </td>
                                      <td className="p-2 text-right">
                                        {entry.balance.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

      {loans.length > 0 && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">{t('chartComparison')}</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="bg-gray-50 rounded-lg p-4 h-80">
                    <h3 className="text-lg font-medium mb-4 text-center text-gray-700">{t('totalInterest')}</h3>
                    <ResponsiveContainer>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="interest" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Line Chart */}
                  <div className="bg-gray-50 rounded-lg p-4 h-80">
                    <h3 className="text-lg font-medium mb-4 text-center text-gray-700">{t('interest')} {t('comparison')}</h3>
                    <ResponsiveContainer>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="interest"
                          stroke="#4f46e5"
                          strokeWidth={3}
                          dot={{ r: 6, strokeWidth: 2 }}
                          activeDot={{ r: 8, strokeWidth: 0, fill: '#7c3aed' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}