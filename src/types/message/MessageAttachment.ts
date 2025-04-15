import { MediaObject } from "../shared/MediaObject";

export interface MessageAttachment {
  Id: string;
  MessageId: string; // Guid maps to string
  AttachmentDetail: MediaObject | null; // Assuming MediaObject is defined elsewhere
  ThumbDetail: MediaObject | null; // MediaObject? maps to MediaObject | null
}

// Example placeholder for MediaObject (replace with your actual definition)
