import styles from './CircularProgress.module.scss';

type CircularProgressProps = {
  size?: number;
  color?: string;
  backgroundColor?: string;
  thickness?: number;
};

export const CircularProgress = ({
  size = 20,
  color = '#abc022',
  backgroundColor = '#fff',
  thickness = 2.5
}: CircularProgressProps) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div className={styles.root} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        {/* Background circle */}
        <circle
          className={styles.background}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={thickness}
        />
        {/* Animated arc */}
        <circle
          className={styles.progress}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
