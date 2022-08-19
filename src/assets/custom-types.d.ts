interface EventType {
  id: string;
  name: string;
  description: string;
  type: string;
  priority: number | null;
  relatedEvents: string[];
  docId: string;
  isBeingEdited: boolean;
  isNew: boolean;
}
