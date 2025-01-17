import Image from "next/image";
import React from "react";

interface LazyImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const LazyImageComponent: React.FC<LazyImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  style,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy" // Lazy Loading 속성 추가
      style={{
        objectFit: "contain",
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }} // 이미지 스타일 적용
      unoptimized
    />
  );
};

export default LazyImageComponent;
