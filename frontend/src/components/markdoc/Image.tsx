import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

export function Image({ src, alt, title, width, height }: ImageProps) {
  const normalizedSrc = src.startsWith("http")
    ? src
    : src.startsWith("/")
    ? src
    : `/images/docs/${src}`;

  return (
    <figure>
      <div className="flex justify-center">
        <NextImage
          src={normalizedSrc}
          alt={alt}
          width={width || 532}
          height={height || 400}
          className="rounded-lg"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          priority={false}
          quality={75}
        />
      </div>
      {title && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
