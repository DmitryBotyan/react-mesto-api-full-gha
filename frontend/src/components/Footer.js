import React from "react";

const date = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {date} Mesto Russia</p>
    </footer>
  );
}
