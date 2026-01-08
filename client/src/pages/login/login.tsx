import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChromeIcon, GithubIcon, QuoteIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
    return(
        <div className="h-screen w-full flex font-general-sans">
            <div className="w-[50%] h-full bg-zinc-950 bg-grid p-12">
                <div className="h-full w-full relative">
                    <div className="absolute top-0 left-0">
                        <p className="text-slate-50 font-medium text-lg uppercase">KodeHawk</p>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full">
                        <span>
                            <QuoteIcon className="text-zinc-600" />
                        </span>
                        <p className="text-xl font-thin text-slate-50/90 max-w-[80%] my-4">
                            "Only god knows, what is written here. The god also sometimes, don't know what is written"
                        </p>
                        <div className="flex space-x-2 items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-50 font-normal">Thiruvalluvar</span>
                                <span className="text-xs text-zinc-500 font-normal">Thamizh Puzhavar</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center">
                        <p className="text-zinc-700 font-medium text-sm uppercase">Status: <Badge variant="secondary" className="-py-0.5 bg-green-200 text-green-700 font-mono">OPTIMAL</Badge></p>
                        <span className="text-zinc-700 font-medium text-sm uppercase">&copy;KodeHawk</span>
                    </div>
                </div>
            </div>
            <div className="w-[50%] h-full bg-black relative">
                <div className="absolute left-1/2 top-1/2 -translate-1/2 w-[50%] font-author space-y-4">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl text-slate-50 font-medium">Welcome back</h1>
                        <p className="text-sm text-zinc-500 font-normal">Enter your credentials to access the workspace.</p>
                    </div>
                    <div className="mx-auto space-y-2">
                        <Label htmlFor="email" className="text-xs text-zinc-500 font-normal pl-1">Email address</Label>
                        <Input id="email" type="email" placeholder="abcd@gmail.com" className="border-zinc-600/50 bg-zinc-800/40 text-zinc-200" />
                    </div>
                    <div className="mx-auto space-y-2">
                        <Label htmlFor="password" className="text-xs text-zinc-500 font-normal pl-1">Password</Label>
                        <Input id="password" type="password" placeholder="*********" className="border-zinc-600/50 bg-zinc-800/40 text-zinc-200" />
                    </div>
                    <div className="text-zinc-600 flex justify-between items-center mx-auto my-4">
                        <div className="flex items-center space-x-1">
                            <Checkbox id="checkbox" className="border border-zinc-600/60" />
                            <Label htmlFor="checkbox" className="font-semibold text-xs">Remember me?</Label>
                        </div>
                        <a href="#" className="font-semibold text-xs hover:underline">Forgot Password</a>
                    </div>
                    <Button className="block w-full py-2 cursor-pointer font-medium" variant="secondary">
                        Sign in
                    </Button>
                    <br />
                    <Separator className="bg-zinc-700 relative">
                        <span className="text-xs text-zinc-500 font-thin absolute left-1/2 top-1/2 -translate-1/2 uppercase bg-black px-2">Or continue with</span>
                    </Separator>
                    <br />
                    <div className="w-full flex justify-evenly items-center">
                        <Button className="bg-zinc-950 border border-zinc-700/50 flex items-center w-[45%] text-zinc-500 font-semibold text-xs cursor-pointer">
                            <span><GithubIcon /></span>
                            <span>Github</span>
                        </Button>
                        <Button className="bg-zinc-950 border border-zinc-700/50 flex items-center w-[45%] text-zinc-500 font-semibold text-xs cursor-pointer">
                            <span><ChromeIcon /></span>
                            <span>Google</span>
                        </Button>
                    </div>
                    <br />
                    <div className="w-full text-center text-xs">
                        <p className="text-zinc-400">Don't have an account? <span className="text-zinc-200 hover:underline cursor-pointer">Request Access</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}