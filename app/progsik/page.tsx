import { FlashcardNavigator } from "@/components/progisk/flashcard-navigator"
import { getFlashcardCollections } from "@/lib/actions/flashcards"


export default async function Page() {
    const flashcard_collections: FlashCardCollections = await getFlashcardCollections()
    
    return (
        <main className="flex flex-col gap-8 mt-8 mb-8 mx-4 lg:mx-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">TDT4237 Flashcards</h1>
                <h2 className="text-xl md:text-2xl xl:text-3xl mt-1 text-muted-foreground">Random progisk spørsmål 💯</h2>
            </div>
            <FlashcardNavigator flashcard_collections={flashcard_collections} />
        </main>
    )
}