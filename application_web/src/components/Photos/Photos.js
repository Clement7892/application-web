import "./Photos.css";

function Photos() {
  return (
    <section className="home-module">
      <img
        className="home-module-img"
        alt=""
        src={process.env.PUBLIC_URL + "/robe_module.webp"}
      />
      <img
        className="home-module-img"
        alt=""
        src={process.env.PUBLIC_URL + "/pantalon_module.webp"}
      />
      <img
        className="home-module-img"
        alt=""
        src={process.env.PUBLIC_URL + "/blouse_module.webp"}
      />
    </section>
  );
}

export default Photos;
