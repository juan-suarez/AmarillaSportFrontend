import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isFormValid: boolean;
}

export function SubmitButton({ isFormValid }: SubmitButtonProps) {
  return isFormValid ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Continue</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
        {/* Render order summary and payment confirmation */}
      </DialogContent>
    </Dialog>
  ) : (
    <Button className="w-full" type="submit">
      Continue
    </Button>
  );
}