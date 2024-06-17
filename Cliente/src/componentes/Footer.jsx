import logoInstituto from "../assets/logoinstituto.svg";

function Footer() {
  return (
    <>
      <div className="footer-container mt-auto">
        <hr />
        <footer className="mt-3 text-center">
          <img src={logoInstituto} alt="" />
        </footer>
      </div>
    </>
  );
}

export default Footer;
