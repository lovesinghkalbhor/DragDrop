import type { DragDropRules } from "../Types/DragDropRules";

export const DRAG_DROP_RULES: DragDropRules = {
  recieved: ["reviewed"],
  reviewed: ["accepted"],
  accepted: [],
};

export const canDrop = (
  draggedItemStatus: string,
  targetStatus: string
): boolean => {
  const allowedTargets = DRAG_DROP_RULES[draggedItemStatus];
  return allowedTargets ? allowedTargets.includes(targetStatus) : false;
};
