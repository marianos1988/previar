import { useState, useRef } from "react";
import "../../styles/tienda/ImgCarousel.css";

export default function ImgCarousel({ path, autoplay = true, delay = 3000 }) {

  // Carga todas las imágenes de la carpeta correcta
  const images = import.meta.glob(`../../assets/tienda/products/*`, {
    eager: true,
    import: "default"
  });

  // Filtra solo las imágenes del producto que estan en la carpeta y mapea todas las fotos de la carpeta
  const productImages = Object.entries(images)
    .filter(([key]) => key.includes(`${path}-`))
    .map(([, value]) => value.src);

  const [current, setCurrent] = useState(0);

  const startX = useRef(0);
  const touchStartY = useRef(0);

  const total = productImages.length;

  if (!total) return null;

  if (productImages.length === 0) {
    console.warn(`No hay imágenes para ${path}`);
    return null;
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // 📱 TOUCH/SWIPE MOBILE
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX.current - endX;
    const diffY = Math.abs(touchStartY.current - endY);

    // Si es más movimiento horizontal que vertical, es swipe
    if (Math.abs(diffX) > 50 && diffY < 50) {
      if (diffX > 0) next();
      else prev();
    }
    // Si no hay swipe significativo, es tap - cambiar imagen
    else if (Math.abs(diffX) < 10 && diffY < 10 && total > 1) {
      next();
    }
  };

  // 🖱️ HOVER DESKTOP
  const hovered = useRef(false);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    if (hovered.current) return;
    hovered.current = true;
    next();
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    hovered.current = false;
    prev();
  };

  return (
    <div
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="carousel-img-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          key={current}
          src={productImages[current]}
          alt={`${path}-${current}`}
          className="carousel-img"
        />
      </div>

      <div className="carousel-dots">
        {productImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

 