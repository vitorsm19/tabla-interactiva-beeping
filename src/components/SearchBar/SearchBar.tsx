import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder || "Buscar..."}
      />
      <Button type="submit" className="cursor-pointer">
        Buscar
      </Button>
    </form>
  );
}
