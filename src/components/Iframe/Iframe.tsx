import AboutUs from "../AboutUs/ui/AboutUs";
import Container from "../Container/Container";

const Iframe = () => {
  return (
    <Container>
      <div className="pt-14 flex justify-between items-center">
        <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d93054.41524761869!2d76.837499!3d43.21052804999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1725261583718!5m2!1sru!2s"
          width="1290"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          refErrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
    </Container>
  );
};

export default Iframe;
