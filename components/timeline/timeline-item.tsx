'use client';

import { format } from 'date-fns';
import { MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TripItem } from '@/lib/types';

interface TimelineItemProps {
  item: TripItem;
  isLast?: boolean;
}

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'bg-blue-500';
      case 'accommodation':
        return 'bg-green-500';
      case 'activity':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative pl-8 pb-8">
      {!isLast && (
        <div className="absolute left-[11px] top-[24px] h-full w-[2px] bg-border" />
      )}
      <div
        className={cn(
          'absolute left-0 top-[24px] h-6 w-6 rounded-full border-4 border-background',
          getStatusColor(item.type)
        )}
      />
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              {item.description}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {format(new Date(item.date), 'PPP')}
              {item.time && ` at ${item.time}`}
            </div>
            {item.location && (
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {item.location.address}
              </div>
            )}
          </div>
        </CardHeader>
        {isExpanded && item.notes && (
          <CardContent>
            <CardDescription>{item.notes}</CardDescription>
          </CardContent>
        )}
      </Card>
    </div>
  );
}