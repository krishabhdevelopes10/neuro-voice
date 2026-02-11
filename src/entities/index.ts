/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: analysismarkers
 * Interface for AnalysisMarkers
 */
export interface AnalysisMarkers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  timestamp?: string;
  /** @wixFieldType text */
  detectedIssue?: string;
  /** @wixFieldType text */
  explanation?: string;
  /** @wixFieldType text */
  recordingIdentifier?: string;
  /** @wixFieldType text */
  issueCategory?: string;
}


/**
 * Collection ID: healthmetrics
 * Interface for HealthMetrics
 */
export interface HealthMetrics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  metricName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  metricIcon?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  benefit?: string;
}


/**
 * Collection ID: voicerecordings
 * Interface for VoiceRecordings
 */
export interface VoiceRecordings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  recordingLabel?: string;
  /** @wixFieldType url */
  audioFile?: string;
  /** @wixFieldType number */
  cognitiveScore?: number;
  /** @wixFieldType number */
  stressLevel?: number;
  /** @wixFieldType number */
  fatigueIndex?: number;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}
