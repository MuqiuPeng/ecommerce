import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Store {
    id: number;
    name: string;
    description: string;
}

const stores: Store[] = [
    { id: 1, name: 'Store 1', description: 'This is Store 1' },
    { id: 2, name: 'Store 2', description: 'This is Store 2' },
    { id: 3, name: 'Store 3', description: 'This is Store 3' },
];

const StoreCards: React.FC = () => {
    return (
        <div className="store-cards">
            {stores.map((store) => (
                <Card key={store.id} className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{store.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{store.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StoreCards;