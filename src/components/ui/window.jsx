import PropTypes from "prop-types";

/**
 * Destructuring this import causes a module-scoped binding named "window", which shadows the global window object.
 * This in turn causes Vite's injected preamble to fail and break the application.
 * We import it as a namespace object instead to avoid this.
 */
import * as styles from "../../scss/window.module.scss";

const Window = ({ title, children }) => {
  return (
    <div className={styles.window}>
      <div className={styles.windowTitleBar}>
        <div>{title}</div>
        <div className={styles.windowControls}>
          <div className={styles.windowControl} />
          <div className={styles.windowControl} />
          <div className={styles.windowControl} />
        </div>
      </div>
      <div className={styles.windowContent}>{children}</div>
    </div>
  );
};

Window.defaultProps = {
  title: "",
};

Window.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Window;
