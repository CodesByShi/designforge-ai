import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
}

/** Profile card — avatar, name, role, short bio, and a follow action. */
export function ProfileCard({ name, role, avatarUrl, bio }: ProfileCardProps) {
  return (
    <Card className="w-72 text-center">
      <Image
        src={avatarUrl}
        alt={`${name}'s avatar`}
        width={64}
        height={64}
        className="mx-auto rounded-full border-2 border-ember/40"
      />
      <h3 className="mt-3 font-display text-base font-semibold">{name}</h3>
      <p className="text-sm text-ember">{role}</p>
      {bio && <p className="mt-2 text-sm text-paper-dim">{bio}</p>}
      <Button size="sm" variant="outline" className="mt-4 w-full">Follow</Button>
    </Card>
  );
}
