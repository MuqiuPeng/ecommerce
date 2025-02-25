"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';

export default function StoresLayout({
    children, userId
}: {
    children: React.ReactNode;
    userId: string;
}) {
    const onOpen = useStoreModal((state) => state.onOpen);
    return (
        <div className="flex flex-col h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {children}
                <Card className="p-4 flex justify-center items-center h-64">
                    <CardContent>
                        <Button onClick={onOpen}>Open a new Store</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}