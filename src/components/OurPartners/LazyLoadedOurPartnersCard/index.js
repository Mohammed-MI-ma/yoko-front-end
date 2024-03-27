import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { Spin } from "antd";

const LazyOurPartnersCard = React.lazy(() => import("../OurPartnersCard/"));

const LazyLoadedOurPartnersCard = forwardRef(
  ({ font, lowQualitySrc, alt, highQualitySrc, badge }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const intersectionObserverRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.5, passive: true }
      );

      if (intersectionObserverRef.current) {
        observer.observe(intersectionObserverRef.current);
      }

      return () => {
        if (intersectionObserverRef.current) {
          observer.unobserve(intersectionObserverRef.current);
        }
      };
    }, []);

    return (
      <div ref={intersectionObserverRef}>
        {isVisible && (
          <Suspense fallback={<Spin size="large" />}>
            <LazyOurPartnersCard
              ref={ref}
              font={font}
              lowQualitySrc={lowQualitySrc}
              highQualitySrc={highQualitySrc}
              alt={alt}
              badge={badge}
            />
          </Suspense>
        )}
      </div>
    );
  }
);

export default LazyLoadedOurPartnersCard;
