export interface Props {
  title: string;
  description: string;
  isMarked?: boolean;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
  accessibilityLabel?: string;
};
