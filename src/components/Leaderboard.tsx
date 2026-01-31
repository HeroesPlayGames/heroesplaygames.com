import type { Donation } from 'extra-life-ts'

interface LeaderboardProps {
  donations: Donation[]
}

export function Leaderboard({ donations }: LeaderboardProps) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 shadow-2xl">
      <div className="rounded-lg bg-[#050E52] p-6">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-black tracking-wider text-white" style={{ fontFamily: 'monospace' }}>
            🏆 TOP DONORS 🏆
          </h2>
          <div className="mt-2 text-sm text-[#1FB2A6]" style={{ fontFamily: 'monospace' }}>
            HIGH SCORES
          </div>
        </div>

        <div className="space-y-2">
          {donations.map((donation, index) => (
            <div
              key={donation.donationID || index}
              className="flex items-center justify-between rounded border-2 border-[#1FB2A6] bg-[#030933] p-3"
              style={{ fontFamily: 'monospace' }}
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`text-2xl font-bold ${index === 0
                    ? 'text-orange-600'
                    : index === 1
                      ? 'text-gray-300'
                      : index === 2
                        ? 'text-[#D926A9]'
                        : 'text-white'
                    }`}
                >
                  {index + 1}.
                </span>
                <div>
                  <div className="font-semibold text-[#1FB2A6]">{donation.displayName || 'Anonymous Hero'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-orange-600">${donation.amount?.toFixed(2) || '0.00'}</div>
                <div className="text-xs text-gray-400">
                  {donation.createdDateUTC ? new Date(donation.createdDateUTC).toLocaleDateString() : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {donations.length === 0 && (
          <div className="py-8 text-center text-[#1FB2A6]" style={{ fontFamily: 'monospace' }}>
            NO DONATIONS YET - BE THE FIRST HERO!
          </div>
        )}
      </div>
    </div>
  )
}
