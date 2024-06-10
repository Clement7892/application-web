import React from "react";
import "../styles/Propos.css";
import HeaderLogin from "../components/partial/HeaderLogin/HeaderLogin";

const Propos = () => {
  return (
    <div className="propos-container">
      <HeaderLogin />
      <div className="hero-section">
        <h1>À propos de nous</h1>
        <p>Découvrez notre histoire, nos valeurs et notre équipe.</p>
      </div>

      <div className="content-section">
        <section className="history">
          <h2>Notre Histoire</h2>
          <p>
            Fondée en 2010, notre entreprise a commencé avec une simple mission
            : offrir des vêtements de haute qualité à des prix abordables.
            Depuis nos débuts, nous avons évolué pour devenir une marque
            reconnue mondialement, connue pour son style unique et ses designs
            innovants.
          </p>
          <img src="/images/history.jpg" alt="Notre Histoire" />
        </section>

        <section className="mission-values">
          <h2>Notre Mission & Valeurs</h2>
          <div className="mission-values-content">
            <div className="mission">
              <h3>Mission</h3>
              <p>
                Nous nous engageons à offrir les meilleurs produits à nos
                clients tout en respectant des normes éthiques et durables. Nous
                croyons en la mode accessible à tous, sans compromettre la
                qualité.
              </p>
            </div>
            <div className="values">
              <h3>Valeurs</h3>
              <ul>
                <li>Innovation</li>
                <li>Qualité</li>
                <li>Durabilité</li>
                <li>Éthique</li>
                <li>Accessibilité</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="team">
          <h2>Notre Équipe</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/images/team1.jpg" alt="Membre de l'équipe" />
              <h3>Jean Dupont</h3>
              <p>Fondateur & CEO</p>
            </div>
            <div className="team-member">
              <img src="/images/team1.jpg" alt="Membre de l'équipe" />
              <h3>Marie Curie</h3>
              <p>Directrice Artistique</p>
            </div>
            <div className="team-member">
              <img src="/images/team1.jpg" alt="Membre de l'équipe" />
              <h3>Paul Martin</h3>
              <p>Responsable Marketing</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Témoignages de nos Clients</h2>
          <div className="testimonial">
            <p>
              "Des vêtements de grande qualité et un service client exceptionnel
              ! Je recommande vivement."
            </p>
            <h4>- Anna L.</h4>
          </div>
          <div className="testimonial">
            <p>
              "J'adore leurs designs uniques et leur engagement envers la
              durabilité."
            </p>
            <h4>- Marc D.</h4>
          </div>
          <div className="testimonial">
            <p>
              "Une expérience d'achat formidable. Je reviendrai certainement !"
            </p>
            <h4>- Sophie P.</h4>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Propos;
