
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {


    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Give Suggestion</Label>
                            <Input id="name-1" name="name" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-[#319E60] cursor-pointer hover:bg-[#319E60]">Send</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
