export type SelectOption = {
  label: string;
  value: string;
};

export const Select: React.FC<{
  onChange?: (text: string) => void;
  value: string;
  label?: string;

  options: SelectOption[];
}> = () => {};
