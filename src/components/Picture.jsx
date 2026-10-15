// A responsive image from src/assets/images (see scripts/images.mjs): AVIF
// with a WebP fallback at several widths, fixed dimensions so nothing shifts,
// and a tiny blurred copy as the background until the real image arrives.
//
// `phoneMaxWidth` caps the file a phone (under 720px wide) may pick: a
// screenshot shown about 360px wide does not need the 1280px file even on a
// 3x screen.
const srcSet = (variants, maxWidth = Infinity) =>
  variants
    .filter(([width]) => width <= maxWidth)
    .map(([width, url]) => `${url} ${width}w`)
    .join(", ");

const phone = "(max-width: 719px)";

const Picture = ({ image, alt, sizes, className, loading = "lazy", fetchPriority, phoneMaxWidth }) => (
  <picture className="picture">
    {phoneMaxWidth && (
      <>
        <source media={phone} type="image/avif" srcSet={srcSet(image.avif, phoneMaxWidth)} sizes={sizes} />
        <source media={phone} type="image/webp" srcSet={srcSet(image.webp, phoneMaxWidth)} sizes={sizes} />
      </>
    )}
    <source type="image/avif" srcSet={srcSet(image.avif)} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet(image.webp)} sizes={sizes} />
    <img
      className={className ? `picture__img ${className}` : "picture__img"}
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      style={{ backgroundImage: `url(${image.placeholder})` }}
    />
  </picture>
);

export default Picture;
