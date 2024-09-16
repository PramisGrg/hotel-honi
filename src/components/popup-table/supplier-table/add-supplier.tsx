import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { UseAddSupplierQuery } from "@/queries/table/supplier-table/add-supplier-query";

const AddSupplier = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAdddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createSupplier = UseAddSupplierQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier = {
      name,
      address,
      contactNumber,
      emailAddress,
    };

    createSupplier.mutate(supplier, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide Supplier name to add.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Address</Label>
              <Input
                value={address}
                id="name"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Contact</Label>
              <Input
                value={contactNumber}
                id="name"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Email</Label>
              <Input
                value={emailAddress}
                id="name"
                onChange={(e) => setEmailAdddress(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-600 duration-500 hover:text-gray-300"
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplier;
