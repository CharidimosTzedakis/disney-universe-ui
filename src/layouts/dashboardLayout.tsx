import CharactersTable from "@components/charactersTable";
import CharacterDetailsModal from "@components/characterDetailsModal";
import { useState } from "react";

export default function DashboardLayout() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null,
  );

  return (
    <div>
      <CharactersTable
        onCharacterSelect={(characterId) => setSelectedCharacterId(characterId)}
      />
      <CharacterDetailsModal
        isOpen={!!selectedCharacterId}
        characterId={selectedCharacterId}
        onClose={() => setSelectedCharacterId(null)}
      />
    </div>
  );
}
