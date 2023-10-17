import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

export function DeleteDialog({
  userId,
  open,
  onOpenChange,
}: {
  userId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const { mutate: submit, isLoading } = useMutation({
    mutationFn: async () => {
      const { data, } = await axios.delete(`https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc2MTY3MzksImlhdCI6MTY5NzUzMDMzOSwic3ViIjoyOTd9._RDCUiTtcfjX8MkQm4NV_wTdXNR0Qics-1oaXhSor8c',
        },
      });
      return data.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menghapus customer",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal menghapus customer",
        variant: "destructive",
      });
    }
  }
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <Toaster />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apakah anda yakin?</DialogTitle>
            <DialogDescription>
              Aksi ini tidak dapat dibatalkan, data yang telah dihapus tidak dapat dikembalikan.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : <DialogFooter>
            <Button variant="outline" onClick={() => { onOpenChange(false); }}>Batal</Button>
            <Button variant="destructive" onClick={() => { submit(); }}>Hapus</Button>
          </DialogFooter>}
        </DialogContent>
      </Dialog>
    </>
  );
}
