interface StatProps {
  label: string
  value: string | number
}

export const Stat = ({ label, value }: StatProps) => {
  return (
    <div className="flex-1 flex-col border-b-2 border-b-gray-50 px-4 py-5 text-center last-of-type:border-0 sm:border-b-0 sm:border-r-2 sm:border-r-gray-50 md:flex">
      <dt className="font-medium">{label}</dt>
      <dd className="text-4xl font-semibold">{value}</dd>
    </div>
  )
}
