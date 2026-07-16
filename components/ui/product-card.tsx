import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  rating?: number;
}

/** Product card for e-commerce style listings — image, price, rating, add-to-cart. */
export function ProductCard({ name, price, imageUrl, rating = 5 }: ProductCardProps) {
  return (
    <Card className="w-64 overflow-hidden p-0">
      <Image src={imageUrl} alt={name} width={256} height={160} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-medium text-sm">{name}</h3>
        <div className="mt-1 flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-ember text-ember" : "text-graphite-border"}`} aria-hidden="true" />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg">{price}</span>
          <Button size="sm">Add</Button>
        </div>
      </div>
    </Card>
  );
}
