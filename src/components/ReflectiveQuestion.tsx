import React, { useState } from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

interface ReflectiveQuestionProps {
  question: string;
  options: string[];
}

export const ReflectiveQuestion: React.FC<ReflectiveQuestionProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div className="relative my-8 p-6 md:p-8 rounded-3xl bg-[#0c0d12]/95 border border-[#e5c158]/35 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-5 max-w-2xl w-full">
      <div className="flex items-center gap-2 text-[#e5c158]">
        <HelpCircle className="w-4 h-4" />
        <span className="font-general text-[10px] font-bold uppercase tracking-[0.25em]">
          Moment of Reflection
        </span>
      </div>

      <h4 className="font-general text-xl sm:text-2xl font-bold text-[#f0f0f5] leading-snug">
        “{question}”
      </h4>

      <div className="flex flex-col gap-3 w-full mt-2">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              data-cursor-hover
              className={`group flex items-center justify-between p-4 rounded-xl text-left font-general text-xs sm:text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-[#e5c158]/20 border border-[#e5c158] text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.25)]'
                  : 'bg-white/5 border border-white/10 text-[#f0f0f5]/80 hover:border-[#e5c158]/40 hover:text-[#f0f0f5]'
              }`}
            >
              <span>{opt}</span>
              <CheckCircle2
                className={`w-4 h-4 transition-all duration-300 ${
                  isSelected ? 'opacity-100 scale-110 text-[#e5c158]' : 'opacity-0 scale-90'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
