import type { ReactNode } from "react";
import { Label as AriaLabel } from "react-aria-components";
import classNames from "classnames";
import styles from "./styles.module.scss";

export default function Label({
    isRequired = false,
    className,
    children,
}: {
    isRequired?: boolean;
    className?: string;
    children?: ReactNode;
}) {
    return (
      <div className={classNames(styles.label, className)}>
        <AriaLabel>{children}</AriaLabel>
        {isRequired && <span className={styles.star}>*</span>}
      </div>
    );
}