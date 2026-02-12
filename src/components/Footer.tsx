export const Footer = () => {
  return (
    <footer className="text-center py-8">
      <p className="text-xs text-muted-foreground retro">
        PLAY GAMES · HEAL KIDS · CHANGE LIVES
      </p>
      <p className="text-[10px] text-muted-foreground/60 mt-2">
        &copy; {new Date().getFullYear()} Heroes Play Games · Extra Life
      </p>
    </footer>
  )
}
