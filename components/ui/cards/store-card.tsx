"use client";

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Store } from '@prisma/client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StoreCard({ store }: { store: Store }) {
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(store.isOpen);

    const handleChange = async () => {
        try {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            await axios.patch("/api/stores", { id: store.id, isOpen: newIsOpen });
            toast.success("Store updated successfully");
        } catch (error) {
            setIsOpen(store.isOpen);
            toast.error("Failed to update store");
        }
    };

    async function deleteStore(storeId: string) {
        try {
            setLoading(true);
            await axios.delete('/api/stores', {data: {id: storeId}});
            toast.success('Store deleted successfully');
            setIsVisible(false);
        } catch (error) {
            toast.error('Failed to delete store');
        } finally {
            setLoading(false);
        }
    }

    if (isVisible) {
        return (
            <Card className="p-4 h-64">
                <div className='flex justify-end'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="flex top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your shop and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteStore(store.id)} disabled={loading}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <CardHeader>
                    <CardTitle>{store.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{store.description}</p>
                </CardContent>
                <div className='flex justify-end h-max align-bottom'>
                    <Switch checked={isOpen} onCheckedChange={handleChange} />
                </div>
            </Card>
        );
    } else {
        return (<></>);
    }
}