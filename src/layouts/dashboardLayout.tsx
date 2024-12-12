import CharactersTable from "@components/charactersTable";
import CharacterDetailsModal from "@components/characterDetailsModal";
import { useState } from "react";

export default function DashboardLayout() {
  const [selectedCharacter, setSelectedCharacter] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <div>
      <CharactersTable
        onCharacterSelect={({ id, name }: { id: number; name: string }) =>
          setSelectedCharacter({ id, name })
        }
      />
      <CharacterDetailsModal
        isOpen={!!selectedCharacter}
        selectedCharacter={selectedCharacter}
        onClose={() => {
          setSelectedCharacter(null);
        }}
      />
    </div>
  );
}
