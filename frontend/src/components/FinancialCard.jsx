import React from 'react'

const FinancialCard = ({
    icon,
    label,
    value,
    additionalContent,
    borderColor = "",
    bgColor = "bg-[#0A1628]"
}) => (
    <div
        className={`${bgColor} rounded-2xl p-5 lg:p-4 shadow-xl
    border border-white/10 hover:border-white/20 transition-all ${borderColor}`}>
        <div className="text-sm font-medium text-slate-400 flex items-center gap-2">
            {icon}
            {label}
        </div>
        <p className="text-2xl font-extrabold text-white mt-1.5">{value}</p>
        {additionalContent}
    </div>
);

export default FinancialCard;