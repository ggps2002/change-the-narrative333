"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditIcon, Loader2, User } from "lucide-react";
import { auth } from "@/lib/firebase/utils";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface Props {
  toggleAccountType: (type: "seekers" | "supporter") => void;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

const ProfileCard = ({ toggleAccountType }: Props) => {
  const router = useRouter();
  const { profile, saveProfile, loading } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [accountType, setAccountType] = useState<"seekers" | "supporter">(
    "seekers"
  );
  const [profilePic, setProfilePic] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setLocation(profile.location || "");
      setAccountType(profile.accountType || "seekers");
      setProfilePic(profile.profilePic || "");
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveProfile({ name, location, accountType, profilePic });
    toggleAccountType(accountType);
    setIsSaving(false);
    setIsEditing(false);
  };

  if (loading)
    return (
      <div>
          <div className="flex justify-center mb-4">
            <Skeleton className="h-24 w-24 rounded-full bg-slate-100" />
          </div>
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-[250px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-4 w-[250px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
            <Skeleton className="h-4 w-[200px] bg-slate-100" />
          </div>
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center">
          {profilePic && isValidUrl(profilePic) ? (
            <Image
              src={profilePic}
              alt="Profile"
              width={96}
              height={96}
              className="h-24 w-24 object-cover rounded-full"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <User className="h-12 w-12 text-primary/40" />
          )}
        </div>
        <CardTitle className="text-center">Welcome</CardTitle>
        <CardDescription className="text-center">
          {auth.currentUser?.email || "Anonymous"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-medium block mb-1">Name:</span>
            {isEditing ? (
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <span className="text-gray-600">{name || "Not provided"}</span>
            )}
          </div>
          <div>
            <span className="font-medium block mb-1">Location:</span>
            {isEditing ? (
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            ) : (
              <span className="text-gray-600">
                {location || "Not provided"}
              </span>
            )}
          </div>
          <div>
            <span className="font-medium block mb-1">Account Type:</span>
            {isEditing ? (
              <Select
                value={accountType}
                onValueChange={(value) => setAccountType(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seekers">Help Seeker</SelectItem>
                  <SelectItem value="supporter">Supporter</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-gray-600 capitalize">{accountType}</span>
            )}
          </div>
          <div>
            <span className="font-medium block mb-1">Profile Picture URL:</span>
            {isEditing ? (
              <Input
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            ) : (
              <span className="text-gray-600">
                {profilePic ? profilePic.slice(0, 22) + "..." : "Not provided"}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full hover:text-black"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            isSaving ? (
              <>
                <Loader2 className="animate-spin h-8 w-8" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )
          ) : (
            <>
              <EditIcon /> Edit Profile
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
