// Data required from 1536-well-microtiter
export interface WellData {
    Metadata_Col: string;
    Metadata_Row: string;
    Metadata_Well: string;
    Metadata_perturbation_id: string;
    Metadata_perturbation_type: string;
    QC_cell_count: string;
    QC_cell_count_cov: string;
    QC_cov_failed: string;
    QC_position_effect: string;
}

// Data needed for the headmap
export interface HeatMapData {
  Metadata_Col: string;
  Metadata_Row: string;
  QC_cell_count: string;
  QC_cell_count_cov: string;
  QC_position_effect: string;
}