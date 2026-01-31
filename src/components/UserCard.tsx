import type { TeamParticipant } from 'extra-life-ts'
import { getParticipantBadges } from 'extra-life-ts'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export const UserCard = ({
  displayName,
  avatarImageURL,
  links,
  isTeamCaptain,
  participantID,
  isTeamCoCaptain,
}: TeamParticipant) => {
  const avatarUrl = avatarImageURL.replace(/https:https:/i, 'https:')
  const { data } = useQuery({
    queryKey: ['PlayerBadges', { participantID }],
    queryFn: () => getParticipantBadges(participantID, { orderBy: 'unlockedDateUTC ASC' }),
    select: ({ data }) => data,
  })

  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded-lg bg-[#050E52] p-6 shadow-2xl">
      <img
        alt={displayName}
        src={avatarUrl}
        width={96}
        height={96}
        className="rounded-full border-4 border-[#030933]"
      />
      <p className="text-2xl font-bold">{displayName}</p>
      {(isTeamCaptain || isTeamCoCaptain) && (
        <p className="text-bold inline-block bg-brand-gradient bg-clip-text text-xl font-bold text-transparent">
          {isTeamCaptain ? 'Captain' : 'Co-Captain'}
        </p>
      )}

      <div className="mt-5 flex flex-col items-center gap-5">
        {!!data?.length && (
          <div className="flex w-full flex-nowrap justify-center gap-2">
            {data?.map(({ badgeImageURL, description, badgeCode }) => (
              <div key={badgeCode} className="tooltip" data-tip={description}>
                <img src={badgeImageURL} alt={description} width={40} height={40} />
              </div>
            ))}
          </div>
        )}
        <Link
          className="w-fit rounded-lg bg-orange-600 px-10 py-2 font-semibold hover:bg-orange-500"
          to={links.donate}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </Link>
      </div>
    </div>
  )
}
