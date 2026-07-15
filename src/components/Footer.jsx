import { NAMES, DATES } from '../data/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with love for {NAMES.birthday_person} · {DATES.birthday}, {DATES.year}
      </p>
    </footer>
  );
}
