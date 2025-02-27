import { transformImageUrl } from '@/utils/imageUtil';
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface LazyImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  size?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const LazyImageComponent: React.FC<LazyImageComponentProps> = ({
  src,
  alt,
  width = 100,
  height = 100,
  size = 35,
  style,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // URL에 동적으로 사이즈 추가하는 함수
  // const getResizedImageUrl = (baseUrl: string, size?: number) => {
  //   if (!baseUrl || !size) return baseUrl;

  //   const urlParts = baseUrl.split("/");
  //   const fileName = urlParts.pop();
  //   const directory = urlParts.join("/");

  //   return `${directory}/${size}x${size}/${fileName}`;
  // };

  // src에 사이즈 추가 적용
  const resizedSrc = transformImageUrl(src, size);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 뷰포트에 진입하면 로드
          observer.disconnect(); // 한 번 로드 후 관찰 중지
        }
      },
      { threshold: 0.1 } // 10%만 보이더라도 로드
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ position: "relative", ...style }}>
      {isVisible ? (
        <Image
          src={resizedSrc}
          alt={alt}
          width={size ? size : width}
          height={size ? size : height}
          style={{
            objectFit: "contain",
            width: `${size ? size : width}px`,
            height: `${size ? size : height}px`,
          }}
          blurDataURL="/loading-image-circle.gif" // 블러에 사용할 기본 이미지
          onClick={onClick}
        />
      ) : (
        <Image
          src="/loading-image-circle.gif" // 로드 전 기본 이미지 표시
          alt="Loading..."
          width={width}
          height={height}
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  );
};

export default LazyImageComponent;
