import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

// Minimal stubs replaced with Tailwind utility classes
function Card(props) {
  return (
    <div className="border border-gray-300 rounded-xl mb-4 p-4" {...props}>
      {props.children}
    </div>
  );
}
function CardContent(props) {
  return <div {...props}>{props.children}</div>;
}
function Button(props) {
  // We can pass 'className' via props.className
  return (
    <button
      className={`px-4 py-2 m-1 border border-gray-300 rounded-md hover:bg-gray-100 ${props.className || ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
function Input(props) {
  return (
    <input
      className="block mb-2 p-1 border border-gray-300 rounded-md"
      {...props}
    />
  );
}
function Label(props) {
  return (
    <label className="block my-1 font-medium" {...props}>
      {props.children}
    </label>
  );
}
function UiSelect(props) {
  return <div {...props} />;
}
function SelectTrigger(props) {
  return (
    <div
      className="p-2 mb-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
      {...props}
    >
      {props.children}
    </div>
  );
}
function SelectValue(props) {
  return <span {...props} />;
}
function SelectContent(props) {
  return (
    <div className="border border-gray-300 p-2 mb-2 rounded-md bg-white" {...props}>
      {props.children}
    </div>
  );
}
function SelectItem(props) {
  return (
    <div className="py-1 px-2 cursor-pointer hover:bg-gray-100" {...props}>
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

  const t = (key) => translations[lang][key];
  const direction = isRTL(lang) ? 'rtl' : 'ltr';

  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-50"
      style={{ direction }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Language selector */}
      <div className="mb-4">
        <Label htmlFor="languageSelect" className="mr-2">
          {t('languageLabel')}:
        </Label>
        <select
          id="languageSelect"
          className="border rounded p-1"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="he">עברית</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <h1 className="text-2xl mb-4 font-bold">{t('appTitle')}</h1>

      <Card className="p-6 max-w-xl mb-6">
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

          <Label htmlFor="fixedInterest">{t('fixedInterestLabel')}</Label>
          <Input
            id="fixedInterest"
            type="number"
            step="0.01"
            value={fixedInterest}
            onChange={(e) => setFixedInterest(Number(e.target.value))}
          />

          <Label htmlFor="primeRate">{t('primeRateLabel')}</Label>
          <Input
            id="primeRate"
            type="number"
            step="0.01"
            value={primeRate}
            onChange={(e) => setPrimeRate(Number(e.target.value))}
          />

          <Label htmlFor="loanMonths">{t('loanMonthsLabel')}</Label>
          <Input
            id="loanMonths"
            type="number"
            value={loanMonths}
            onChange={(e) => setLoanMonths(Number(e.target.value))}
          />

          <Label htmlFor="startDate">{t('startDateLabel')}</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Label>{t('amortMethodLabel')}</Label>
          <UiSelect onValueChange={(val) => setAmortizationMethod(val)} value={amortizationMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Spitzer">Spitzer</SelectItem>
              <SelectItem value="EqualPrincipal">Equal Principal</SelectItem>
              <SelectItem value="Balloon">Balloon</SelectItem>
            </SelectContent>
          </UiSelect>

          <Button className="w-full" onClick={handleSubmit}>
            {editingLoanId ? t('saveLoan') : t('addLoan')}
          </Button>
        </CardContent>
      </Card>

      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">{t('comparison')}</h2>
        {loans.length === 0 ? (
          <p className="text-gray-500">{t('noLoans')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              return (
                <Card key={loan.id}>
                  <CardContent>
                    <p className="mb-1">
                      <strong>{t('name')}:</strong> {loan.name}
                    </p>
                    <p className="mb-1">
                      <strong>{t('loanId')}:</strong> {loan.id}
                    </p>
                    <p className="mb-1">
                      <strong>{t('amount')}:</strong> {loan.loanAmount}
                    </p>
                    <p className="mb-1">
                      <strong>{t('fixed')}:</strong> {loan.fixedInterest}%
                    </p>
                    <p className="mb-1">
                      <strong>{t('prime')}:</strong> {loan.primeRate}%
                    </p>
                    <p className="mb-1">
                      <strong>{t('months')}:</strong> {loan.loanMonths}
                    </p>
                    <p className="mb-1">
                      <strong>{t('startDateLabel')}:</strong> {loan.startDate || 'Not set'}
                    </p>
                    <p className="mb-1">
                      <strong>{t('monthsLeft')}:</strong> {monthsLeft(loan)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('method')}:</strong> {loan.amortizationMethod}
                    </p>

                    <hr className="my-2" />
                    <p className="mb-1">
                      <strong>{t('totalInterest')}:</strong> {totalInterest.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('interestPaid')}:</strong> {interestPaidSoFar.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('interestRemaining')}:</strong> {interestRemaining.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('totalPrincipal')}:</strong> {totalPrincipal.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('principalPaid')}:</strong> {principalPaidSoFar.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t('principalRemaining')}:</strong> {principalRemaining.toFixed(2)}
                    </p>

                    <div className="bg-gray-100 p-2 my-2 rounded-xl">
                      <p className="font-semibold mb-1">{t('nextPayment')}:</p>
                      {nextPayment ? (
                        <div>
                          <p>
                            <strong>{t('dueDate')}:</strong>{' '}
                            {nextPayment.paymentDate ? formatDate(nextPayment.paymentDate) : '-'}
                          </p>
                          <p>
                            <strong>{t('interest')}:</strong> {nextPayment.interest.toFixed(2)}
                          </p>
                          <p>
                            <strong>{t('principal')}:</strong> {nextPayment.principal.toFixed(2)}
                          </p>
                          <p>
                            <strong>{t('total')}:</strong>{' '}
                            {(nextPayment.interest + nextPayment.principal).toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p>{t('fullyPaid')}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button onClick={() => toggleExpanded(loan.id)}>
                        {expandedLoanIds.includes(loan.id)
                          ? t('hideSchedule')
                          : t('showSchedule')}
                      </Button>
                      <Button onClick={() => handleEditLoan(loan)}>
                        {t('edit')}
                      </Button>
                      <Button onClick={() => handleRemoveLoan(loan.id)}>
                        {t('remove')}
                      </Button>
                    </div>

                    {expandedLoanIds.includes(loan.id) && (
                      <div className="overflow-auto mt-4">
                        <table className="w-full text-sm border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 border border-gray-200">{t('months')}</th>
                              <th className="p-2 border border-gray-200">{t('dueDate')}</th>
                              <th className="p-2 border border-gray-200">{t('interest')}</th>
                              <th className="p-2 border border-gray-200">{t('principal')}</th>
                              <th className="p-2 border border-gray-200">{t('total')}</th>
                              <th className="p-2 border border-gray-200">
                                {t('principalRemaining')}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((entry) => (
                              <tr key={entry.month}>
                                <td className="p-2 border border-gray-200">{entry.month}</td>
                                <td className="p-2 border border-gray-200">
                                  {entry.paymentDate ? formatDate(entry.paymentDate) : '-'}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {entry.interest.toFixed(2)}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {entry.principal.toFixed(2)}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {(entry.interest + entry.principal).toFixed(2)}
                                </td>
                                <td className="p-2 border border-gray-200">
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
      </motion.div>

      {loans.length > 1 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">{t('chartComparison')}</h2>
          <div className="w-full h-64 bg-white rounded-2xl shadow p-4">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
