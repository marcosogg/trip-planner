'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddItemDialog from './add-item-dialog';
import ItemList from './item-list';
import TimelineView from './timeline/timeline-view';
import { TripItem, ItemType } from '@/lib/types';

export default function TripPlanner() {
  const [items, setItems] = useState<TripItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addItem = (item: TripItem) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filterItemsByType = (type: ItemType) => {
    return items.filter((item) => item.type === type);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Trip Planner</h1>
            <p className="mt-2 text-muted-foreground">
              Organize your travel arrangements in one place
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Item
          </Button>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <TimelineView items={items} />
          </TabsContent>

          <TabsContent value="flights">
            <ItemList
              items={filterItemsByType('flight')}
              onDelete={deleteItem}
              emptyMessage="No flights added yet"
            />
          </TabsContent>

          <TabsContent value="accommodations">
            <ItemList
              items={filterItemsByType('accommodation')}
              onDelete={deleteItem}
              emptyMessage="No accommodations added yet"
            />
          </TabsContent>

          <TabsContent value="activities">
            <ItemList
              items={filterItemsByType('activity')}
              onDelete={deleteItem}
              emptyMessage="No activities added yet"
            />
          </TabsContent>
        </Tabs>

        <AddItemDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAdd={addItem}
        />
      </div>
    </div>
  );
}