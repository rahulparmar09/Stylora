import { useEffect, useRef } from "react";

const images = [
    "https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-22-min-2.webp",
    "https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-23-min.webp",
    "https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-18-min-1.webp",
    "https://img.freepik.com/free-photo/client-doing-hair-cut-barber-shop-salon_1303-20719.jpg",
    "https://img.freepik.com/free-photo/unrecognizable-barber-washing-head-client_23-2147737055.jpg?semt=ais_hybrid&w=740&q=80",
];

export default function Gallery() {
    const scrollRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollRef.current) return;

            const container = scrollRef.current;

            container.scrollBy({
                left: 300,
                behavior: "smooth",
            });

            // reset if end reached
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-[#121212] py-10">

            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-hidden  scroll-smooth"
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="min-w-80 h-100 shrink-0 overflow-hidden"
                    >
                        <img
                            src={img}
                            alt={`img-${i}`}
                            className="w-full h-full object-cover transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}