"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { DateTime } from "luxon";


interface Props {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
}

const schema = z.object({
  name: z.string().min(3, { message: "Nama harus lebih dari 3 karakter" }),
  address: z.string().min(3, { message: "Alamat harus lebih dari 3 karakter" }),
  gender: z.string().min(1, { message: "Jenis kelamin harus dipilih" }),
  born_date: z.string().min(1, { message: "Tanggal lahir harus dipilih" })
}
)

export default function AddDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();

  const { mutate: submit, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        const { data } = await axios.post('https://cms-admin-v2.ihsansolusi.co.id/testapi/user', values, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc1MjA0MDcsImlhdCI6MTY5NzQzNDAwNywic3ViIjoyOTd9.aR1960qdf3PFCvMCeEmySEXfl7mY3H6Aj24qmpvnzAE',
          },
        });
        console.log(data.data);
        return data.data;
      } catch (error) {
        console.error('An error occurred while fetching the data:', error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan customer baru",
        variant: "default",
      });
      router.refresh();
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      toast({
        title: "Gagal menambahkan customer baru",
        variant: "destructive",
        description: JSON.stringify(error),
      });
      console.error(error);
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Toaster />
      <DialogContent className="flex max-w-screen-md flex-col justify-end">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Tambahkan Customer Baru</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              const { name, address, gender, born_date } = data;
              submit({ name, address, gender, born_date });
            })}
            className="flex max-h-[80vh] flex-col space-y-8"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex grow flex-col">
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nama ditulis sesuai dengan KTP atau SIM
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex grow flex-col">
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormDescription>
                      Alamat tempat tinggal sekarang
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="l" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="p" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Perempuan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="born_date"
                render={({ field }) => {
                  const { value, ...restField } = field;
                  return (
                    <FormItem className="flex w-[200px] flex-col">
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...restField}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex-grow">
              <DialogFooter>
                <Button type="submit" className="w-36">
                  Save
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )

}
