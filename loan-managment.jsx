import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Card(props) {
  return (
    <div
      className="border border-gray-200 rounded-lg mb-4 p-4 shadow-md hover:shadow-lg transition-shadow"
      {...props}
    >
      {props.children}
    </div>
  );
}
function CardContent(props) {
  return <div {...props}>{props.children}</div>;
}
function Button(props) {
  // Check if button contains action text regardless of language
  const isActionButton = [
    "addLoan",
    "saveLoan",
    "showSchedule",
    "hideSchedule",
  ].some((key) => {
    try {
      return Object.values(translations).some(
        (langObj) => langObj[key] === props.children,
      );
    } catch (e) {
      return false;
    }
  });

  const isMainAction = ["addLoan", "saveLoan"].some((key) => {
    try {
      return Object.values(translations).some(
        (langObj) => langObj[key] === props.children,
      );
    } catch (e) {
      return false;
    }
  });
  console.log(props.children);
  return (
    <button
      style={{
        padding: "0.8rem 1.2rem",
        margin: "0.2rem",
        border: "none",
        borderRadius: "8px",
        backgroundColor: isMainAction
          ? "#2563EB"
          : isActionButton
            ? "#4CAF50"
            : "#E5E7EB",
        color: isActionButton ? "white" : "#374151",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontWeight: "600",
        boxShadow: isMainAction
          ? "0 4px 6px rgba(37, 99, 235, 0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        width: props.className?.includes("w-full") ? "100%" : "auto",
        transform: "translateY(0)",
        "&:hover": {
          transform: isMainAction ? "translateY(-2px)" : "none",
          boxShadow: isMainAction
            ? "0 6px 8px rgba(37, 99, 235, 0.3)"
            : "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: isMainAction
            ? "#1d4ed8"
            : isActionButton
              ? "#43A047"
              : "#D1D5DB",
        },
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
function Input(props) {
  return (
    <input
      style={{ display: "block", marginBottom: "0.5rem", padding: "0.25rem" }}
      {...props}
    />
  );
}
function Label(props) {
  return (
    <label style={{ display: "block", margin: "0.3rem 0" }} {...props}>
      {props.children}
    </label>
  );
}

function UiSelect(props) {
  return <div {...props}>{props.children}</div>;
}
function SelectTrigger(props) {
  const isRtl = isRTL(lang);
  return (
    <div
      style={{
        padding: "0.4rem 0.6rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "0.5rem",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: isRtl ? "flex-end" : "space-between",
        paddingRight: "2rem",
      }}
      {...props}
    >
      {props.children}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          [isRtl ? "left" : "right"]: "10px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
function SelectValue(props) {
  return <span {...props}>{props.children}</span>;
}
function SelectContent(props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0.25rem",
        marginBottom: "0.5rem",
        position: "absolute",
        width: "100%",
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: "4px",
        marginTop: "2px",
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}
function SelectItem(props) {
  return (
    <div style={{ padding: "0.25rem 0", cursor: "pointer" }} {...props}>
      {props.children}
    </div>
  );
}

const translations = {
  en: {
    addFirstLoan: "Add your first loan using the form on the left",
    languageLabel: "Language",
    appTitle: "4eyesloan",
    loanNameLabel: "Loan Name",
    loanAmountLabel: "Loan Amount",
    fixedInterestLabel: "Fixed Annual Interest Rate",
    primeRateLabel: "Prime Rate (Variable)",
    loanMonthsLabel: "Number of Months",
    startDateLabel: "Start Date",
    amortMethodLabel: "Amortization Method",
    addLoan: "Add Loan",
    saveLoan: "Save Loan",
    noLoans: "No loans added yet.",
    comparison: "Loan Comparison",
    showSchedule: "Show Schedule",
    hideSchedule: "Hide Schedule",
    edit: "Edit",
    remove: "Remove",
    nextPayment: "Next Payment",
    dueDate: "Due Date",
    interest: "Interest",
    principal: "Principal",
    total: "Total",
    fullyPaid: "Loan is fully paid or no future payments.",
    monthsLeft: "Months Left (approx)",
    method: "Method",
    totalInterest: "Total Interest",
    interestPaid: "Interest Paid So Far",
    interestRemaining: "Interest Remaining",
    totalPrincipal: "Total Principal",
    principalPaid: "Principal Paid So Far",
    principalRemaining: "Principal Remaining",
    name: "Name",
    loanId: "Loan ID",
    amount: "Amount",
    fixed: "Fixed Interest",
    prime: "Prime Rate",
    months: "Months",
    chartComparison: "Comparison Chart",
    spitzerMethod: "Spitzer (Fixed Payment)",
    equalPrincipalMethod: "Equal Principal",
    balloonMethod: "Balloon Payment",
  },
  he: {
    addFirstLoan: "הוסף הלוואה ראשונה באמצעות הטופס משמאל",
    languageLabel: "שפה",
    appTitle: "ניהול הלוואות",
    loanNameLabel: "שם הלוואה",
    loanAmountLabel: "סכום ההלוואה",
    fixedInterestLabel: "ריבית קבועה שנתית",
    primeRateLabel: "ריבית פריים (משתנה)",
    loanMonthsLabel: "מספר חודשים",
    startDateLabel: "תאריך התחלה",
    amortMethodLabel: "שיטת החזר",
    addLoan: "הוסף הלוואה",
    saveLoan: "שמור הלוואה",
    noLoans: "לא נוספו הלוואות",
    comparison: "השוואת הלוואות",
    showSchedule: "הצג לוח סילוקין",
    hideSchedule: "הסתר לוח סילוקין",
    edit: "ערוך",
    remove: "מחק",
    nextPayment: "תשלום הבא",
    dueDate: "תאריך תשלום",
    interest: "ריבית",
    principal: "קרן",
    total: "סך הכל",
    fullyPaid: "ההלוואה שולמה במלואה או אין תשלומים נוספים",
    monthsLeft: "חודשים שנותרו (בערך)",
    method: "שיטה",
    totalInterest: "סך הריבית",
    interestPaid: "ריבית שכבר שולמה",
    interestRemaining: "יתרת ריבית",
    totalPrincipal: "סך הקרן",
    principalPaid: "קרן ששולמה",
    principalRemaining: "יתרת קרן",
    name: "שם",
    loanId: "מזהה הלוואה",
    amount: "סכום",
    fixed: "ריבית קבועה",
    prime: "ריבית פריים",
    months: "חודשים",
    chartComparison: "תרשים השוואה",
  },
  ar: {
    addFirstLoan: "أضف أول قرض لك باستخدام النموذج الموجود على اليسار",
    languageLabel: "اللغة",
    appTitle: "إدارة القروض",
    loanNameLabel: "اسم القرض",
    loanAmountLabel: "مبلغ القرض",
    fixedInterestLabel: "فائدة سنوية ثابتة",
    primeRateLabel: "نسبة الأساس (متغيرة)",
    loanMonthsLabel: "عدد الأشهر",
    startDateLabel: "تاريخ البدء",
    amortMethodLabel: "طريق{� السداد",
    addLoan: "إضافة قرض",
    saveLoan: "حفظ القرض",
    noLoans: "لم يتم إضافة أي قروض.",
    comparison: "مقارنة القروض",
    showSchedule: "عرض جدول السداد",
    hideSchedule: "إخفاء جدول السداد",
    edit: "تعديل",
    remove: "حذف",
    nextPayment: "الدفعة التالية",
    dueDate: "تاريخ الاستحقاق",
    interest: "الفائدة",
    principal: "الأصل",
    total: "الإجمالي",
    fullyPaid: "تم سداد القرض بالكامل أو لا توجد دفعات مستقبلية.",
    monthsLeft: "الأشهر المتبقية (تقريبي)",
    method: "الطريقة",
    totalInterest: "إجمالي الفائدة",
    interestPaid: "الفائدة المدفوعة حتى الآن",
    interestRemaining: "الفائدة المتبقية",
    totalPrincipal: "إجمالي الأصل",
    principalPaid: "الأصل المدفوع حتى الآن",
    principalRemaining: "الأصل المتبقي",
    name: "الاسم",
    loanId: "معرّف القرض",
    amount: "المبلغ",
    fixed: "فائدة ثابتة",
    prime: "نسبة الأساس",
    months: "الأشهر",
    chartComparison: "مخطط المقارنة",
  },
};

function isRTL(lang) {
  return lang === "he" || lang === "ar";
}

export default function LoanManagementApp() {
  const [loans, setLoans] = useState([]);
  const [lang, setLang] = useState("en");
  const [loanName, setLoanName] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [fixedInterest, setFixedInterest] = useState(0);
  const [primeRate, setPrimeRate] = useState(0);
  const [amortizationMethod, setAmortizationMethod] = useState("Spitzer");
  const [loanMonths, setLoanMonths] = useState(12);
  const [startDate, setStartDate] = useState("");
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
    const {
      loanAmount,
      fixedInterest,
      primeRate,
      amortizationMethod,
      loanMonths,
      startDate,
    } = loan;
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
    if (amortizationMethod === "Spitzer" && monthlyRate !== 0) {
      monthlyPayment =
        (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanMonths));
    } else if (amortizationMethod === "Spitzer" && monthlyRate === 0) {
      monthlyPayment = balance / loanMonths;
    }
    for (let m = 1; m <= loanMonths; m++) {
      let interest = 0;
      let principal = 0;
      if (amortizationMethod === "Spitzer") {
        interest = balance * monthlyRate;
        principal = monthlyPayment - interest;
      } else if (amortizationMethod === "EqualPrincipal") {
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
    const { startDate, loanMonths } = loan;
    if (!startDate) return 0;
    const start = new Date(startDate);
    const now = new Date();
    if (isNaN(start.getTime())) {
      return 0;
    }
    const totalMonthsPassed =
      now.getFullYear() * 12 +
      now.getMonth() -
      (start.getFullYear() * 12 + start.getMonth());
    return Math.min(Math.max(0, totalMonthsPassed), loanMonths);
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
    const interestPaidSoFar = paidSchedule.reduce(
      (acc, s) => acc + s.interest,
      0,
    );
    const principalPaidSoFar = paidSchedule.reduce(
      (acc, s) => acc + s.principal,
      0,
    );
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
      paidMonths,
    };
  }
  function handleSubmit() {
    if (editingLoanId) {
      setLoans((loans) =>
        loans.map((loan) => {
          if (loan.id === editingLoanId) {
            return {
              ...loan,
              name: loanName.trim() || loan.name,
              loanAmount,
              fixedInterest,
              primeRate,
              amortizationMethod,
              loanMonths,
              startDate,
            };
          }
          return loan;
        }),
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
        startDate,
      };
      setLoans((prev) => [...prev, newLoan]);
    }
    setLoanName("");
    setLoanAmount(0);
    setFixedInterest(0);
    setPrimeRate(0);
    setAmortizationMethod("Spitzer");
    setLoanMonths(12);
    setStartDate("");
  }
  function handleRemoveLoan(loanId) {
    setLoans((loans) => loans.filter((loan) => loan.id !== loanId));
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
    const totalInterest = schedule.reduce(
      (acc, item) => acc + item.interest,
      0,
    );
    return {
      name: loan.name || `Loan #${loan.id}`,
      interest: totalInterest,
    };
  });
  function formatDate(d) {
    if (!d) return "-";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function t(key) {
    try {
      if (!translations[lang]) {
        return translations.en[key] || key;
      }
      return translations[lang][key] !== undefined
        ? translations[lang][key]
        : translations.en[key] || key;
    } catch (e) {
      console.warn(
        `Error in translation for key '${key}' in language '${lang}'`,
        e,
      );
      return key;
    }
  }
  const direction = isRTL(lang) ? "rtl" : "ltr";
  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-50"
      style={{ direction, textAlign: direction === "rtl" ? "right" : "left" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-end">
        <Label
          htmlFor="languageSelect"
          className={`${direction === "rtl" ? "ml-2" : "mr-2"}`}
        >
          {t("languageLabel")}:
        </Label>
        <select
          id="languageSelect"
          className="border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ direction: "ltr" }}
        >
          <option value="en">English</option>
          <option value="he" style={{ direction: "rtl" }}>
            עברית
          </option>
          <option value="ar" style={{ direction: "rtl" }}>
            العربية
          </option>
        </select>
      </div>
      <h1 className="text-2xl mb-4 font-bold">{t("appTitle")}</h1>
      <Card className="p-6 max-w-xl mb-6">
        <CardContent>
          <Label htmlFor="loanName">{t("loanNameLabel")}</Label>
          <Input
            id="loanName"
            className="mb-2"
            type="text"
            placeholder="My Mortgage"
            value={loanName}
            onChange={(e) => setLoanName(e.target.value)}
          />
          <Label htmlFor="loanAmount">{t("loanAmountLabel")}</Label>
          <Input
            id="loanAmount"
            className="mb-2"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          <Label htmlFor="fixedInterest">{t("fixedInterestLabel")}</Label>
          <Input
            id="fixedInterest"
            className="mb-2"
            type="number"
            step="0.01"
            value={fixedInterest}
            onChange={(e) => setFixedInterest(Number(e.target.value))}
          />
          <Label htmlFor="primeRate">{t("primeRateLabel")}</Label>
          <Input
            id="primeRate"
            className="mb-2"
            type="number"
            step="0.01"
            value={primeRate}
            onChange={(e) => setPrimeRate(Number(e.target.value))}
          />
          <Label htmlFor="loanMonths">{t("loanMonthsLabel")}</Label>
          <Input
            id="loanMonths"
            className="mb-2"
            type="number"
            value={loanMonths}
            onChange={(e) => setLoanMonths(Number(e.target.value))}
          />
          <Label htmlFor="startDate">{t("startDateLabel")}</Label>
          <Input
            id="startDate"
            className="mb-2"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Label>{t("amortMethodLabel")}</Label>
          <UiSelect>
            {(() => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <>
                  <SelectTrigger
                    className="mb-2"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                      position: "relative",
                      paddingInlineEnd: "2rem",
                      paddingInlineStart: "0.75rem",
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <SelectValue
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {amortizationMethod}
                    </SelectValue>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{
                        position: "absolute",
                        [direction === "rtl" ? "left" : "right"]: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      display: isOpen ? "block" : "none",
                      marginTop: "0.25rem",
                      position: "absolute",
                      width: "100%",
                      zIndex: 10,
                    }}
                  >
                    <SelectItem
                      onClick={() => {
                        setAmortizationMethod("Spitzer");
                        setIsOpen(false);
                      }}
                    >
                      {t("spitzerMethod")}
                    </SelectItem>
                    <SelectItem
                      onClick={() => {
                        setAmortizationMethod("EqualPrincipal");
                        setIsOpen(false);
                      }}
                    >
                      {t("equalPrincipalMethod")}
                    </SelectItem>
                    <SelectItem
                      onClick={() => {
                        setAmortizationMethod("Balloon");
                        setIsOpen(false);
                      }}
                    >
                      {t("balloonMethod")}
                    </SelectItem>
                  </SelectContent>
                </>
              );
            })()}
          </UiSelect>
          <Button className="w-full" onClick={handleSubmit}>
            {editingLoanId ? t("saveLoan") : t("addLoan")}
          </Button>
        </CardContent>
      </Card>
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">{t("comparison")}</h2>
        {loans.length === 0 ? (
          <p className="text-gray-500">{t("noLoans")}</p>
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
                paidMonths,
              } = computePartialSums(loan);
              const nextPaymentIndex = paidMonths;
              const nextPayment =
                nextPaymentIndex < schedule.length
                  ? schedule[nextPaymentIndex]
                  : undefined;
              return (
                <Card key={loan.id} className="p-4">
                  <CardContent>
                    <p className="mb-1">
                      <strong>{t("name")}:</strong> {loan.name}
                    </p>
                    <p className="mb-1">
                      <strong>{t("loanId")}:</strong> {loan.id}
                    </p>
                    <p className="mb-1">
                      <strong>{t("amount")}:</strong> {loan.loanAmount}
                    </p>
                    <p className="mb-1">
                      <strong>{t("fixed")}:</strong> {loan.fixedInterest}%
                    </p>
                    <p className="mb-1">
                      <strong>{t("prime")}:</strong> {loan.primeRate}%
                    </p>
                    <p className="mb-1">
                      <strong>{t("months")}:</strong> {loan.loanMonths}
                    </p>
                    <p className="mb-1">
                      <strong>{t("startDateLabel")}:</strong>{" "}
                      {loan.startDate || "Not set"}
                    </p>
                    <p className="mb-1">
                      <strong>{t("monthsLeft")}:</strong> {monthsLeft(loan)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("method")}:</strong> {loan.amortizationMethod}
                    </p>
                    <hr className="my-2" />
                    <p className="mb-1">
                      <strong>{t("totalInterest")}:</strong>{" "}
                      {totalInterest.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("interestPaid")}:</strong>{" "}
                      {interestPaidSoFar.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("interestRemaining")}:</strong>{" "}
                      {interestRemaining.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("totalPrincipal")}:</strong>{" "}
                      {totalPrincipal.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("principalPaid")}:</strong>{" "}
                      {principalPaidSoFar.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      <strong>{t("principalRemaining")}:</strong>{" "}
                      {principalRemaining.toFixed(2)}
                    </p>
                    <div className="bg-gray-100 p-2 my-2 rounded-xl">
                      <p className="font-semibold mb-1">{t("nextPayment")}:</p>
                      {nextPayment ? (
                        <div>
                          <p>
                            <strong>{t("dueDate")}:</strong>{" "}
                            {nextPayment.paymentDate
                              ? formatDate(nextPayment.paymentDate)
                              : "-"}
                          </p>
                          <p>
                            <strong>{t("interest")}:</strong>{" "}
                            {nextPayment.interest.toFixed(2)}
                          </p>
                          <p>
                            <strong>{t("principal")}:</strong>{" "}
                            {nextPayment.principal.toFixed(2)}
                          </p>
                          <p>
                            <strong>{t("total")}:</strong>{" "}
                            {(
                              nextPayment.interest + nextPayment.principal
                            ).toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p>{t("fullyPaid")}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button onClick={() => toggleExpanded(loan.id)}>
                        {expandedLoanIds.includes(loan.id)
                          ? t("hideSchedule")
                          : t("showSchedule")}
                      </Button>
                      <Button onClick={() => handleEditLoan(loan)}>
                        {t("edit")}
                      </Button>
                      <Button onClick={() => handleRemoveLoan(loan.id)}>
                        {t("remove")}
                      </Button>
                    </div>
                    {expandedLoanIds.includes(loan.id) && (
                      <div className="overflow-auto mt-4">
                        <div className="mb-2 flex gap-2">
                          <Button
                            onClick={() => {
                              const headers = [
                                "Month",
                                "Due Date",
                                "Interest",
                                "Principal",
                                "Total",
                                "Balance",
                              ];
                              const csvContent = [
                                headers.join(","),
                                ...schedule.map((entry) =>
                                  [
                                    entry.month,
                                    entry.paymentDate
                                      ? formatDate(entry.paymentDate)
                                      : "-",
                                    entry.interest.toFixed(2),
                                    entry.principal.toFixed(2),
                                    (entry.interest + entry.principal).toFixed(
                                      2,
                                    ),
                                    entry.balance.toFixed(2),
                                  ].join(","),
                                ),
                              ].join("\n");

                              const blob = new Blob([csvContent], {
                                type: "text/csv;charset=utf-8;",
                              });
                              const link = document.createElement("a");
                              link.href = URL.createObjectURL(blob);
                              link.download = `${loan.name}_schedule.csv`;
                              link.click();
                            }}
                          >
                            Export CSV
                          </Button>
                          <Button
                            onClick={() => {
                              const XLSX = require("xlsx");
                              const data = schedule.map((entry) => ({
                                Month: entry.month,
                                "Due Date": entry.paymentDate
                                  ? formatDate(entry.paymentDate)
                                  : "-",
                                Interest: entry.interest.toFixed(2),
                                Principal: entry.principal.toFixed(2),
                                Total: (
                                  entry.interest + entry.principal
                                ).toFixed(2),
                                Balance: entry.balance.toFixed(2),
                              }));

                              const ws = XLSX.utils.json_to_sheet(data);
                              const wb = XLSX.utils.book_new();
                              XLSX.utils.book_append_sheet(wb, ws, "Schedule");
                              XLSX.writeFile(wb, `${loan.name}_schedule.xlsx`);
                            }}
                          >
                            Export Excel
                          </Button>
                        </div>
                        <table className="w-full text-sm border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 border border-gray-200">
                                {t("months")}
                              </th>
                              <th className="p-2 border border-gray-200">
                                {t("dueDate")}
                              </th>
                              <th className="p-2 border border-gray-200">
                                {t("interest")}
                              </th>
                              <th className="p-2 border border-gray-200">
                                {t("principal")}
                              </th>
                              <th className="p-2 border border-gray-200">
                                {t("total")}
                              </th>
                              <th className="p-2 border border-gray-200">
                                {t("principalRemaining")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((entry) => (
                              <tr key={entry.month}>
                                <td className="p-2 border border-gray-200">
                                  {entry.month}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {entry.paymentDate
                                    ? formatDate(entry.paymentDate)
                                    : "-"}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {entry.interest.toFixed(2)}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {entry.principal.toFixed(2)}
                                </td>
                                <td className="p-2 border border-gray-200">
                                  {(entry.interest + entry.principal).toFixed(
                                    2,
                                  )}
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold mb-4">{t("chartComparison")}</h2>
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

// TEST CASES
// ==========
// 1) Zero months
//    Input: loanMonths=0
//    Expected: schedule=[] (empty array)
// 2) Spitzer method, 1% combined monthly rate (12% annual) for 12 months on $1200
//    Expected monthlyPayment ~ $106.62
//    We'll check if schedule array length=12 and final balance=0
// 3) If user tries negative months, expect empty schedule
// 4) If monthlyRate=0 (no interest), entire monthlyPayment is principal.
// 5) Loan with start date in the past to test partial sums for interestPaidSoFar, principalPaidSoFar
//    e.g., a 6-month old loan of 12 total months.
// 6) Next payment for partially paid loan: If loan is partially paid, nextPayment should show correct date, interest, principal, total.
// 7) Language/RTL test: Switch language to Hebrew or Arabic to confirm layout direction and text labels.
