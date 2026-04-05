"use client";

import { TIERS, type TierKey } from "@/lib/models";

interface TierBadgeProps {
  tier: TierKey;
  small?: boolean;
}

export function TierBadge({ tier, small = false }: TierBadgeProps) {
  const tierInfo = TIERS[tier];

  return (
    <span
      className="inline-block font-mono font-extrabold tracking-wide"
      style={{
        padding: small ? "1px 5px" : "2px 7px",
        borderRadius: 4,
        fontSize: small ? 9 : 10,
        color: tierInfo.color,
        background: tierInfo.bg,
        lineHeight: "16px",
      }}
    >
      {tier}
    </span>
  );
}
