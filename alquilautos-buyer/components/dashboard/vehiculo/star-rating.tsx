import StarIcon from "@/components/dashboard/vehiculo/star-icon";

type StarRatingProps = {
  rating: number;
  showValue?: boolean;
  valueClassName?: string;
};

export function buildStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

export default function StarRating({
  rating,
  showValue = true,
  valueClassName = "text-sm font-semibold text-[var(--text-primary)]",
}: StarRatingProps) {
  const stars = buildStars(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: stars.full }).map((_, i) => (
          <StarIcon key={`full-${i}`} type="full" />
        ))}
        {stars.half && <StarIcon type="half" />}
        {Array.from({ length: stars.empty }).map((_, i) => (
          <StarIcon key={`empty-${i}`} type="empty" />
        ))}
      </div>
      {showValue && (
        <span className={valueClassName}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}