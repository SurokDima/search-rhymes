import { WordSearch } from "@/features/word-search";

export default function Rhymes({ params: { word } }: { params: { word: string } }) {
  return (
    <div className="flex h-screen w-screen justify-center pt-10">
      <div className="flex flex-col gap-y-5">
        <WordSearch defaultValue={word} />
        <span>List of rhymes for word: {word}</span>
      </div>
    </div>
  );
}
