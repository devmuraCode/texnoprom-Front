import AboutUs from "../AboutUs/ui/AboutUs";
import Container from "../Container/Container";

const Iframe = () => {
  return (
    <Container>
      <div className="pt-14 flex justify-between items-center">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5991.298395255369!2d69.2697!3d41.338241!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDIwJzE3LjciTiA2OcKwMTYnMTAuOSJF!5e0!3m2!1sru!2skz!4v1727468165473!5m2!1sru!2skz"
            width="1290"
            height="450"
            style={{border:0}}
            // @ts-ignore
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Container>
  );
};

export default Iframe;
