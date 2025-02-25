"use client";

import { Store } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import StoreCard from "@/components/ui/cards/store-card";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function StoreCards() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    async function fetchStores() {
        try {
            setLoading(true);
            const response = await axios.get(`/api/stores`);
            setStores(response.data);
            toast.success('Stores fetched successfully');
        } catch (error) {
            toast.error('Failed to fetch stores');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchStores();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
                </CardHeader>
                <CardContent className="flex justify-center items-center">Loading Stores</CardContent>
            </Card>
        );
    }
    if (!stores) {
        return <></>;
    }
    return (
        stores.map((store) => (
            <StoreCard key={store.id} store={store} />
        ))
    )
};
