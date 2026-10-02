import { cva } from "class-variance-authority";
import * as React from "react";

import { Badge } from "@/components/ui/8bit/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";
import { cn } from "@/lib/utils";

import "@/components/ui/8bit/styles/retro.css";

export interface SaveSlot {
  id: string;
  isEmpty: boolean;
  name?: string;
  timestamp?: Date | string;
  preview?: string;
  description?: string;
}

export interface SaveSlotsProps extends React.ComponentProps<"div"> {
  slots: Array<SaveSlot>;
  onSlotClick?: (slot: SaveSlot) => void;
  layout?: "vertical" | "grid";
  maxSlots?: number;
  maxVisibleSlots?: number;
  className?: string;
  title?: string;
  showTimestamp?: boolean;
  showPreview?: boolean;
}

const slotItemVariants = cva(
  "group relative flex gap-2 sm:gap-4 p-2 sm:p-4 transition-all duration-200 border-2",
  {
    variants: {
      state: {
        empty: "border-dashed border-muted-foreground/30",
        filled: "border-border  bg-muted/30",
      },
    },
    defaultVariants: {
      state: "empty",
    },
  },
);

const previewFrameVariants = cva(
  "flex items-center justify-center border-4 overflow-hidden shrink-0",
  {
    variants: {
      state: {
        empty: "border-dashed border-muted-foreground/40 bg-muted/10",
        filled: "border-border bg-background",
      },
    },
    defaultVariants: {
      state: "empty",
    },
  },
);

// Floppy disk SVG icon for empty slots
function FloppyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h6v4H7V7zm8 0h2v3h-2V7zm-8 6h10v4H7v-4z" />
    </svg>
  );
}

function formatTimestamp(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

  if (!date || Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  }
  if (days === 1) {
    return "Yesterday";
  }
  if (days < 7) {
    return `${days} days ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SlotPreview({
  preview,
  isEmpty,
  slotNumber,
}: {
  preview?: string;
  isEmpty: boolean;
  slotNumber: number;
}) {
  const state = isEmpty ? "empty" : "filled";

  return (
    <div
      aria-hidden="true"
      className={cn(previewFrameVariants({ state }), "size-14 sm:size-20 md:size-24")}
    >
      {isEmpty ? (
        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
          <FloppyIcon className="text-muted-foreground/50 size-5 sm:size-8" />
          <span className="retro text-muted-foreground/50 text-[8px] sm:text-[10px]">
            {slotNumber}
          </span>
        </div>
      ) : preview ? (
        <img
          alt="Save preview"
          className="pixelated size-full object-cover"
          loading="lazy"
          src={preview}
        />
      ) : (
        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
          <FloppyIcon className="text-muted-foreground size-5 sm:size-8" />
          <span className="retro text-muted-foreground text-[8px] sm:text-[10px]">
            {slotNumber}
          </span>
        </div>
      )}
    </div>
  );
}

function SlotItem({
  slot,
  index,
  showPreview,
  showTimestamp,
  onClick,
}: {
  slot: SaveSlot;
  index: number;
  showPreview: boolean;
  showTimestamp: boolean;
  onClick?: (slot: SaveSlot) => void;
}) {
  const state = slot.isEmpty ? "empty" : "filled";
  const slotNumber = index + 1;
  const displayName = slot.name || `Slot ${slotNumber}`;

  const handleClick = () => {
    onClick?.(slot);
  };

  return (
    <button
      type="button"
      className={cn(slotItemVariants({ state }), "overflow-hidden text-left")}
      onClick={handleClick}
      aria-label={
        slot.isEmpty ? `Empty save slot ${slotNumber}` : `Save slot ${slotNumber}: ${displayName}`
      }
    >
      {showPreview && (
        <SlotPreview preview={slot.preview} isEmpty={slot.isEmpty} slotNumber={slotNumber} />
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <h3
            className={cn(
              "retro text-[10px] sm:text-xs md:text-sm font-medium truncate flex-1 min-w-0",
              slot.isEmpty && "text-muted-foreground",
            )}
          >
            {slot.isEmpty ? `EMPTY ${slotNumber}` : displayName}
          </h3>
        </div>

        {!slot.isEmpty && (
          <>
            {slot.description && (
              <p className="text-muted-foreground truncate text-[9px] sm:text-xs">
                {slot.description}
              </p>
            )}
            {showTimestamp && slot.timestamp && (
              <p className="text-muted-foreground/70 retro text-[8px] sm:text-[10px]">
                {formatTimestamp(slot.timestamp)}
              </p>
            )}
          </>
        )}

        {slot.isEmpty && (
          <p className="text-muted-foreground/60 retro text-[9px] sm:text-xs">Click to save</p>
        )}
      </div>
    </button>
  );
}

export function SaveSlots({
  slots,
  onSlotClick,
  layout = "vertical",
  maxSlots = 10,
  maxVisibleSlots = 4,
  className,
  title = "SAVE FILES",
  showTimestamp = true,
  showPreview = true,
  ...props
}: SaveSlotsProps) {
  const displaySlots = React.useMemo(() => {
    return slots.slice(0, maxSlots);
  }, [slots, maxSlots]);

  const savedCount = React.useMemo(() => {
    return displaySlots.filter((slot) => !slot.isEmpty).length;
  }, [displaySlots]);

  const containerClassName = cn(
    "gap-3",
    layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col",
  );

  // Calculate scroll area height: each slot is ~100px + 12px gap
  const slotHeight = 100;
  const gapHeight = 12;
  const scrollHeight = maxVisibleSlots * slotHeight + (maxVisibleSlots - 1) * gapHeight;
  const needsScroll = displaySlots.length > maxVisibleSlots && layout === "vertical";

  const slotsContent = (
    <div className={containerClassName}>
      {displaySlots.length === 0 ? (
        <div className="text-muted-foreground col-span-full py-8 text-center">
          <p className="retro text-sm">No save slots available</p>
        </div>
      ) : (
        displaySlots.map((slot, index) => (
          <SlotItem
            key={slot.id}
            index={index}
            onClick={onSlotClick}
            showPreview={showPreview}
            showTimestamp={showTimestamp}
            slot={slot}
          />
        ))
      )}
    </div>
  );

  return (
    <Card className={className} data-slot="save-slots" font="retro" {...props}>
      {title && (
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center justify-center gap-3 text-center">
            <span>{title}</span>
            {savedCount > 0 && (
              <Badge className="text-[9px]" variant="default">
                {savedCount} SAVED
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="space-y-5">
        {needsScroll ? (
          <div className="overflow-y-auto" style={{ maxHeight: `${scrollHeight}px` }}>
            {slotsContent}
          </div>
        ) : (
          slotsContent
        )}

        {displaySlots.length > 0 && (
          <>
            <Separator />
            <div className="mt-4 pt-4">
              <p className={cn("text-xs text-muted-foreground text-center retro")}>
                {savedCount} of {displaySlots.length} slots used
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default SaveSlots;
