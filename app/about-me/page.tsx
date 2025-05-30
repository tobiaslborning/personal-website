"use server"
import { BackgroundGradientHome } from "@/components/home/background-gradient-home";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8">
      <div>
          <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Hi, I'm still Tobias"}</h1>
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-regular">{"Here is a litte bit about me"}</h2> 
      </div>
      <div className="flex flex-col gap-4">
        <Separator className="bg-foreground"/>
        <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
        <Separator className="bg-foreground"/>
      </div>
      {/* Content */}
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col gap-8 lg:max-w-1/2 mb-16">
          {/* WORK */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Work & Education</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p><span className="font-normal">{"2022 -> 2027 : "}</span> {"M.Sc Computer Science @ NTNU"}</p>
              <p><span className="font-normal">{"2024 : "}</span> {" Summer intern @ Snapper NET Solutions"}</p>
              <p><span className="font-normal">{"2024 -> now : "}</span> {" Part time software developer @ Snapper NET Solutions"}</p>
              <p><span className="font-normal">{"2024 : "}</span> {" Summer intern @ Bekk - Data & Analytics"}</p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Abakus */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Abakus</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
                I've been involved with <a href="https://abakus.no" className="font-medium italic hover:underline">Abakus</a> (the CS student association at NTNU) as both a member and leader of <span className="font-medium">Kontor- og Sosialkomiteen</span> where I led a team of about 18 people. 
                It's been a rewarding experience organizing social events and managing office activities for the student community. 
                Leading the committee taught me a lot about coordinating teams and creating engaging experiences for fellow students, while also being part of a larger organization that connects students with industry and each other.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Creative stuff */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Creative stuff</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
                I try to pick up new skills here and there, because I enjoy learning them. 
                Over the years I've gotten into <span className="font-medium">photography and editing</span>, <span className="font-medium">music production</span>, <span className="font-medium">video editing</span>, and <span className="font-medium">graphic design</span>. 
                I like how these areas overlap and connect with each other. There's something satisfying about figuring out a new tool or discovering a workflow that just clicks. I tend to dive pretty deep into whatever I'm working on.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Away from work */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Away from work</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
              When I'm not working or studying, you'll hopefully find me in the mountains - whether that's ski touring, freeriding, hiking, or running. 
              I actually spent two years skiing before starting university, so the mountains are still my favorite place to spend free time.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Contact */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Contact</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
              Feel free to send me a mail at <a href="mailto:tobias.borning@gmail.com" className="font-semibold italic">tobias.borning@gmail.com</a>, 
              or a message on <a className="font-semibold italic" href="https://www.linkedin.com/in/tobias-borning">LinkedIn.</a>
              </p>
            </div>
          </div>
        </div>
        <BackgroundGradientHome 
          containerClassName="hidden lg:block overflow-hidden max-w-1/2 sticky -translate-y-8 rounded-b-full bg-background animate-fade-in-5s"
          firstColor="primary"
          secondColor="primary"
          thirdColor="primary" //181, 240, 177 darkmode
          pointerColor="primary"
          interactive={false}
          size="80%"
        />
      </div>
      {/* WORK */}
      {/* <div className="flex justify-between gap-8 flex-col lg:flex-row">
        <div className="flex flex-col w-1/2">
          <h2 className="text-1xl md:text-3xl xl:text-4xl">Abakus</h2>
          <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
            <text>{"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary"}</text>
          </div>
        </div>
        <div className="max-w-1/2 2xl:max-w-1/3 max-h-96 overflow-hidden rounded-sm">
          <Image 
            src={"/images/site/abakus_ledelsen.jpeg"}
            width={1200}
            height={0}
            className="object-contain"
            alt=""
          />
        </div>
      </div> */}
    </main>
  )
}

