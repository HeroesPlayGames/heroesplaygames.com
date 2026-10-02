export const Footer = () => {
  return (
    <footer className="py-8 text-center">
      <p className="text-muted-foreground retro text-xs">PLAY GAMES · HEAL KIDS · CHANGE LIVES</p>
      <p className="text-muted-foreground/60 mt-2 text-[10px]">
        &copy; {new Date().getFullYear()} Heroes Play Games · Extra Life
      </p>
    </footer>
  );
};
