import { UserCard } from './UserCard'
import { organizeMembers } from '../utils/helpers'
import { TeamParticipant } from 'extra-life-ts'
import { useEffect, useState } from 'react'
import theHeroesImage from '../images/the-heroes.png'

export const Team = ({ members }: { members: TeamParticipant[] }) => {
  const [highlightedMember, setHighlightedMember] = useState<TeamParticipant>()
  const sortedMembers = organizeMembers(members)

  // To prevent Next from complaining about html diff server <> client
  useEffect(() => {
    setHighlightedMember(members[Math.floor(Math.random() * members.length)])
  }, [members])

  return (
    <div id="team" className="w-full p-5 sm:p-10">
      <div className="flex flex-col items-center gap-5">
        <img src={theHeroesImage} alt="The Heroes" width={400} height={153} />
        <p className="mx-auto text-center text-xl">
          Help us reach our goal by donating to someone below. <br />
          If you&apos;re having trouble picking, how about{' '}
          <a className="gradient-link font-bold" href={highlightedMember?.links.donate}>
            {highlightedMember?.displayName.split(' ')[0]}
          </a>
          ?
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sortedMembers.map((member) => {
          return <UserCard key={member.participantID} {...member} />
        })}
      </div>
    </div>
  )
}
