import clsx from 'clsx'
import type { Team } from 'extra-life-ts'

interface Props {
  team: Team
}

export const Hero = ({ team }: Props) => {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="flex flex-1 flex-col gap-5 p-5 pb-4 sm:p-10">
        <h1
          className={clsx(
            'inline-block min-w-max',
            'bg-brand-gradient',
            'bg-clip-text text-6xl font-black text-transparent',
          )}
        >
          Play games
          <br />
          Heal kids
        </h1>
        <p className="text-lg font-medium">
          Extra Life, a fundraising program of Children&apos;s Miracle Network Hospitals&reg;, leverages the passion of
          the gaming community to rally support for our 170 member hospitals. Participants fundraise year-round and
          pledge to game for 24 hours with one goal: to save and improve the lives of sick and injured kids.
        </p>
        <a
          className="w-fit rounded-lg bg-orange-600 px-10 py-2 font-semibold hover:bg-orange-500"
          href="#team"
        >
          Donate
        </a>

        <p>
          Want to help us raise money?{' '}
          <a href={team.links.page} className="gradient-link font-bold">
            Join the team!
          </a>
        </p>
      </div>
      <div className="flex flex-1 justify-center bg-[url(/background.png)] bg-cover bg-center p-12 align-middle">
        <img className="w-full object-contain" src="/logo.png" alt="Heroes Play Games Logo" />
      </div>
    </div>
  )
}
