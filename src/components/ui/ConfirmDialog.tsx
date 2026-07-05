import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  danger?: boolean;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Xác nhận",
  description,
  confirmText = "Xác nhận",
  danger = true,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <div
          className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${
            danger ? "bg-clay-50 text-clay-500" : "bg-brass-50 text-brass-600"
          }`}
        >
          <AlertTriangle size={18} />
        </div>
        <p className="text-sm text-ink-600 leading-relaxed pt-1.5">{description}</p>
      </div>
    </Modal>
  );
}
