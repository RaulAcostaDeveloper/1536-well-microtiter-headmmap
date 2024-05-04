import React, { useState, useEffect } from 'react';
import '../styles/tooltip.css';
type Props = {
    QC_cell_count: string,
    QC_cell_count_cov: string,
    QC_position_effect: string,
}
const Tooltip = ({ QC_cell_count, QC_cell_count_cov, QC_position_effect }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") { // Avoid a Server side rendering error in deploy
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (typeof window !== "undefined") { // Avoid a Server side rendering error in deploy
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return isVisible ? (
    <div className="tooltip" style={{ top: `${ position.y + 15 }px`, left: `${ position.x + 15 }px` }}>
      <div><strong>QC Cell Count:</strong> { QC_cell_count }</div>
      <div><strong>QC Cell Count COV:</strong> { QC_cell_count_cov }</div>
      <div><strong>QC Position Effect:</strong> { QC_position_effect }</div>
    </div>
  ) : null;
};

export default Tooltip;
