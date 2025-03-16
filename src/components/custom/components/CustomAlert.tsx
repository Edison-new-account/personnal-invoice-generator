import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomAlertDialogProps {
  title: string;
  message?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onConfirm?: () => void;
}

const CustomAlertDialog = (props: CustomAlertDialogProps) => {
  const { open, onClose, children, onConfirm, title, message } = props;
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {<AlertDialogTitle>{title}</AlertDialogTitle>}
          <AlertDialogDescription className="flex flex-col gap-3">
            {message}
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
