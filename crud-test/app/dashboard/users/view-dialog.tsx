import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Nama harus lebih dari 3 karakter" }),
  address: z.string().min(3, { message: "Alamat harus lebih dari 3 karakter" }),
  gender: z.string().min(1, { message: "Jenis kelamin harus dipilih" }),
  born_date: z.string().min(1, { message: "Tanggal lahir harus dipilih" })
}
)

export function ViewDialog({
  userId,
  open,
  onOpenChange,
}: {
  userId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await axios.get(`https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc1MjA0MDcsImlhdCI6MTY5NzQzNDAwNywic3ViIjoyOTd9.aR1960qdf3PFCvMCeEmySEXfl7mY3H6Aj24qmpvnzAE',
        },
      });
      return data.data;
    }
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
      </DialogHeader>

      {isLoading && (
        <DialogContent>
          <Loader2 className="h-6 w-6 animate-spin" />
        </DialogContent>
      )}

      {error && (
        <DialogContent>
          Error fetching user details. Please try again later.
        </DialogContent>
      )}

      {data && (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Detail User
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input disabled value={data.name} />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Address:</FormLabel>
                <FormControl>
                  <Input disabled value={data.address} />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Gender:</FormLabel>
                <FormControl>
                  <Input disabled value={data.gender === "l" ? "Laki-laki" : "Perempuan"} />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Born Date:</FormLabel>
                <FormControl>
                  <Input type="date" disabled value={data.born_date} />
                </FormControl>
              </FormItem>
            </Form>
          </DialogContent>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}