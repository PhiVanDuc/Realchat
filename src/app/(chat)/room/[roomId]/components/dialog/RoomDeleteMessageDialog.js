"use client"

import { useState } from "react";
import useMessagesStore from "@/stores/messages";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { deleteMessage } from "@/actions/message";
import { toast } from "sonner";

export default function RoomDeleteMessageDialog({ open, setOpen, messageId }) {
    const [submitting, setSubmitting] = useState();
    const { deleteMessage: deleteMessageHandler } = useMessagesStore();

    const handleCloseDialog = () => { setOpen(false) }

    const handleDeleteMessage = async () => {
        setSubmitting(true);
        const result = await deleteMessage(messageId);
        setSubmitting(false);

        if (result.success) {
            deleteMessageHandler(result.data);
            toast.success(result.message);
        }
        else toast.warning(result.message);

        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => { setOpen(isOpen) }}
        >
            <DialogContent className="gap-[25px]">
                <DialogHeader>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogDescription className="text-neutral-400">Hãy chắc chẳn rằng bạn muốn xóa tin nhắn này.</DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-[8px]">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCloseDialog}
                    >
                        Hủy
                    </Button>

                    <Button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo-600"
                        onClick={handleDeleteMessage}
                        disabled={submitting}
                    >
                        { submitting ? "Đã xóa . . . "  : "Xác nhận" }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
