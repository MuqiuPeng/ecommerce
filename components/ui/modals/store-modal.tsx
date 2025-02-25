"use client";

import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { useForm } from "react-hook-form";
import axios from "axios"
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1, {message: "Name must not be empty."}),
    description: z.string().optional(),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.post('/api/stores', values);
            toast.success('Store created successfully');
        } catch (error) {
            toast.error('Failed to create store');
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

    return(
        <Modal
            title = "Create store"
            description="Add a new store to manage product and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-commerce" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Brilliant shirt for men!" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="button" disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                            <Button className="ml-2" disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}