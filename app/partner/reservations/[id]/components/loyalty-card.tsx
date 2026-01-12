'use client';

interface LoyaltyCardProps {
  program: string;
  points: string;
  tier: string;
}

export function LoyaltyCard({ program, points, tier }: LoyaltyCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5D5C3] p-6">
      <h3 className="font-semibold text-[#3d2e1f] mb-4">Loyalty Program</h3>
      
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-2">Membership Status</div>
        <span className="px-3 py-1.5 bg-lime-200 text-lime-900 text-sm font-medium rounded">
          {program}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-slate-500 mb-1">Points Balance</div>
          <div className="font-semibold text-[#3d2e1f]">{points}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Tier Level</div>
          <div className="font-semibold text-[#3d2e1f] flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9 9l-7 .5 5.5 5L6 22l6-3.5L18 22l-1.5-7.5L22 9.5 15 9z"/>
            </svg>
            {tier}
          </div>
        </div>
      </div>
    </div>
  );
}
