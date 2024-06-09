import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter-module">
      <h2 className="newsletter-module-title">
        INSCRIVEZ-VOUS À NOTRE NEWSLETTER
      </h2>
      <p className="newsletter-module-subtitle">
        En vous inscrivant vous acceptez notre politique de confidentialité*
      </p>
      <div className="input-container">
        <input
          name="email"
          autoComplete="off"
          type="email"
          className="input-element"
          placeholder="Entrez votre email"
        />
        <button className="submit-button">Envoyer</button>
      </div>
    </section>
  );
}

export default Newsletter;
