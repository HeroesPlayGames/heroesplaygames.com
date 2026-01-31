import { Stat } from './Stat'
import { currencyFormat } from '../utils/currency'
import clsx from 'clsx'
import type { Team } from 'extra-life-ts'
import { useState } from 'react'

interface Props {
  team: Team
}

const previousYears = {
  '2021': {
    sumDonations: 5431,
    fundraisingGoal: 5000,
    numDonations: 45,
  },
  '2022': {
    sumDonations: 10585,
    fundraisingGoal: 10000,
    numDonations: 73,
  },
  '2023': {
    sumDonations: 7487,
    fundraisingGoal: 8000,
    numDonations: 64,
  },
  '2024': {
    sumDonations: 6099,
    fundraisingGoal: 6000,
    numDonations: 67,
  },
  '2025': {
    sumDonations: 23000,
    fundraisingGoal: 20000,
    numDonations: 82,
  },
} as Record<
  string,
  { sumDonations: number; fundraisingGoal: number; numDonations: number }
>

const currentYear = new Date().getFullYear()

export const StatBar = ({ team }: Props) => {
  const [selected, setSelected] = useState(() => String(currentYear))

  const selectedYear =
    selected === String(currentYear)
      ? {
          sumDonations: team.sumDonations,
          fundraisingGoal: team.fundraisingGoal,
          numDonations: team.numDonations,
        }
      : previousYears[selected]

  if (!selectedYear) return null

  return (
    <div className="mt-5 p-0 sm:mt-0 sm:p-10">
      <div className="flex flex-col gap-1 bg-[#050E52] py-5 sm:rounded-xl sm:px-0">
        <div className="btn-group self-center">
          {[...Object.keys(previousYears), String(currentYear)].map((year) => (
            <button
              key={year}
              className={clsx('btn', {
                'btn-active !bg-orange-600! text-white!': year === selected,
                'bg-[#030933]!': year !== selected,
              })}
              onClick={() => setSelected(year)}
              type="button"
            >
              {year}
            </button>
          ))}
        </div>
        <dl className="flex flex-col px-10 py-5 sm:flex-row">
          <Stat label="Total Donations" value={selectedYear.numDonations} />
          <Stat
            label="Amount Raised"
            value={currencyFormat(selectedYear.sumDonations)}
          />
          <Stat
            label={`${selected} Goal`}
            value={currencyFormat(selectedYear.fundraisingGoal)}
          />
        </dl>
      </div>
    </div>
  )
}
