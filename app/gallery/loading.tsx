import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
        <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
          <span>{"Image Gallery"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      <Skeleton className="w-full bg-foreground opacity-70 rounded-xl h-64"/>
      <Separator className="bg-foreground"/>
      <Skeleton className="w-full bg-foreground opacity-70 rounded-xl h-64"/>
    </main>
    )
}